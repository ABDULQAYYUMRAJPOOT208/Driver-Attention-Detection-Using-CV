"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, RefreshCw } from "lucide-react"
import Webcam from "react-webcam"

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void
  isProcessing: boolean
}

export default function WebcamCapture({ onCapture, isProcessing }: WebcamCaptureProps) {
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true)
  }, [])

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        onCapture(imageSrc)
      }
    }
  }, [onCapture])

  const resetCapture = useCallback(() => {
    setCapturedImage(null)
  }, [])

  // Clean up webcam on unmount
  useEffect(() => {
    return () => {
      if (webcamRef.current && webcamRef.current.stream) {
        const tracks = webcamRef.current.stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {capturedImage ? (
            <img src={capturedImage || "/placeholder.svg"} alt="Captured driver" className="w-full h-auto" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
              onUserMedia={handleUserMedia}
              className="w-full h-auto"
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-4">
        {capturedImage ? (
          <>
            <Button variant="outline" onClick={resetCapture} disabled={isProcessing}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake
            </Button>
            <Button onClick={() => onCapture(capturedImage)} disabled={isProcessing}>
              Analyze Attention
            </Button>
          </>
        ) : (
          <Button id="capture-button" onClick={capture} disabled={!isCameraReady || isProcessing} className="gap-2">
            <Camera className="h-4 w-4" />
            Capture Image
          </Button>
        )}
      </div>
    </div>
  )
}
