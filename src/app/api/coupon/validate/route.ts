import { getCouponModel } from "@/lib/db/models/coupon.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const Coupon = await getCouponModel();

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
    }).lean();

    if (!coupon) {
      return NextResponse.json({
        success: false,
        message: "Invalid coupon code.",
      });
    }

    if (!coupon.isActive) {
      return NextResponse.json({
        success: false,
        message: "Coupon is inactive.",
      });
    }

    if (coupon.expiresAt < new Date()) {
      return NextResponse.json({
        success: false,
        message: "Coupon has expired.",
      });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({
        success: false,
        message: "Coupon usage limit reached.",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Server error validating coupon.",
    });
  }
}
