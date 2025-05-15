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

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Subscription failed.");
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
          By subscribing, you'er joining a trusted community. I respect your
          privacy and promise to never share or misuse your email. You'll only
          receive helpful financial tips, updates and offers meant to support
          your financial journey
        </p>
      </form>
    </div>
  );
}
