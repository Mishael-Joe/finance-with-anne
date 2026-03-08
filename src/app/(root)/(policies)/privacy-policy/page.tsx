import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Finance with Anne",
  description:
    "Learn how Finance with Anne collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-muted/40 min-h-screen">
      {/* Header */}
      <section className="bg-[#0A001C] text-white py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/85 leading-relaxed">
            We respect your privacy and are committed to protecting your
            personal information. This policy explains how your data is
            collected, used, and safeguarded.
          </p>
          <p className="mt-6 text-sm text-white/60">
            Last updated: <strong>August 2025</strong>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl -mt-16 pb-24">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-14 space-y-16">
          <PolicySection title="Introduction">
            <p>
              Finance with Anne (“we”, “our”, “us”) is committed to protecting
              your privacy. This Privacy Policy describes how we collect, use,
              and safeguard your information when you interact with our website,
              services, or products.
            </p>
            <p>
              By accessing or using our services, you agree to the practices
              outlined in this policy.
            </p>
          </PolicySection>

          <PolicySection title="Information We Collect">
            <PolicySub title="Personal Information">
              <ul>
                <li>Name and contact details</li>
                <li>Payment details (processed securely by third parties)</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
                <li>Support inquiries</li>
              </ul>
            </PolicySub>

            <PolicySub title="Automatically Collected Information">
              <ul>
                <li>IP address and approximate location</li>
                <li>Browser and device data</li>
                <li>Pages visited and interaction data</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </PolicySub>
          </PolicySection>

          <PolicySection title="How We Use Your Information">
            <ul>
              <li>Deliver and maintain our services</li>
              <li>Process transactions</li>
              <li>Communicate updates and educational content</li>
              <li>Provide customer support</li>
              <li>Improve website performance and user experience</li>
              <li>Ensure legal compliance and prevent fraud</li>
            </ul>
          </PolicySection>

          <PolicySection title="Information Sharing">
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <ul>
              <li>Trusted service providers</li>
              <li>Legal authorities when required</li>
              <li>Business partners during mergers or acquisitions</li>
              <li>Third parties with your explicit consent</li>
            </ul>
          </PolicySection>

          <PolicySection title="Data Security">
            <ul>
              <li>SSL-encrypted data transmission</li>
              <li>Secure third-party payment gateways</li>
              <li>Regular system monitoring</li>
              <li>Restricted internal data access</li>
            </ul>
          </PolicySection>

          <PolicySection title="Cookies & Tracking">
            <p>
              Cookies help us understand user behavior and enhance your
              experience. You may disable cookies through your browser settings,
              though some features may not function properly.
            </p>
          </PolicySection>

          <PolicySection title="Your Rights">
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion</li>
              <li>Withdraw consent or unsubscribe</li>
              <li>Request data portability</li>
            </ul>
          </PolicySection>

          <PolicySection title="Children’s Privacy">
            <p>
              Our services are not intended for children under 13. We do not
              knowingly collect data from minors.
            </p>
          </PolicySection>

          <PolicySection title="Policy Updates">
            <p>
              This policy may be updated periodically. Continued use of our
              services after changes means you accept the revised policy.
            </p>
          </PolicySection>

          {/* Contact */}
          <div className="rounded-2xl border bg-background p-8">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-muted-foreground mb-6">
              If you have questions or concerns about this policy, reach out:
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> contact@financewithanne.com
              </p>
              <p>
                <strong>Contact Form:</strong>{" "}
                <Link href="/contact" className="text-primary underline">
                  financewithanne.com/contact
                </Link>
              </p>
              <p className="text-muted-foreground">
                Response time: within 48 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Reusable Components --- */

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </section>
  );
}

function PolicySub({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </div>
  );
}
