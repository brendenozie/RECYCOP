import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const db = await getDatabase();
  const body = await request.json(); // { supplierId, batchIds, hub, totalWeight }

  const session = (
    await (
      await import("@/lib/mongodb")
    ).default
  ).startSession();

  try {
    await session.withTransaction(async () => {
      // 1. Create the Pickup Request for the Admin Dashboard
      await db.collection("pickup_requests").insertOne(
        {
          ...body,
          status: "Requested",
          requestedAt: new Date(),
          priority: body.totalWeight > 2000 ? "High" : "Normal",
        },
        { session },
      );

      // 2. Update all selected batches to "In-Transit" (locking them)
      await db
        .collection("batches")
        .updateMany(
          { id: { $in: body.batchIds } },
          { $set: { status: "In-Transit" } },
          { session },
        );
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Logistics Sync Failed" },
      { status: 500 },
    );
  } finally {
    await session.endSession();
  }
}
