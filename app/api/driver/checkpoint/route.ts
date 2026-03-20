import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(request: Request) {
  try {
    const db = await getDatabase();
    const { manifestId, checkpointId } = await request.json();

    if (!manifestId || !checkpointId) {
      return NextResponse.json(
        { error: "Missing Route or Checkpoint ID" },
        { status: 400 },
      );
    }

    // 1. Update the specific checkpoint inside the manifest array
    const result = await db.collection("manifests").updateOne(
      {
        _id: new ObjectId(manifestId),
        "checkpoints.id": checkpointId,
      },
      {
        $set: {
          "checkpoints.$.status": "Cleared",
          "checkpoints.$.clearedAt": new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Checkpoint not found" },
        { status: 404 },
      );
    }

    // 2. Logic: Check if this was the FINAL checkpoint
    const updatedManifest = await db
      .collection("manifests")
      .findOne({ _id: new ObjectId(manifestId) });
    const allCleared = updatedManifest?.checkpoints.every(
      (cp: any) => cp.status === "Cleared",
    );

    if (allCleared) {
      // 3. AUTO-DECOMMISSION: Route is finished, release the assets
      await Promise.all([
        db
          .collection("manifests")
          .updateOne(
            { _id: new ObjectId(manifestId) },
            { $set: { status: "Completed", completedAt: new Date() } },
          ),
        db
          .collection("vehicles")
          .updateOne(
            { plate: updatedManifest?.vehiclePlate },
            { $set: { status: "Available", currentManifestId: null } },
          ),
        db
          .collection("drivers")
          .updateOne(
            { name: updatedManifest?.driverName },
            { $set: { isAssigned: false, currentManifestId: null } },
          ),
      ]);
    }

    return NextResponse.json({
      success: true,
      isRouteComplete: allCleared,
      message: allCleared
        ? "Route completed. Assets released to grid."
        : "Waypoint synchronized.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
