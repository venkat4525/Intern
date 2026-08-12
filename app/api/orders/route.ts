import { NextResponse } from "next/server";
import { getLocalOrders } from "@/lib/db";

export async function GET() {
  try {
    const orders = getLocalOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
