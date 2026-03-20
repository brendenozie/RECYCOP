import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const db = await getDatabase();
  const { searchParams } = new URL(request.url);
  const supplierId = searchParams.get("supplierId");

  // 1. Current Market Rates (Mocked or from a 'rates' collection)
  const rates: Record<string, number> = {
    "PET Clear": 28,
    "HDPE Opaque": 35,
    PP: 22,
  };

  // 2. Calculate "Pending" value from batches not yet paid
  const pendingBatches = await db
    .collection("batches")
    .find({ supplierId, status: { $in: ["Stored", "In-Transit"] } })
    .toArray();

  const estimatedValue = pendingBatches.reduce((acc, batch) => {
    return acc + batch.weight * (rates[batch.material] || 15);
  }, 0);

  // 3. Fetch Wallet Balance & History
  const wallet = await db.collection("wallets").findOne({ supplierId });
  const history = await db
    .collection("transactions")
    .find({ supplierId })
    .sort({ date: -1 })
    .limit(5)
    .toArray();

  return NextResponse.json({
    balance: wallet?.balance || 0,
    estimatedValue,
    history,
  });
}
