import { encrypt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { payload } = body;

    console.log("Payment payload:", payload);

    const encryptedPayload = await encrypt(
      process.env.FLUTTERWAVE_ENCRYPTION_KEY!,
      payload
    );

    const flutterwaveRes = await fetch(
      "https://api.flutterwave.com/v3/charges?type=card",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: encryptedPayload,
        }),
      }
    );

    const data = await flutterwaveRes.json();

    console.log("flutterwaveRes", data);
    console.log("flutterwaveRes.status", flutterwaveRes.status);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment request failed" },
      { status: 500 }
    );
  }
}
