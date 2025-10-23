"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { generateUniqueId } from "@/lib/utils";
import { getIpLocation } from "@/lib/ip-detection";
import { getPriceByCountryForCummunity } from "@/lib/pricing";
import type { PriceDetails, UserCheckoutData } from "@/types/calculator";

/**
 * SubscriptionForm — Collects user info, applies coupon discounts,
 * determines location-based pricing, and initiates payment.
 */
export function SubscriptionForm() {
  const [userData, setUserData] = useState<UserCheckoutData>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Derived total after discount
  const discountedTotal = Math.max(
    (priceDetails?.amount ?? 0) - couponDiscount,
    0
  );

  // Detect user location and set price
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const location = await getIpLocation();
        const country = location?.country_code || "default";
        setPriceDetails(getPriceByCountryForCummunity(country));
      } catch {
        setPriceDetails(getPriceByCountryForCummunity("default"));
      } finally {
        setLoading(false);
      }
    };
    detectLocation();
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  // Validate coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return toast.error("Enter a coupon code first");
    setIsApplyingCoupon(true);

    try {
      const { data } = await axios.post("/api/coupon/validate", {
        code: couponCode,
      });

      if (!data.success) {
        setCouponDiscount(0);
        return toast.error(data.message || "Invalid coupon");
      }

      const { discountType, discountValue } = data.data;
      const base = priceDetails?.amount ?? 0;
      const discount =
        discountType === "percentage"
          ? (base * discountValue) / 100
          : discountValue;

      setCouponDiscount(discount);
      toast.success(`Coupon applied!`);
    } catch {
      toast.error("Error applying coupon. Try again.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Build payment payload
  const buildPayload = () => ({
    tx_ref: `TX-REF-${generateUniqueId(8).toUpperCase()}`,
    amount: discountedTotal || priceDetails?.amount,
    currency: priceDetails?.currency,
    redirect_url:
      process.env.NEXT_PUBLIC_REDIRECT_URL_FOR_SUBSCRIPTION ||
      "https://financewithanne.com/payment/status",
    customer: {
      email: userData.email,
      name: userData.fullName,
      phonenumber: userData.phoneNumber,
    },
    meta: {
      type: "subscription",
      plan: "Premium Community Subscription",
      date: new Date().toISOString(),
      couponApplied: couponCode.toUpperCase() || null,
    },
  });

  // Handle payment
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { fullName, email, phoneNumber } = userData;
    if (!fullName || !email || !phoneNumber) {
      return toast.error("Please fill in all fields");
    }

    setIsProcessing(true);
    try {
      const { data } = await axios.post("/api/payments/subscription", {
        payload: buildPayload(),
      });

      if (data?.data?.status !== "success") {
        throw new Error("Invalid payment response");
      }

      if (data?.data?.data?.link) {
        toast.success("Redirecting to payment gateway...");
        window.location.href = data.data.data.link;
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (err: any) {
      console.error(err);
      setError("Payment failed. Please try again.");
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading pricing details...</p>
      </div>
    );
  }

  if (!priceDetails) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Unable to load pricing. Please refresh and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="shadow-lg border-primary/20 w-full">
      <CardHeader className="bg-primary text-primary-foreground text-center py-8 rounded-t-lg">
        <CardTitle className="text-3xl font-bold">
          Complete Your Subscription
        </CardTitle>
        <p className="text-lg opacity-90">
          Get instant access to the Premium Community!
        </p>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        {/* 💰 Price Section */}
        <div className="text-center mb-6">
          {couponDiscount > 0 ? (
            <>
              <p className="text-2xl text-gray-400 line-through">
                {priceDetails.symbol}
                {priceDetails.amount.toLocaleString()} {priceDetails.currency}
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-green-600">
                {priceDetails.symbol}
                {discountedTotal.toLocaleString()} {priceDetails.currency}
              </p>
              <p className="text-sm text-green-700 mt-1">
                You saved {priceDetails.symbol}
                {couponDiscount.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-4xl md:text-5xl font-extrabold text-green-600">
              {priceDetails.symbol}
              {priceDetails.amount.toLocaleString()} {priceDetails.currency}
            </p>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePayment} className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={userData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={userData.phoneNumber}
              onChange={handleChange}
              placeholder="+1234567890"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="coupon">Coupon Code (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
              />
              <Button
                type="button"
                onClick={handleApplyCoupon}
                disabled={isApplyingCoupon}
                variant="outline"
              >
                {isApplyingCoupon ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          After payment, you’ll be redirected to WhatsApp to confirm your
          subscription and get your access details.
        </p>
      </CardContent>
    </Card>
  );
}
