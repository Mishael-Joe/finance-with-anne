"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { pricingForCummunity } from "@/lib/pricing";

type VerifyResponse = {
  ok: boolean;
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
  error?: string;
};

interface SuccessContentProps {
  searchParams: { [key: string]: string | string[] | undefined } | Promise<any>;
}

/**
 * SuccessContent
 *
 * Client component that:
 * - extracts tx_ref or transaction_id from searchParams
 * - calls a backend verify endpoint to confirm payment
 * - displays verification state and actionable CTAs:
 *   - Redirect to WhatsApp with prefilled confirmation message
 *
 */
export default function SuccessContent({ searchParams }: SuccessContentProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );
  const [payload, setPayload] = useState<VerifyResponse["data"] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      // Resolve searchParams if it's a promise
      const params = typeof searchParams === "object" ? await searchParams : {};
      // Flutterwave usually returns tx_ref or transaction_id in the query
      const tx_ref =
        (params && (params.tx_ref as string)) ||
        (params && (params.transaction_id as string)) ||
        (params && (params.flw_ref as string));

      if (!tx_ref) {
        if (isMounted) {
          setStatus("failed");
          setErrorMessage(
            "Missing transaction reference. Cannot verify payment."
          );
        }
        return;
      }

      try {
        setStatus("verifying");
        // Call our server verification endpoint
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tx_ref }),
        });

        const json: VerifyResponse = await res.json();

        if (!res.ok || !json.ok) {
          if (isMounted) {
            setStatus("failed");
            setErrorMessage(
              json.error ||
                "Payment verification failed. Please contact support."
            );
          }
          return;
        }

        if (isMounted) {
          setPayload(json.data || null);
          setStatus(json.data?.status === "successful" ? "success" : "failed");
        }
      } catch (err) {
        if (isMounted) {
          setStatus("failed");
          setErrorMessage(
            "Unable to verify payment at this time. Please try again later."
          );
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  // Build WhatsApp link (Anne's number) with prefilled message including transaction reference.
  const annePhone = "2348076529944"; // Replace with Anne's actual number
  const txRef = payload?.tx_ref ?? undefined;
  const transactionId = payload?.id ?? undefined;
  const whatsappMessage = encodeURIComponent(
    `Hi Anne! I just subscribed to the Premium Community. My payment reference: ${txRef}. My transaction ID is ${transactionId}. Please confirm my access.`
  );
  const whatsAppUrl = `https://wa.me/${annePhone}?text=${whatsappMessage}`;

  // Receipt download (if backend provided a URL)
  //   const receiptUrl = payload?.receiptUrl || null; comming soon.

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600 hidden sm:inline-flex" />
            <CardTitle className="text-lg">
              Payment received — verifying now
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {status === "verifying" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Thank you — we received your payment and are verifying it now.
                This may take a few seconds.
              </p>

              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
                <p className="text-sm">Verifying transaction…</p>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="space-y-4">
              <p className="text-sm text-red-600">
                We were unable to verify your payment.
              </p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>

              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    // return to pricing or retry page
                    router.push("/payment");
                  }}
                >
                  Try Payment Again
                </Button>

                <Link href={whatsAppUrl} target="_blank" rel="noreferrer">
                  <Button>Contact Anne on WhatsApp</Button>
                </Link>
              </div>
            </div>
          )}

          {status === "success" && payload && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your payment has been verified. Welcome to the Premium
                Community! 🎉
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Plan</p>
                  <p className="font-medium">
                    {payload.meta.plan ?? "Premium"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-medium">
                    {payload.amount
                      ? `${
                          payload.currency ??
                          pricingForCummunity["default"].currency
                        } ${payload.amount.toLocaleString()}`
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Transaction Ref
                  </p>
                  <p className="font-mono text-sm break-all">
                    {payload.tx_ref ?? payload.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Payment Date</p>
                  <p className="text-sm">{payload.meta.date ?? "—"}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {/* WhatsApp link */}
                <a href={whatsAppUrl} target="_blank" rel="noreferrer">
                  <Button>
                    Confirm on WhatsApp{" "}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>

                {/* Download receipt if available */}
                {/* {receiptUrl && (
                  <a href={receiptUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline">
                      Download Receipt <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                )} */}

                {/* Go to dashboard (if you implement dashboard later) */}
                {/* <Button
                  variant="ghost"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Go to Dashboard
                </Button> */}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center sm:justify-end">
          <small className="text-xs text-muted-foreground">
            If you need help, contact Anne via WhatsApp.
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
