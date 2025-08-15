"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CountdownRedirectProps {
  isOpen: boolean;
  seconds?: number;
  redirectUrl: string;
  onClose?: () => void;
}

export function CountdownRedirect({
  isOpen,
  seconds = 5,
  redirectUrl,
  onClose,
}: CountdownRedirectProps) {
  const [count, setCount] = useState(seconds);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(redirectUrl);
          onClose?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, redirectUrl, router, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Redirecting...</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center text-2xl font-bold">
          Redirecting in {count}...
        </div>
      </DialogContent>
    </Dialog>
  );
}
