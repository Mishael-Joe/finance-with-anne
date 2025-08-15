"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, AlertCircle, Check, X, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

/**
 * Admin Change Password Page
 * Allows administrators to change their password with strong password requirements
 */
export default function ChangePasswordPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Form state
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Redirect if not authenticated or not an admin
  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    router.push(
      `/admin/login?error=AccessDenied&callbackUrl=${encodeURIComponent(
        "/admin/change-password"
      )}`
    );
    return null;
  }

  /**
   * Handle form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength if the new password field is being updated
    if (name === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  /**
   * Check password strength and update UI feedback
   */
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    setPasswordChecks(checks);

    // Calculate strength percentage (20% for each check)
    const strength = Object.values(checks).filter(Boolean).length * 20;
    setPasswordStrength(strength);
  };

  /**
   * Get color class based on password strength
   */
  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  /**
   * Get strength label based on password strength
   */
  const getStrengthLabel = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 80) return "Moderate";
    return "Strong";
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength < 60) {
      setError("Please choose a stronger password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      // Show success message and reset form
      setSuccess("Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStrength(0);
      setPasswordChecks({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
    } catch (err) {
      console.error("Error changing password:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 border border-border">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>

          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success alert */}
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
              <Check className="h-4 w-4 mr-2" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  tabIndex={-1}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  tabIndex={-1}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password strength meter */}
              {formData.newPassword && (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Password Strength:</span>
                    <span className="text-xs font-medium">
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className="h-1.5"
                    indicatorClassName={getStrengthColor()}
                  />

                  {/* Password requirements checklist */}
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center text-xs">
                      {passwordChecks.length ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordChecks.uppercase ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>At least one uppercase letter (A-Z)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordChecks.lowercase ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>At least one lowercase letter (a-z)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordChecks.number ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>At least one number (0-9)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordChecks.special ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                      )}
                      <span>At least one special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.newPassword &&
                formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Password...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
