import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "bson";

export async function GET(request: NextRequest) {
  try {
    

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
        if (!decoded || decoded.role !== "driver") {
          return NextResponse.json(
            { error: "Unauthorized access: Drivers only" },
            { status: 403 },
          );
        }

    const { searchParams } = new URL(request.url);
    const queryDriver = searchParams.get("driverId");

    // Replace with decoded JWT later
    const driverId = decoded.userId || queryDriver;

    if (!driverId) {
      return NextResponse.json(
        { error: "Driver ID required" },
        { status: 400 },
      );
    }

    const db = await getDatabase();

    const inventory = await db
      .collection("inventory")
      .find({
        driver:  new ObjectId(decoded.userId),
        status: {
          $in: [
            "Pending",
            "Loaded",
            "In Transit",
            "Delivered",
            "Canceled",
            "Active",
          ],
        },
      })
      .sort({
        timestamp: -1,
      })
      .toArray();

    const loads = inventory.map((item) => {
      const weight = parseFloat(item.weight || "0");

      return {
        _id: item._id.toString(),
        status: item.status === "Active" ? "Pending" : item.status,

        supplierName: item.supplier || "Unknown Supplier",

        totalWeight: item.weight?.toLowerCase().includes("t")
          ? weight * 1000
          : weight,

        vehicle: item.vehicle || "Not Assigned",

        hub: item.hub || "Nairobi Core Hub",

        grade: item.grade || "-",

        name: item.name || "Material",
      };
    });

    return NextResponse.json(loads);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch assigned inventory",
      },
      {
        status: 500,
      },
    );
  }
}
