// app/verify-otp/page.tsx
"use client"

import dynamic from "next/dynamic"

const VerifyOTP = dynamic(() => import("./VerifyOTPContent"), { ssr: false })
export default VerifyOTP
