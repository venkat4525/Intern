import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", receipt } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay environment credentials exist, create order via Razorpay REST API
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // convert to paise
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          payment_capture: 1,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Razorpay API Error", errData);
        return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
      }

      const order = await response.json();
      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: keyId,
      });
    }

    // Fallback Sandbox mode when keys are not set in env (for effortless local testing)
    const mockOrderId = `order_sim_${Math.floor(100000 + Math.random() * 900000)}`;
    return NextResponse.json({
      id: mockOrderId,
      amount: Math.round(amount * 100),
      currency: "INR",
      key: keyId || "rzp_test_CarebridgeMockKey",
      isSandbox: true,
    });
  } catch (error: any) {
    console.error("Error in create-order API", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
