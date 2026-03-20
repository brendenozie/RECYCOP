import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// --- GET: Fetch All Active Nodes ---
export async function GET() {
  try {
    const db = await getDatabase();
    const hubs = await db.collection("hubs").find({}).toArray();
    return NextResponse.json(hubs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hub grid" },
      { status: 500 },
    );
  }
}

// --- POST: Provision New Hub ---
export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const newHub = {
      name: body.name,
      location: {
        country: body.country,
        city: body.city,
        neighborhood: body.neighborhood,
        phase: body.phase,
      },
      load: Number(body.load) || 0,
      status: body.status || "Optimal",
      // If coordinates aren't provided, we generate random ones for the tactical map
      coords: body.coords || {
        x: `${Math.floor(Math.random() * 80 + 10)}%`,
        y: `${Math.floor(Math.random() * 80 + 10)}%`,
      },
      createdAt: new Date(),
    };

    const result = await db.collection("hubs").insertOne(newHub);
    return NextResponse.json(
      { _id: result.insertedId, ...newHub },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to provision hub" },
      { status: 500 },
    );
  }
}
