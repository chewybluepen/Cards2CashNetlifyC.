// app/verify-otp/VerifyOTPContent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState<string | null>(null);

  useEffect(() => {
    // Assume there's a query parameter "otp" we want to get from the URL.
    const otpParam = searchParams.get("otp");
    setOtp(otpParam);
  }, [searchParams]);

  return (
    <div>
      <h1>Verify OTP</h1>
      {otp ? (
        <p>Your OTP is: {otp}</p>
      ) : (
        <p>No OTP provided in the URL.</p>
      )}
    </div>
  );
}
