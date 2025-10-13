"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * FailedContent
 *
 * Displayed when payment status is not successful.
 *
 * This component provides:
 * - Clear failure messaging
 * - Retry CTA (back to pricing or to try payment link)
 * - Contact/support CTA
 *
 * Replace hrefs with your actual routes.
 */
export default function FailedContent() {
  const supportWhatsApp =
    "https://wa.me/2348076529944?text=Hi%20Anne%20Support,%20my%20payment%20failed%20and%20I%20need%20help.";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">Payment not completed</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            We could not confirm your payment. This could happen if you closed
            the checkout window, cancelled the payment, or the transaction
            failed.
          </p>

          <ul className="list-disc ml-5 mb-4 text-sm">
            <li>Check your bank/card activity for the transaction.</li>
            <li>
              If you were charged, keep the transaction ID ready when contacting
              support.
            </li>
            <li>You can try paying again using the link below.</li>
          </ul>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {/* Button to retry: link back to pricing/subscription page */}
          <div className="flex gap-3">
            <Link href="/payment">
              <Button variant="outline" className="flex-1">
                Try Again
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="flex-1">Contact Support</Button>
            </Link>
          </div>

          {/* Quick WhatsApp contact link (opens Anne's chat) */}
          <div className="text-center">
            <Link
              href={supportWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline"
            >
              Or message Anne on WhatsApp for immediate assistance
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
