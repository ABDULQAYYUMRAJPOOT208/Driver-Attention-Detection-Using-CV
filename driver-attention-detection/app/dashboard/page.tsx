"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, FileImage, FileVideo, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "@/components/image-uploader";
import VideoUploader from "@/components/video-uploader";
import DetectionResults from "@/components/detection-results";
import axios from "axios";

const attentionLabels = {
  c0: "safe driving",
  c1: "texting - right",
  c2: "talking on the phone - right",
  c3: "texting - left",
  c4: "talking on the phone - left",
  c5: "operating the radio",
  c6: "drinking",
  c7: "reaching behind",
  c8: "hair and makeup",
  c9: "talking to passenger",
};

interface ImageAnalysisResults {
  prediction: string;
  confidence: number;
}

interface VideoAnalysisResults {
  prediction: string;
  all_frame_predictions?: any[];
  confidence?: number;
}

export default function DashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("image");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ImageAnalysisResults | VideoAnalysisResults | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    console.log("results", results);
  }, [results]);

  const handleImageUpload = async (file: File): Promise<void> => {
    setSelectedFile(file);
    setResults(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsProcessing(true);
      setProgress(0);

      const uploadProgress = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? prev : prev + 10));
      }, 200);

      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearInterval(uploadProgress);
      setProgress(100);

      if (response.status !== 200) {
        throw new Error("Failed to fetch results");
      }

      const data = response.data;
      const finalResult: ImageAnalysisResults = {
        prediction: attentionLabels[data.prediction as keyof typeof attentionLabels] || data.prediction,
        confidence: parseFloat((data.confidence * 100).toFixed(2)),
      };

      setResults(finalResult);

      toast({
        title: "Analysis Complete",
        description: "Driver attention analysis has been completed successfully.",
      });
    } catch (error) {
      console.error("Error during upload:", error);
      toast({
        title: "Processing Failed",
        description: "There was an error processing your image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleVideoUpload = async (file: File) => {
    setSelectedFile(file);
    setResults(null);

    try {
      setIsProcessing(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/predict_video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setProgress(percentCompleted);
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch results");
      }

      const data = response.data;

      // Expected backend returns: { prediction: 'cX', all_frame_predictions: [...] }
      const videoResults: VideoAnalysisResults = {
        prediction: attentionLabels[data.prediction as keyof typeof attentionLabels] || data.prediction,
        all_frame_predictions: data.all_frame_predictions || [],
        confidence: data.confidence ? parseFloat(data.confidence) : undefined,
      };

      setResults(videoResults);

      toast({
        title: "Video Analysis Complete",
        description: "Driver attention analysis has been completed successfully.",
      });
    } catch (error) {
      console.error("Error during upload:", error);
      toast({
        title: "Processing Failed",
        description: "There was an error processing your video.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Driver Attention Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="image" className="flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            <span>Image</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <FileVideo className="h-4 w-4" />
            <span>Video</span>
          </TabsTrigger>
          <TabsTrigger value="webcam" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Webcam</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <TabsContent value="image" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Image Analysis</CardTitle>
                  <CardDescription>
                    Upload a driver image for attention detection analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader
                    onUpload={handleImageUpload}
                    isProcessing={isProcessing}
                    selectedFile={selectedFile}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Video Analysis</CardTitle>
                  <CardDescription>
                    Upload a video for continuous attention monitoring.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoUploader
                    onUpload={handleVideoUpload}
                    isProcessing={isProcessing}
                    selectedFile={selectedFile}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webcam" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Webcam Analysis</CardTitle>
                  <CardDescription>
                    Use your webcam for real-time attention detection.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* WebcamCapture component currently commented out */}
                </CardContent>
              </Card>
            </TabsContent>

            {isProcessing && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Processing</CardTitle>
                  <CardDescription>
                    Analyzing driver attention patterns...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground text-right">
                    {progress}%
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            {results ? (
              <DetectionResults results={results} type={activeTab} />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="py-12 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">
                    No Analysis Results
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Upload an image, video, or use your webcam to see attention
                    detection results.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const selector =
                        activeTab === "image"
                          ? 'input[type="file"][data-uploader="image"]'
                          : activeTab === "video"
                          ? 'input[type="file"][data-uploader="video"]'
                          : null;

                      if (selector) {
                        const input = document.querySelector(selector) as
                          | HTMLInputElement
                          | null;
                        if (input) {
                          input.click();
                        }
                      }
                    }}
                  >
                    Upload Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
