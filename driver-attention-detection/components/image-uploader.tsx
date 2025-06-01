"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileImage, Upload } from "lucide-react"

interface ImageUploaderProps {
  onUpload: (file: File) => void
  isProcessing: boolean
  selectedFile: File | string | null
}

export default function ImageUploader({ onUpload, isProcessing, selectedFile }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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
      if (file.type.startsWith("image/")) {
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
      <input ref={inputRef} id="file-input" type="file" accept="image/*" onChange={handleChange} className="hidden" />

      {selectedFile && typeof selectedFile !== "string" ? (
        <div className="mb-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                alt="Uploaded driver"
                className="w-full h-auto object-cover"
              />
            </CardContent>
          </Card>
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleClick} disabled={isProcessing}>
              Change Image
            </Button>
          </div>
        </div>
      ) : selectedFile && typeof selectedFile === "string" ? (
        <div className="mb-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={selectedFile || "/placeholder.svg"}
                alt="Captured driver"
                className="w-full h-auto object-cover"
              />
            </CardContent>
          </Card>
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleClick} disabled={isProcessing}>
              Change Image
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
          <FileImage className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">Upload Driver Image</h3>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop an image, or click to browse</p>
          <Button onClick={handleClick} disabled={isProcessing} variant="secondary" className="mx-auto">
            <Upload className="mr-2 h-4 w-4" />
            Select Image
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Supported formats: JPG, PNG, WEBP</p>
        </div>
      )}

      {selectedFile && (
        <Button className="w-full mt-4" onClick={() => onUpload(selectedFile as File)} disabled={isProcessing}>
          Analyze Driver Attention
        </Button>
      )}
    </div>
  )
}
