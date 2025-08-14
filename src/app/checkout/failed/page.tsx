import { Suspense } from "react";
import { XCircle, RefreshCw, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

/**
 * Payment Failed Page Component
 *
 * This page is displayed when a payment fails or is cancelled.
 * It provides helpful information and next steps for the user.
 */
function FailedContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon and Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Payment Failed
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We couldn't process your payment. Don't worry - no charges were
              made to your account.
            </p>
          </div>

          {/* Common Reasons Card */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6 text-left">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Common Reasons for Payment Failure
              </h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Insufficient funds in your account
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Incorrect card details (number, expiry date, or CVV)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Card blocked by your bank for online transactions
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Network connection issues during payment
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Card expired or cancelled
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Try Again */}
            <Card className="text-left">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <RefreshCw className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Try Again
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Double-check your card details and try the payment again. Make
                  sure your card is enabled for online transactions.
                </p>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link href="/checkout">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Payment
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="text-left">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Need Help?
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  If you continue to experience issues, our support team is here
                  to help you complete your purchase.
                </p>
                <Button
                  variant="outline"
                  asChild
                  className="w-full bg-transparent"
                >
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Alternative Payment Methods */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Alternative Options
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-semibold text-primary">
                      1
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Try a Different Card
                    </p>
                    <p className="text-sm text-slate-600">
                      Use another debit or credit card if available
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-semibold text-primary">
                      2
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Contact Your Bank
                    </p>
                    <p className="text-sm text-slate-600">
                      Ensure your card is enabled for online international
                      transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-semibold text-primary">
                      3
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Try Later</p>
                    <p className="text-sm text-slate-600">
                      Sometimes waiting a few minutes and trying again resolves
                      the issue
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <p className="text-slate-600">
              Don't let this stop you from taking control of your finances!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/checkout">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Payment Again
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products/money-tracker">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Product
                </Link>
              </Button>
            </div>
          </div>

          {/* Return to Home */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Payment Failed Page
 *
 * Displays information about failed payment and provides next steps.
 * Uses Suspense for better loading experience.
 */
export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      }
    >
      <FailedContent />
    </Suspense>
  );
}

/**
 * Metadata for SEO
 */
export const metadata = {
  title: "Payment Failed - Complete Money Tracker | Finance with Anne",
  description:
    "Payment could not be processed. Please try again or contact support for assistance.",
  robots: "noindex, nofollow", // Prevent indexing of error pages
};
