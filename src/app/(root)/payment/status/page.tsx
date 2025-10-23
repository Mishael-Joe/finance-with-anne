import FailedContent from "@/components/payment/failed-content";
import SuccessContent from "@/components/payment/success-content";
import { Suspense } from "react";

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Payment Success Page
 *
 * Displays confirmation of successful payment and provides next steps.
 * Uses Suspense for better loading experience.
 */
export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { status } = await searchParams;

  const statusArr = ["successful", "completed"];
  // If status is not successful or completed, show failed content
  if (status === undefined) {
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

  if (status && !statusArr.includes((status as string).toLowerCase())) {
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

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your confirmation...</p>
          </div>
        </div>
      }
    >
      <SuccessContent searchParams={await searchParams} />
    </Suspense>
  );
}

/**
 * Metadata for SEO
 */
export const metadata = {
  title: "Payment Status - Subscription | Finance with Anne",
  robots: { index: false, follow: false },
};
