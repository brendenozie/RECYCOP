import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "feedstockCategories";

// --- GET: Fetch All Feedstock Streams ---
export async function GET() {
  try {
    const db = await getDatabase();
    const feedstocks = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ group: 1, name: 1 })
      .toArray();

    return NextResponse.json(feedstocks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch feedstock configuration matrix" },
      { status: 500 }
    );
  }
}

// --- POST: Provision a New Feedstock Classification ---
export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    if (!body.name || !body.group || !body.grade) {
      return NextResponse.json(
        { error: "Missing required parameters (name, group, grade)" },
        { status: 400 }
      );
    }

    const newFeedstock = {
      name: body.name,
      group: body.group, // "Polymers" or "Metals"
      grade: body.grade, // e.g., "Rigid Plastics", "Bottle Caps"
      totalWeight: body.totalWeight || "0 kg",
      activeOrders: Number(body.activeOrders) || 0,
      status: body.status || "Stable",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newFeedstock);

    return NextResponse.json(
      { _id: result.insertedId, ...newFeedstock },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record feedstock parameter node" },
      { status: 500 }
    );
  }
}

// --- PUT: Update Existing Feedstock Matrix Values ---
export async function PUT(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Target document Identifier (id) is required" },
        { status: 400 }
      );
    }

    const updatePayload = {
      name: updateData.name,
      group: updateData.group,
      grade: updateData.grade,
      totalWeight: updateData.totalWeight,
      activeOrders: Number(updateData.activeOrders) || 0,
      status: updateData.status,
      updatedAt: new Date()
    };

    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: updatePayload }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Target feedstock document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, updatedFields: updatePayload });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update feedstock operational profile" },
      { status: 500 }
    );
  }
}

// --- DELETE: Deprecate/Remove Category Stream Classification ---
export async function DELETE(request: Request) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Target stream target payload target parameter (id) required" },
        { status: 400 }
      );
    }

    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Classification structure entry missing or already removed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Feedstock matrix link detached" });
  } catch (error) {
    return NextResponse.json(
      { error: "Critical failure parsing detachment payload sequence" },
      { status: 500 }
    );
  }
}