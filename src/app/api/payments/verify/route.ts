import { getCouponModel } from "@/lib/db/models/coupon.model";
import { NextResponse } from "next/server";

export interface FlutterwaveVerifyResponse {
  status: string; // e.g. "success" or "error"
  message: string; // description of result
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    device_fingerprint: string | null;
    amount: number;
    currency: string;
    charged_amount: number;
    app_fee: number;
    merchant_fee: number;
    processor_response: string;
    auth_model: string;
    ip: string;
    narration: string;
    status: string; // e.g. "successful"
    payment_type: string; // e.g. "card"
    created_at: string; // ISO timestamp
    account_id: number;
    card?: {
      first_6digits: string;
      last_4digits: string;
      issuer: string;
      country: string;
      type: string;
      token: string;
      expiry: string;
    } | null;
    meta: {
      email: string;
      phone_number: string;
      fullname: string;
      plan: string;
      date: string;
      type: string;
      couponApplied: string | null;
    };
    amount_settled: number;
    customer: {
      id: number;
      name: string;
      phone_number: string;
      email: string;
      created_at: string;
    };
  };
} // Flutterwave verify response structure. I got this from thier docs. @ https://developer.flutterwave.com/v3.0.0/reference/verify-transaction-with-tx_ref

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tx_ref } = body;
    // step 1: validate input
    if (!tx_ref) {
      return NextResponse.json(
        { ok: false, error: "tx_ref is required" },
        { status: 400 }
      );
    }

    // Step 2: Verify transaction with Flutterwave API
    const transactionData = await verifyTransaction(tx_ref);

    if (!transactionData || transactionData?.data?.status !== "successful") {
      return NextResponse.json(
        { ok: false, error: "Transaction not successful" },
        { status: 400 }
      );
    }

    // Step 3: Update coupon if applied
    const Coupon = await getCouponModel();
    const couponCode = transactionData.data.meta?.couponApplied;
    try {
      console.log("couponCode", couponCode);
      if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
        if (coupon) {
          coupon.usedCount += 1;

          // deactivate if usageLimit reached
          if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            coupon.isActive = false;
          }

          await coupon.save();
          console.log(`Coupon ${coupon.code} usage incremented`);
        } else {
          console.warn(`Coupon code ${couponCode} not found`);
        }
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
    }

    return NextResponse.json(
      { ok: true, data: transactionData.data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Verification error" },
      { status: 500 }
    );
  }
}

/**
 * Verify a transaction by its reference reference and not the transaction ID.
 * I am testing out this new endpoint from Flutterwave.
 */
async function verifyTransaction(
  transactionReference: string
): Promise<FlutterwaveVerifyResponse | null> {
  const res = await fetch(
    `${
      process.env.FLUTTERWAVE_API_URL || "https://api.flutterwave.com/v3"
    }/transactions/verify_by_reference?tx_ref=${transactionReference}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to verify transaction:", res.statusText);
    return null;
  }

  return res.json();
}
