import { verifyToken } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 1. Extract Driver ID securely (Header first, fallback to Query Param)
    // 1. Authenticate via Bearer Token or Cookie
      const authHeader = request.headers.get("authorization");
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;
  
      if (!token) {
        return NextResponse.json(
          { error: "Authentication token missing" },
          { status: 401 },
        );
      }
  
      const decoded = verifyToken(token);
      if (!decoded || decoded.role !== "supplier") {
        return NextResponse.json(
          { error: "Unauthorized access: Suppliers only" },
          { status: 403 },
        );
      }    

    const { searchParams } = new URL(request.url);
    const queryDriverId = searchParams.get("driverId");

    // Replace with your actual token decoding logic in production
    const driverId = decoded?.userId || queryDriverId;

    if (!driverId) {
      return NextResponse.json(
        { error: "Driver ID or Authorization token required" },
        { status: 400 },
      );
    }

    const db = await getDatabase();

    // 2. Fetch the most recent "Active" inventory assigned to this specific driver
    const activeLoad = await db
      .collection("inventory")
      .findOne(
        { driverId: new ObjectId(driverId), status: "Active" },
        { sort: { timestamp: -1 } },
      );

    if (!activeLoad) {
      return NextResponse.json(
        { message: "No active mission" },
        { status: 404 },
      );
    }

    // 3. Map the inventory schema to the frontend dashboard requirements
    // Your frontend expects 'totalWeight' (in kg) and 'supplierName'
    const numericWeight = parseFloat(activeLoad.weight) || 0;
    const weightInKg = activeLoad.weight?.toLowerCase().includes("t")
      ? numericWeight * 1000
      : numericWeight;

    return NextResponse.json({
      _id: activeLoad._id,
      status: activeLoad.status,
      supplierName: activeLoad.supplier || "Independent Node",
      totalWeight: weightInKg,
      vehicle: "ASSIGNED TRANSIT", // Expand this later if vehicles are mapped to drivers
      hub: "Nairobi Core Node", // Expand this later if dynamic routing is required
      grade: activeLoad.grade,
      name: activeLoad.name,
    });
  } catch (error) {
    console.error("Active Load Sync Error:", error);
    return NextResponse.json(
      { error: "Failed to sync dispatch ledger" },
      { status: 500 },
    );
  }
}
