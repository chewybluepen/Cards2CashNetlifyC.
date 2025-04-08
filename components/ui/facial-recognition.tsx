"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Scan, CheckCircle, XCircle } from "lucide-react"

interface FacialRecognitionProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  autoStart?: boolean
}

export function FacialRecognition({ onSuccess, onError, autoStart = true }: FacialRecognitionProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Start facial recognition process
  const startFacialRecognition = async () => {
    try {
      setStatus("scanning")
      setProgress(0)

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 320 },
          height: { ideal: 320 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      // Simulate face detection progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15

          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              handleSuccess()
            }, 500)
            return 100
          }

          return newProgress
        })
      }, 500)

      return () => {
        clearInterval(interval)
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
      }
    } catch (error) {
      handleError("Camera access denied or not available")
    }
  }

  // Handle successful recognition
  const handleSuccess = () => {
    setStatus("success")

    // Stop camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    // Take snapshot if canvas is available
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
    }

    if (onSuccess) {
      setTimeout(() => {
        onSuccess()
      }, 1000)
    }
  }

  // Handle recognition error
  const handleError = (message: string) => {
    setStatus("error")
    setErrorMessage(message)

    // Stop camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    if (onError) {
      onError(message)
    }
  }

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart) {
      const cleanup = startFacialRecognition()
      return () => {
        if (cleanup) cleanup()
      }
    }
  }, [autoStart])

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 rounded-full overflow-hidden bg-gray-100 mb-4">
        {status === "scanning" && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="face-scan-overlay"></div>
            <Scan className="h-12 w-12 text-primary animate-pulse" />
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-green-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-red-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
          >
            <XCircle className="h-16 w-16 text-red-500" />
          </motion.div>
        )}

        <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {status === "scanning" && (
        <div className="w-full max-w-xs">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {progress < 30
              ? "Positioning face..."
              : progress < 60
                ? "Analyzing facial features..."
                : "Verifying identity..."}
          </p>
        </div>
      )}

      {status === "success" && <p className="text-center text-green-600 font-medium">Face recognized successfully!</p>}

      {status === "error" && (
        <p className="text-center text-red-600 font-medium">
          {errorMessage || "Recognition failed. Please try again."}
        </p>
      )}

      {status === "idle" && !autoStart && (
        <button onClick={() => startFacialRecognition()} className="px-4 py-2 bg-primary text-white rounded-md">
          Start Face Recognition
        </button>
      )}
    </div>
  )
}

