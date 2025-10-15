import { getCouponModel } from "@/lib/db/models/coupon.model";
import { NextResponse } from "next/server";

export async function GET() {
  const Coupon = await getCouponModel();
  const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(coupons);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const Coupon = await getCouponModel();
    const coupon = await Coupon.create({
      ...body,
      code: body.code.toUpperCase(),
    });
    return NextResponse.json(coupon);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
