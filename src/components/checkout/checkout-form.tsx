"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type {
  PriceDetails,
  UserCheckoutData,
  EncryptedCardDetails,
} from "@/types/calculator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateUniqueId } from "@/lib/utils";
import axios from "axios";

// ✅ react-payment-inputs imports for card formatting & icons
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { CountdownRedirect } from "../countdown-redirect";

/**
 * Props for the CheckoutForm component.
 * @property {PriceDetails} priceDetails - The price details (amount, currency, symbol) determined by the server.
 */
interface CheckoutFormProps {
  priceDetails: PriceDetails;
}

/**
 * Renders the checkout form, displaying the price and collecting user and card details.
 * It handles form validation and prepares data for a payment request.
 * Enhanced with react-payment-inputs for better card input formatting and validation.
 */
export function CheckoutForm({ priceDetails }: CheckoutFormProps) {
  const router = useRouter();
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownUrl, setCountdownUrl] = useState("");
  const [showPinDialogBox, setShowPinDialogBox] = useState(false);
  const [showOtpDialogBox, setShowOtpDialogBox] = useState(false);
  const [showAvsDialogBox, setShowAvsDialogBox] = useState(false);
  const [flw_ref, setFlw_ref] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(
    null
  );
  const [otp, setOtp] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [authType, setAuthType] = useState<"pin" | "avs_noauth" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avs_noauth, setAvs_noauth] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    zipcode: "",
  });
  const [userData, setUserData] = useState<UserCheckoutData>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  // const [cardDetails, setCardDetails] = useState<Omit<EncryptedCardDetails>>({

  const [cardDetails, setCardDetails] = useState<
    EncryptedCardDetails & {
      expiryDate: string;
    }
  >({
    encrypted_card_number: "",
    encrypted_expiry_month: "",
    encrypted_expiry_year: "",
    expiryDate: "",
    encrypted_cvv: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Global page-level processing state for the first "Proceed to Payment" action
  const [isProcessing, setIsProcessing] = useState(false);
  // ✅ New dialog-specific loading states (prevents double-clicks and shows spinners)
  const [isSubmittingPin, setIsSubmittingPin] = useState(false);
  const [isSubmittingAvs, setIsSubmittingAvs] = useState(false);
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCardImageProps,
    getCVCProps,
    meta,
  } = usePaymentInputs();

  // Effect to validate form inputs
  useEffect(() => {
    const { fullName, email, phoneNumber } = userData;
    const {
      encrypted_card_number,
      encrypted_expiry_month,
      encrypted_expiry_year,
      encrypted_cvv,
      expiryDate,
    } = cardDetails;

    const [month, year] = expiryDate.split("/");

    // Basic validation for user data
    const isUserDataValid =
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation

    // Enhanced validation using react-payment-inputs meta data for better UX
    const isCardDataValid =
      encrypted_card_number.trim().length > 0 &&
      month.trim().length > 0 &&
      year.trim().length > 0 &&
      encrypted_cvv.trim().length > 0 &&
      !meta.erroredInputs.cardNumber &&
      !meta.erroredInputs.expiryDate &&
      !meta.erroredInputs.cvc;

    setIsFormValid(isUserDataValid && isCardDataValid);
  }, [userData, cardDetails, meta.erroredInputs]);

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

  /**
   * Handles changes to AVS input fields and updates the state.
   * @param e - The change event from the input element.
   */
  const handleAvsDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAvs_noauth((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  /**
   * Handles changes to card detail input fields and updates the state.
   * Enhanced to work with react-payment-inputs formatted values.
   * @param e - The change event from the input element.
   */
  const handleCardDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      setCardDetails((prevData) => ({
        ...prevData,
        encrypted_card_number: value,
      }));
    } else if (name === "expiryDate") {
      // Split MM/YY format into separate month and year values
      console.log("value", value);
      // const [month, year] = value.split("/");
      // console.log("Expiry date change for month:", month);
      // console.log("Expiry date change for year:", year);
      // console.log("Card data change:", name, value);
      setCardDetails((prevData) => ({
        ...prevData,
        expiryDate: value,
      }));
    } else if (name === "cvc") {
      setCardDetails((prevData) => ({
        ...prevData,
        encrypted_cvv: value,
      }));
    }
  };

  // ==================== Shared Payment Utilities (NEW) ====================

  /**
   * Builds a base v3 payload from current state values.
   * @returns {Record<string, unknown>} Base payload prior to authorization additions.
   */
  function buildBaseV3Payload() {
    const [month, year] = cardDetails.expiryDate.split("/");
    return {
      card_number: cardDetails.encrypted_card_number.replace(/\s+/g, ""),
      cvv: cardDetails.encrypted_cvv.trim(),
      expiry_month: month.trim(),
      expiry_year: year.trim(),
      currency: priceDetails.currency,
      amount: priceDetails.amount,
      email: userData.email,
      fullname: userData.fullName,
      phone_number: userData.phoneNumber,
      card_holder_name: userData.fullName,
      tx_ref: `TX-REF-${generateUniqueId(8).toUpperCase()}`,
      redirect_url:
        process.env.NEXT_PUBLIC_REDIRECT_URL ||
        "https://financewithanne.com/checkout/success",
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

      const next_action = resp.data.meta.authorization.mode as
        | "pin"
        | "avs_noauth"
        | "redirect";

      if (next_action === "pin") {
        setAuthType(next_action);
        setShowPinDialogBox(true); // ✅ Keep dialog open until success
        return;
      }

      if (next_action === "avs_noauth") {
        setAuthType(next_action);
        setShowAvsDialogBox(true); // ✅ Keep dialog open until success
        return;
      }

      if (next_action === "redirect") {
        // Handle redirect action
        window.location.href = resp.data.meta.authorization.redirect;
        toast.success(
          "Redirecting to payment gateway. Please complete the payment."
        );
        return;
      }

      toast.error("Payment initiation failed.");
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

  /**
   * Handles re-submission for PIN or AVS authorization flows.
   * Uses the unified postEncryptedToMoneyTracker helper to avoid duplication.
   */
  const handleReSubmit = async () => {
    if (authType === "pin") {
      if (!pin || pin.trim() === "") {
        toast.error("Please enter the PIN.");
        return;
      }

      setIsSubmittingPin(true); // ✅ Start PIN dialog loading state
      try {
        const payload = {
          ...buildBaseV3Payload(),
          // For pin flow, use the webhook redirect provided by you originally
          redirect_url:
            process.env.NEXT_PUBLIC_REDIRECT_URL ||
            "https://financewithanne.com/checkout/success",
          authorization: {
            mode: "pin",
            pin,
          },
        } as const;

        const resp = await postToMoneyTracker(payload);
        console.log("resp", resp);

        if (resp.data.data.processor_response === "Approved. Successful") {
          setShowPinDialogBox(false); // ✅ Close PIN dialog only after success

          const tx_ref = resp.data.data.tx_ref;
          const flw_ref = resp.data.data.flw_ref;
          toast.success("Payment successful! Thank you for your purchase.");
          setShowOtpDialogBox(false); // ✅ Close OTP dialog only after success
          setShowCountdown(true); // Show countdown redirect
          setCountdownUrl(
            `/checkout/success?flw_ref=${flw_ref}&tx_ref=${tx_ref}&email=${userData.email}`
          );
          return;
        }
        // Show OTP dialog on success, and do NOT close PIN dialog until after success
        setMessage(
          resp.data.data.processor_response ||
            "Kindly enter the OTP sent to your phone or email."
        );
        setFlw_ref(resp.data.data.flw_ref);
        setShowOtpDialogBox(true);
      } catch (err) {
        // keep the dialog open on failure
        console.error(err);
        toast.error("Payment initiation failed.");
      } finally {
        setIsSubmittingPin(false); // ✅ End PIN dialog loading state
      }
    }

    if (authType === "avs_noauth") {
      if (
        !avs_noauth.country ||
        !avs_noauth.state ||
        !avs_noauth.city ||
        !avs_noauth.address ||
        !avs_noauth.zipcode
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      setIsSubmittingAvs(true); // ✅ Start AVS dialog loading state
      try {
        const payload = {
          ...buildBaseV3Payload(),
          // For AVS flow, use the webhook redirect provided by you originally
          redirect_url:
            process.env.NEXT_PUBLIC_REDIRECT_URL ||
            "https://financewithanne.com/checkout/success",
          authorization: {
            mode: "avs_noauth",
            country: avs_noauth.country,
            city: avs_noauth.city,
            address: avs_noauth.address,
            state: avs_noauth.state,
            zipcode: avs_noauth.zipcode,
          },
        } as const;

        const resp = await postToMoneyTracker(payload);
        const next_action = resp.data.meta.authorization.mode as
          | "redirect"
          | "pin"
          | "avs_noauth";

        if (next_action === "redirect") {
          // Close the dialog just before redirect to avoid UI flicker
          setShowAvsDialogBox(false); // ✅ Close AVS dialog only after success
          window.location.href = resp.data.meta.authorization.redirect;
          toast.success(
            "Redirecting to payment gateway. Please complete the payment."
          );
          return;
        }

        toast.error("Payment initiation failed.");
      } catch (err) {
        // keep the dialog open on failure
        console.error(err);
        toast.error("Payment initiation failed.");
      } finally {
        setIsSubmittingAvs(false); // ✅ End AVS dialog loading state
      }
    }
  };

  /**
   * Handles OTP submission for verification.
   */
  const handleSubmitOtp = async () => {
    if (authType === "pin") {
      if (!otp || otp.trim() === "") {
        toast.error("Please enter the OTP.");
        return;
      }

      setIsSubmittingOtp(true); // ✅ Start OTP dialog loading state
      try {
        const { data, status } = await axios.post(
          "/api/payments/money-tracker/verify-otp",
          {
            otp: otp,
            flw_ref: flw_ref,
          }
        );

        if (status === 200) {
          const tx_ref = data.data.data.tx_ref;
          toast.success("Payment successful! Thank you for your purchase.");
          setShowOtpDialogBox(false); // ✅ Close OTP dialog only after success
          setShowCountdown(true); // Show countdown redirect
          setCountdownUrl(
            `/checkout/success?flw_ref=${flw_ref}&tx_ref=${tx_ref}`
          );
        } else {
          toast.error("Payment initiation failed.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Payment initiation failed.");
      } finally {
        setIsSubmittingOtp(false); // ✅ End OTP dialog loading state
      }
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
            <p className="text-4xl md:text-5xl font-extrabold text-green-600">
              <span id="price">
                {priceDetails.symbol}
                {priceDetails.amount.toLocaleString()}
              </span>{" "}
              <span className="text-2xl text-gray-600">
                {priceDetails.currency}
              </span>
            </p>
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

            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 pt-6">
              Card Details
            </h3>

            <div className="grid gap-4">
              {/* Card Number Input with automatic formatting */}
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <svg
                    // @ts-expect-error I don't know why it's showing an error
                    {...getCardImageProps({ images })}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <Input
                    {...getCardNumberProps({
                      onChange: handleCardDataChange,
                      value: cardDetails.encrypted_card_number,
                    })}
                    className="w-full pl-12 py-2 border border-border rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                {/* Card validation error display */}
                {meta.erroredInputs.cardNumber && (
                  <p className="text-sm text-destructive">
                    Please enter a valid card number
                  </p>
                )}
              </div>

              {/* Expiry Date and CVV Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    {...getExpiryDateProps({
                      onChange: handleCardDataChange,
                    })}
                    value={cardDetails.expiryDate}
                    // value={
                    //   cardDetails.encrypted_expiry_month &&
                    //   cardDetails.encrypted_expiry_year
                    //     ? `${cardDetails.encrypted_expiry_month}/${cardDetails.encrypted_expiry_year}`
                    //     : ""
                    // }
                    className="w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="MM/YY"
                  />
                  {/* Expiry validation error display */}
                  {meta.erroredInputs.expiryDate && (
                    <p className="text-sm text-destructive">
                      Please enter a valid expiry date
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVV</Label>
                  <Input
                    {...getCVCProps({
                      onChange: handleCardDataChange,
                    })}
                    value={cardDetails.encrypted_cvv}
                    className="w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="123"
                  />
                  {/* CVV validation error display */}
                  {meta.erroredInputs.cvc && (
                    <p className="text-sm text-destructive">
                      Please enter a valid CVV
                    </p>
                  )}
                </div>
              </div>
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

      {showPinDialogBox && (
        <Dialog open={showPinDialogBox} onOpenChange={setShowPinDialogBox}>
          <DialogContent className="sm:max-w-md overflow-auto max-h-[calc(100vh-10rem)]">
            {dialogErrorMessage && (
              <div className="grid w-full max-w-xl items-start gap-4 pb-4">
                <Alert variant={"destructive"}>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{dialogErrorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <DialogHeader>
              <DialogTitle>Enter PIN</DialogTitle>
              <DialogDescription>
                Please enter your card PIN to authorize or authenticate this
                transaction.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="pin" className="sr-only">
                  Please enter the PIN sent to your email or phone number
                </Label>
                <Input
                  id="pin"
                  type="text"
                  inputMode="numeric"
                  value={pin || ""}
                  onChange={(e) => setPin(e.target.value)}
                  disabled={isSubmittingPin}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              {/* ✅ Removed DialogClose wrapper so the dialog only closes on success */}
              <Button
                type="button"
                variant={`primary`}
                onClick={handleReSubmit}
                disabled={isSubmittingPin}
              >
                {isSubmittingPin ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Proceed"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showOtpDialogBox && (
        <Dialog open={showOtpDialogBox} onOpenChange={setShowOtpDialogBox}>
          <DialogContent className="sm:max-w-md overflow-auto max-h-[calc(100vh-10rem)]">
            {dialogErrorMessage && (
              <div className="grid w-full max-w-xl items-start gap-4 pb-4">
                <Alert variant={"destructive"}>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{dialogErrorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="otp" className="sr-only">
                  {message}
                </Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  value={otp || ""}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isSubmittingOtp}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              {/* ✅ Removed DialogClose wrapper so the dialog only closes on success */}
              <Button
                type="button"
                variant={`primary`}
                onClick={handleSubmitOtp}
                disabled={isSubmittingOtp}
              >
                {isSubmittingOtp ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Proceed"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showAvsDialogBox && (
        <Dialog open={showAvsDialogBox} onOpenChange={setShowAvsDialogBox}>
          <DialogContent className="sm:max-w-md overflow-auto max-h-[calc(100vh-10rem)]">
            {dialogErrorMessage && (
              <div className="grid w-full max-w-xl items-start gap-4 pb-4">
                <Alert variant={"destructive"}>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{dialogErrorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <DialogHeader>
              <DialogTitle>Authenticate Payment</DialogTitle>
              <DialogDescription>
                Please authorize or authenticate this transaction by providing
                the following information.
              </DialogDescription>
            </DialogHeader>
            {/* ✅ This form no longer submits handleProceedToPayment to avoid duplicate initializations */}
            <div className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="United States"
                  value={avs_noauth.country}
                  onChange={handleAvsDataChange}
                  required
                  className="border-border focus:border-primary"
                  disabled={isSubmittingAvs}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="California"
                  value={avs_noauth.state}
                  onChange={handleAvsDataChange}
                  required
                  className="border-border focus:border-primary"
                  disabled={isSubmittingAvs}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Los Angeles"
                  value={avs_noauth.city}
                  onChange={handleAvsDataChange}
                  required
                  className="border-border focus:border-primary"
                  disabled={isSubmittingAvs}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St"
                  value={avs_noauth.address}
                  onChange={handleAvsDataChange}
                  required
                  className="border-border focus:border-primary"
                  disabled={isSubmittingAvs}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  type="text"
                  placeholder="90001"
                  value={avs_noauth.zipcode}
                  onChange={handleAvsDataChange}
                  required
                  className="border-border focus:border-primary"
                  disabled={isSubmittingAvs}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start mt-4">
              {/* ✅ Removed DialogClose wrapper so the dialog only closes on success */}
              <Button
                type="button"
                variant={`primary`}
                onClick={handleReSubmit}
                disabled={isSubmittingAvs}
              >
                {isSubmittingAvs ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Proceed"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add the CountdownRedirect component */}
      <CountdownRedirect
        isOpen={showCountdown}
        redirectUrl={countdownUrl}
        seconds={5}
      />
    </>
  );
}
