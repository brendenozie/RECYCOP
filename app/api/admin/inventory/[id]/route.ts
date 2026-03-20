import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// --- PATCH: Update Existing Material ---
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const updateData = { ...body, updatedAt: new Date() };
    delete updateData._id; // Ensure we don't try to overwrite the ID

    await db
      .collection("inventory")
      .updateOne(
        { _id: new ObjectId((await params).id) },
        { $set: updateData },
      );

    return NextResponse.json({ message: "Manifest updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// --- DELETE: Permanently Remove Material ---
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const db = await getDatabase();
    await db
      .collection("inventory")
      .deleteOne({ _id: new ObjectId((await params).id) });

    return NextResponse.json({ message: "Material purged from ledger" });
  } catch (error) {
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
