import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET: Fetch Security Ledger
export async function GET() {
  const db = await getDatabase();
  const users = await db.collection("users").find({}).toArray();
  return NextResponse.json(users);
}

// POST: Provision New Access
export async function POST(request: Request) {
  const db = await getDatabase();
  const body = await request.json();
  const newUser = {
    ...body,
    verified: true,
    createdAt: new Date(),
    status: "Active",
  };
  const result = await db.collection("users").insertOne(newUser);
  return NextResponse.json(result, { status: 201 });
}

// DELETE: Revoke Access
export async function DELETE(request: Request) {
  const db = await getDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No ID" }, { status: 400 });

  await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
