"use client"

import { useState, useRef, useEffect } from "react"
import { scanQRCode, validateQRCode } from "../utils/qrCodeScanner"

const QRCodeScanner = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const [cameraStream, setCameraStream] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const scanIntervalRef = useRef(null)

  // Start camera for scanning
  const startScanning = async () => {
    try {
      setError(null)
      setScanning(true)

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      // Set video source to camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraStream(stream)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setError("Could not access camera. Please check permissions.")
      setScanning(false)
    }
  }

  // Stop scanning and release camera
  const stopScanning = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }

    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }

    setScanning(false)
  }

  // Process video frames to scan for QR codes
  const processVideoFrame = async () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // Set canvas size to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      try {
        // Convert canvas to data URL for scanning
        const imageDataUrl = canvas.toDataURL("image/png")

        // Scan for QR code
        const qrData = await scanQRCode(imageDataUrl)

        if (qrData) {
          // QR code found, validate it
          const validationResult = await validateQRCode(qrData)

          // Stop scanning and notify parent component
          stopScanning()
          onScanComplete({
            data: qrData,
            validation: validationResult,
            timestamp: new Date().toISOString(),
          })
        }
      } catch (error) {
        // Ignore errors during scanning - we'll keep trying
        console.log("Still scanning...")
      }
    }
  }

  // Start processing frames when scanning begins
  useEffect(() => {
    if (scanning && videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        // Set up interval to process frames every 500ms
        scanIntervalRef.current = setInterval(processVideoFrame, 500)
      }
    }

    return () => {
      stopScanning()
    }
  }, [scanning])

  // Handle file upload for QR code scanning
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setError(null)

      // Convert file to data URL
      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const imageDataUrl = event.target.result

          // Scan for QR code
          const qrData = await scanQRCode(imageDataUrl)

          if (qrData) {
            // QR code found, validate it
            const validationResult = await validateQRCode(qrData)

            // Notify parent component
            onScanComplete({
              data: qrData,
              validation: validationResult,
              timestamp: new Date().toISOString(),
            })
          } else {
            setError("No QR code found in the image")
          }
        } catch (error) {
          console.error("Error processing image:", error)
          setError("Failed to process image")
        }
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error reading file:", error)
      setError("Failed to read file")
    }
  }

  return (
    <div className="flex flex-col items-center">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">{error}</div>
      )}

      {scanning ? (
        <div className="relative w-full max-w-md">
          <video ref={videoRef} className="w-full rounded-lg" autoPlay playsInline />
          <canvas ref={canvasRef} className="hidden" />

          <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg"></div>
          </div>

          <button onClick={stopScanning} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg w-full">
            Cancel Scanning
          </button>
        </div>
      ) : (
        <div className="space-y-4 w-full">
          <button onClick={startScanning} className="px-6 py-2 bg-primary text-white rounded-lg w-full">
            Scan QR Code with Camera
          </button>

          <div className="text-center text-gray-500">OR</div>

          <label className="block w-full">
            <span className="sr-only">Upload QR Code Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary/90"
            />
          </label>
        </div>
      )}
    </div>
  )
}

export default QRCodeScanner
