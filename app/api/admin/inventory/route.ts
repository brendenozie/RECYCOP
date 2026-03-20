import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// --- GET: Fetch All Material Manifests ---
export async function GET() {
  try {
    const db = await getDatabase();
    // Fetch items sorted by newest first
    const items = await db
      .collection("inventory")
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 },
    );
  }
}

// --- POST: Sync New Material with Central Ledger ---
export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const newItem = {
      name: body.name,
      grade: body.grade,
      weight: body.weight, // e.g., "12.4t"
      supplier: body.supplier,
      driver: body.driver || "",
      status: "Active",
      timestamp: new Date(),
    };

    const result = await db.collection("inventory").insertOne(newItem);
    return NextResponse.json(
      { _id: result.insertedId, ...newItem },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create manifest" },
      { status: 500 },
    );
  }
}
