// app/verify-otp/page.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the VerifyOTPContent client component with SSR disabled.
const VerifyOTP = dynamic(() => import("./VerifyOTPContent"), { ssr: false });

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTP />
    </Suspense>
  );
}
