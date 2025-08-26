"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { PriceDetails, UserCheckoutData } from "@/types/calculator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateUniqueId } from "@/lib/utils";
import axios from "axios";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getIpLocation } from "@/lib/ip-detection";
import { getPriceByCountry } from "@/lib/pricing";

/**
 * Renders the checkout form, displaying the price and collecting user and card details.
 * It handles form validation and prepares data for a payment request.
 * Enhanced with react-payment-inputs for better card input formatting and validation.
 */
export function CheckoutForm() {
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserCheckoutData>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Global page-level processing state for the first "Proceed to Payment" action
  const [isProcessing, setIsProcessing] = useState(false);

  // Effect to detect user's location and set pricing on component mount
  useEffect(() => {
    const detectLocationAndSetPrice = async () => {
      setLoading(true);
      try {
        const locationData = await getIpLocation();
        const countryCode = locationData?.country_code || "default";
        const detectedPrice = getPriceByCountry(countryCode);
        setPriceDetails(detectedPrice);
      } catch (error) {
        console.error("Error detecting location or setting price:", error);
        setPriceDetails(getPriceByCountry("default")); // Fallback to default
      } finally {
        setLoading(false);
      }
    };

    detectLocationAndSetPrice();
  }, [toast]);

  // Effect to validate form inputs
  useEffect(() => {
    const { fullName, email, phoneNumber } = userData;

    // Basic validation for user data
    const isUserDataValid =
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation

    setIsFormValid(isUserDataValid);
  }, [userData]);

  /**
   * Handles changes to user data input fields and updates the state.
   * @param e - The change event from the input element.
   */
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // ==================== Shared Payment Utilities (NEW) ====================

  /**
   * Builds a base v3 payload from current state values.
   * @returns {Record<string, unknown>} Base payload prior to authorization additions.
   */
  function buildBaseV3Payload() {
    return {
      tx_ref: `TX-REF-${generateUniqueId(8).toUpperCase()}`,
      amount: priceDetails?.amount,
      currency: priceDetails?.currency,
      redirect_url:
        process.env.NEXT_PUBLIC_REDIRECT_URL ||
        "https://financewithanne.com/checkout/success",
      customer: {
        email: userData.email,
        name: userData.fullName,
        phonenumber: userData.phoneNumber,
      },
      meta: {
        email: userData.email,
        phone_number: userData.phoneNumber,
        fullname: userData.fullName,
      },
    } as const;
  }

  /**
   * Encrypts a payload and posts to the unified money-tracker endpoint.
   * Centralizing this avoids repeating axios/encryption logic across flows.
   * @param {Record<string, unknown>} payload - Full payload (base + optional authorization)
   * @returns {Promise<any>} Axios response data
   */
  async function postToMoneyTracker(payload: Record<string, unknown>) {
    setError(null);
    setDialogErrorMessage(null);
    const { data, status } = await axios.post("/api/payments/money-tracker", {
      payload: payload,
    });

    const isError = data?.data?.status === "error";
    if (status !== 200 || isError) {
      setDialogErrorMessage(
        data?.data?.message ||
          "An unknown error occurred. Please try again. If error persists, contact support."
      );
      throw new Error("Payment initiation failed.");
    }

    return data;
  }

  // ==================== End Shared Payment Utilities ====================

  /**
   * Handles the form submission, preparing data for payment.
   * In a real application, this would initiate the payment gateway (e.g., Flutterwave).
   * @param e - The form submission event.
   */
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!isFormValid) {
      toast.error("Please fill in all required fields correctly.");
      setIsProcessing(false);
      return;
    }

    try {
      const basePayload = buildBaseV3Payload();
      const resp = await postToMoneyTracker(basePayload);
      // console.log("Payment initiation response:", resp.data.data.link);

      // Handle redirect action
      window.location = resp.data.data.link;
      toast.success(
        "Redirecting to payment gateway. Please complete the payment."
      );
      return;
    } catch (err: any) {
      console.error(
        "Payment error:",
        err?.response?.data?.data?.error?.message || err
      );
      setError(
        err?.response?.data?.data?.error?.message ||
          "There was an issue processing your payment. Please try again."
      );
      toast.error(
        "There was an issue processing your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {error && (
        <div className="grid w-full max-w-xl items-start gap-4 pb-4">
          <Alert variant={"destructive"}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      {dialogErrorMessage && (
        <div className="grid w-full max-w-xl items-start gap-4 pb-4">
          <Alert variant={"destructive"}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{dialogErrorMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <Card className="shadow-lg border-primary/20 w-full">
        <CardHeader className="bg-primary text-primary-foreground text-center py-8 rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            Complete Your Purchase
          </CardTitle>
          <p className="text-lg opacity-90">
            Get instant access to the Money Tracker!
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
              Price:
            </h2>
            {loading ? (
              <div className="flex items-center justify-center text-primary">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <span className="text-xl">Loading...</span>
              </div>
            ) : (
              <p className="text-4xl md:text-5xl font-extrabold text-green-600">
                <span id="price">
                  {priceDetails?.symbol}
                  {priceDetails?.amount.toLocaleString()}
                </span>{" "}
                <span className="text-2xl text-gray-600">
                  {priceDetails?.currency}
                </span>
              </p>
            )}
            {/* <p className="text-4xl md:text-5xl font-extrabold text-green-600">
              <span id="price">
                {priceDetails.symbol}
                {priceDetails.amount.toLocaleString()}
              </span>{" "}
              <span className="text-2xl text-gray-600">
                {priceDetails.currency}
              </span>
            </p> */}
          </div>

          <form onSubmit={handleProceedToPayment} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              Your Details
            </h3>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={userData.fullName}
                onChange={handleUserDataChange}
                required
                className="border-border focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={userData.email}
                onChange={handleUserDataChange}
                required
                className="border-border focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1234567890"
                value={userData.phoneNumber}
                onChange={handleUserDataChange}
                required
                className="border-border focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors duration-300"
              disabled={isProcessing || !isFormValid}
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
            Your payment will be securely processed.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
