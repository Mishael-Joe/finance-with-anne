import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!process.env.FLUTTERWAVE_API_URL || !process.env.FLUTTERWAVE_SECRET_KEY) {
    console.error("Missing required environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const body = await request.json();

  try {
    const { payload } = body;

    const requiredFields = [
      "tx_ref",
      "amount",
      "currency",
      "redirect_url",
      "customer",
    ];
    const missingFields = requiredFields.filter((field) => !payload[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    if (typeof payload.amount !== "number" || payload.amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount: must be a positive number" },
        { status: 400 }
      );
    }

    console.log("Payment initiated for tx_ref:", payload.tx_ref);
    const flutterwaveRes = await fetch(
      `${process.env.FLUTTERWAVE_API_URL}/payments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_options: "card, ussd",
          tx_ref: payload.tx_ref,
          amount: payload.amount,
          currency: payload.currency,
          redirect_url: payload.redirect_url,
          customer: payload.customer,
          meta: payload.meta,
          configurations: {
            session_duration: 10, // Session timeout in minutes (maxValue: 1440)
            max_retry_attempt: 3, // Max retry (int)
          },
        }),
      }
    );

    const data = await flutterwaveRes.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment request failed" },
      { status: 500 }
    );
  }
}
