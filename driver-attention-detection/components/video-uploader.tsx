"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileVideo, Upload } from "lucide-react"

interface VideoUploaderProps {
  onUpload: (file: File) => void
  isProcessing: boolean
  selectedFile: File | null
}

export default function VideoUploader({ onUpload, isProcessing, selectedFile }: VideoUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        onUpload(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div>
      <input ref={inputRef} id="file-input" type="file" accept="video/*" onChange={handleChange} className="hidden" />

      {selectedFile ? (
        <div className="mb-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <video ref={videoRef} src={URL.createObjectURL(selectedFile)} controls className="w-full h-auto" />
            </CardContent>
          </Card>
          <div className="flex justify-between mt-2">
            <p className="text-sm text-muted-foreground">
              {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
            <Button variant="outline" size="sm" onClick={handleClick} disabled={isProcessing}>
              Change Video
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileVideo className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">Upload Driver Video</h3>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop a video, or click to browse</p>
          <Button onClick={handleClick} disabled={isProcessing} variant="secondary" className="mx-auto">
            <Upload className="mr-2 h-4 w-4" />
            Select Video
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Supported formats: MP4, MOV, AVI (max 100MB)</p>
        </div>
      )}

      {selectedFile && (
        <Button className="w-full mt-4" onClick={() => onUpload(selectedFile)} disabled={isProcessing}>
          Analyze Driver Attention
        </Button>
      )}
    </div>
  )
}
