import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const db = await getDatabase();
  const body = await request.json();
  // Expects: { driverId, requestId, type: 'Breakdown' | 'Police' | 'Delay', note, coords }

  try {
    const incidentLog = {
      ...body,
      loggedAt: new Date(),
      resolved: false,
    };

    await db.collection("incidents").insertOne(incidentLog);

    // Alert: In a real app, you'd trigger a Push Notification or SMS to Admin here

    return NextResponse.json({
      success: true,
      incidentId: incidentLog.loggedAt.getTime(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Critical log failure" },
      { status: 500 },
    );
  }
}
