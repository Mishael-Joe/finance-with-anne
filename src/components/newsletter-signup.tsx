"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Link from "next/link";

/**
 * Newsletter signup component
 *
 * Features:
 * - Email input field with validation
 * - Submit button
 * - Success/error message display
 * - Can be used anywhere on the site
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setStatus("loading");

    try {
      // In a real app, this would be an API call to your newsletter service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            disabled={status === "loading"}
            aria-label="Email address"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={status === "loading"}
            className="whitespace-nowrap"
          >
            {status === "loading" ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Status message */}
        {status === "success" && (
          <p className="text-sm text-secondary">{message}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500">{message}</p>
        )}

        <p className="text-xs text-muted-foreground">
          By subscribing, you agree to our{" "}
          <Link href="/" className="underline hover:text-primary">
            Privacy Policy
          </Link>{" "}
          and to receive marketing emails from us.
        </p>
      </form>
    </div>
  );
}
