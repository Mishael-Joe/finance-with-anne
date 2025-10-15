import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import { connectToDatabase } from "../mongoose";

export enum DiscountTypeEnum {
  Percentage = "percentage",
  Flat = "flat",
}

interface ICoupon {
  code: string;
  discountType: DiscountTypeEnum;
  discountValue: number;
  expiresAt: Date;
  usageLimit?: number;
  usedCount: number;
  applicableProducts?: string[];
  applicableStores?: string[];
  isActive: boolean;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, unique: true, required: true },
    discountType: {
      type: String,
      enum: Object.values(DiscountTypeEnum),
      required: true,
    },
    discountValue: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 },
    applicableProducts: [{ type: String }],
    applicableStores: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export async function getCouponModel(): Promise<Model<ICoupon>> {
  await connectToDatabase();

  return (
    (mongoose.models.Coupon as Model<ICoupon>) ||
    mongoose.model<ICoupon>("Coupon", couponSchema)
  );
}
