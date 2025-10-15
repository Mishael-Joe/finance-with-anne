import { getCouponModel } from "@/lib/db/models/coupon.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const Coupon = await getCouponModel();
  const body = await req.json();
  const coupon = await Coupon.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(coupon);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const Coupon = await getCouponModel();
  await Coupon.findByIdAndDelete(id);
  return NextResponse.json({ message: "Coupon deleted successfully" });
}
