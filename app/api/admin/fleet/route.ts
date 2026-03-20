import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// --- GET: Fetch Available Vehicles ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "Available"; // Filter by availability

    const db = await getDatabase();
    const vehicles = await db
      .collection("vehicles")
      .find({ status: status })
      .toArray();

    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch fleet" },
      { status: 500 },
    );
  }
}

// --- POST: Register New Asset ---
export async function POST(request: Request) {
  const db = await getDatabase();
  const body = await request.json();

  const newAsset = {
    plate: body.plate.toUpperCase(),
    model: body.model,
    capacity: body.capacity, // e.g., "30 Tons"
    status: "Available", // Default status
    lastService: new Date(),
    location: "Nairobi Hub",
    //     currentManifestId	ObjectId	Link to the active Route Manifest (Null if Idle).
    // telemetry	Object	Stores lastLat, lastLng, and speed.
    currentManifestId: null,
    telemetry: {
      lastLat: null,
      lastLng: null,
      speed: null,
    },
    createdAt: new Date(),
  };

  const result = await db.collection("vehicles").insertOne(newAsset);
  return NextResponse.json(result, { status: 201 });
}
