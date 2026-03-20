import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Fetch all batches for a specific supplier
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supplierId = searchParams.get("supplierId");

  if (!supplierId)
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const db = await getDatabase();
  const batches = await db
    .collection("batches")
    .find({ supplierId })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(batches);
}

// POST: Create a new batch entry
export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const newBatch = {
      ...body,
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`, // Generate unique ID
      status: "Stored",
      createdAt: new Date(),
    };

    const result = await db.collection("batches").insertOne(newBatch);
    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to log batch" }, { status: 500 });
  }
}
