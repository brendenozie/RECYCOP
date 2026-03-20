import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const driverId = searchParams.get("driverId");

  if (!driverId)
    return NextResponse.json({ error: "Driver ID required" }, { status: 400 });

  const db = await getDatabase();

  // Find the most recent "Dispatched" request for this driver
  const activeLoad = await db
    .collection("pickup_requests")
    .findOne(
      { assignedDriver: driverId, status: "Dispatched" },
      { sort: { dispatchedAt: -1 } },
    );

  if (!activeLoad) {
    return NextResponse.json({ message: "No active mission" }, { status: 404 });
  }

  // Fetch the supplier details for GPS/Location mapping
  const supplier = await db
    .collection("users")
    .findOne({ supplierId: activeLoad.supplierId });

  return NextResponse.json({
    ...activeLoad,
    supplierName: supplier?.name || "Independent Node",
    location: supplier?.location || "Nairobi Core",
  });
}
