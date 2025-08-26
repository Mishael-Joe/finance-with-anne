import {
  CheckCircle,
  Mail,
  ArrowRight,
  XCircleIcon,
  RefreshCwIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface searchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * Payment Success Page Component
 *
 * This page is displayed after a successful payment completion.
 * It provides confirmation, next steps, and download instructions.
 */
function SuccessContent({ searchParams }: searchParams) {
  const transaction_reference = searchParams.tx_ref || "N/A";
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon and Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your purchase!
            </p>
          </div>

          {/* Order Summary Card */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  Order Summary
                </h2>
                <span className="text-sm text-slate-600">
                  Order #{transaction_reference}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-green-200">
                <span className="text-slate-700">Complete Money Tracker</span>
                <span className="font-semibold text-slate-900">
                  Digital Download
                </span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-700">Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-1 gap-6 mb-8">
            {/* Email Confirmation */}
            <Card className="text-left">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Check Your Email
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  We've sent you a confirmation email with your purchase receipt
                  and setup instructions.
                </p>
                <p className="text-sm text-slate-500">
                  Didn't receive it? Check your spam folder or contact support.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What's Next Section */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                What's Next?
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
                      Download and Open
                    </p>
                    <p className="text-sm text-slate-600">
                      Open the Google Sheets file and make a copy to your Google
                      Drive
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
                    <p className="font-medium text-slate-900">Start Tracking</p>
                    <p className="text-sm text-slate-600">
                      Begin entering your income and expenses - it takes just 10
                      minutes a day
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
                    <p className="font-medium text-slate-900">
                      Watch Your Progress
                    </p>
                    <p className="text-sm text-slate-600">
                      See your financial patterns emerge and start making
                      smarter money decisions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support and Additional Resources */}
          <div className="text-center space-y-4">
            <p className="text-slate-600">
              Need help getting started? We're here to support you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group text-primary hover:text-primary"
                  variant={`outline`}
                >
                  Contact Support
                </Button>
              </Link>

              <Link href="/blog">
                <Button
                  size="lg"
                  className="group text-primary hover:text-primary"
                  variant={`outline`}
                >
                  Read Our Money Tips
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Return to Home */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/">
              <Button size="lg" className="group" variant={`default`}>
                Return to Homepage
                <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

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
              <XCircleIcon className="w-12 h-12 text-red-600" />
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
                    <RefreshCwIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Try Again
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Double-check your card details and try the payment again. Make
                  sure your card is enabled for online transactions.
                </p>
                <Link href="/checkout">
                  <Button size="lg" className="group">
                    <RefreshCwIcon className="w-4 h-4 mr-2" />
                    Retry Payment
                  </Button>
                </Link>
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
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="group text-primary hover:text-primary"
                    variant={`outline`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
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
              <Link href="/checkout">
                <Button className="group">
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  Retry Payment
                </Button>
              </Link>
              <Button variant="outline" asChild>
                <Link href="/products/money-tracker">Back to Product</Link>
              </Button>
            </div>
          </div>

          {/* Return to Home */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Button variant="ghost" asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FailedContent, SuccessContent };
