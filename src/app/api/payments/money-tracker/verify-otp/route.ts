import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token =
    process.env.FLUTTERWAVE_SECRET_KEY! ||
    "FLWSECK_TEST-2b5e65692898c6ced8629e871d9812e4-X";
  // console.log("Token:", token);
  try {
    const { otp, flw_ref } = body;

    console.log("{ otp, flw_ref }", { otp, flw_ref });

    // console.log("token", token);

    const flutterwaveRes = await fetch(
      "https://api.flutterwave.com/v3/validate-charge",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          flw_ref: flw_ref,
        }),
      }
    );

    const data = await flutterwaveRes.json();

    console.log("flutterwaveRes", data);
    console.log("flutterwaveRes.status", flutterwaveRes.status);

    return NextResponse.json({ data }, { status: flutterwaveRes.status });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment request failed" },
      { status: 500 }
    );
  }
}
