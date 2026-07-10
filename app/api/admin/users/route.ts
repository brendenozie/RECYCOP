import { getDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// --- GET: Fetch Accounts (Filtered by Pipeline Role or Global Matrix) ---
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    const roleFilter = searchParams.get("role"); // "supplier" | "driver"

    // Construct reactive query structure based on parsed URL search criteria
    const query: Record<string, any> = {};
    if (roleFilter) {
      query.role = roleFilter;
    }

    const rawUsers = await db.collection("users").find(query).toArray();

    // Map fields so the data model matches your front-end select dropdown constraints
    const cleanUsers = rawUsers.map((user) => ({
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      name:
        `${user.firstName} ${user.lastName}`.trim() ||
        user.name ||
        "Unnamed Node",
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      status: user.status,
      hubId: user.hubId,
    }));

    return NextResponse.json(cleanUsers);
  } catch (error) {
    console.error("[RecycWorks Users Engine Error]:", error);
    return NextResponse.json(
      { error: "Failed to query relational identity nodes" },
      { status: 500 },
    );
  }
}

// --- POST: Provision New Security Access Manually ---
export async function POST(request: Request) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const newUser = {
      ...body,
      verified: true,
      createdAt: new Date(),
      status: body.role === "driver" ? "pending_verification" : "active",
    };

    const result = await db.collection("users").insertOne(newUser);
    return NextResponse.json(
      { _id: result.insertedId, ...newUser },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Provision workflow failure" },
      { status: 500 },
    );
  }
}

// --- DELETE: Revoke Security Access ---
export async function DELETE(request: Request) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Target account token ID parameter required" },
        { status: 400 },
      );
    }

    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({
      success: true,
      message: "Security matrix link detached",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Revoke operational failure" },
      { status: 500 },
    );
  }
}
