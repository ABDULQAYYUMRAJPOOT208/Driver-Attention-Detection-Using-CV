"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  LineChart,
  Share2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

interface ImageResults {
  prediction: string;
  confidence: number;
}

interface VideoResults {
  prediction: string;
  confidence: number;
}

interface DetectionResultsProps {
  results: ImageResults | VideoResults;
  type: string;
}

export default function DetectionResults({
  results,
  type,
}: DetectionResultsProps) {
  const [finalResults, setFinalResults] = useState<DetectionResultsProps>();
  useEffect(() => {
    setFinalResults({ results, type });
    console.log("detection result in Results: ", results);
  }, [results, type]);
  // setFinalResults({ results, type });
  const isVideoResults = "attentionOverTime" in results;
  // const attentionScore = results.attentionScore

  const getAttentionColor = () => {
    if (finalResults?.results?.confidence! >= 85 &&
      finalResults?.results?.prediction === "safe driving") return "text-green-500";
    if (finalResults?.results?.confidence!) return "text-amber-500";
    return "text-red-500";
  };

  const getAttentionIcon = () => {
    if (
      finalResults?.results?.confidence! >= 85 &&
      finalResults?.results?.prediction === "safe driving"
    )
      return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    if (finalResults?.results?.confidence! >= 70)
      return <AlertTriangle className="h-6 w-6 text-amber-500" />;
    return <AlertCircle className="h-6 w-6 text-red-500" />;
  };

  const getAttentionStatus = () => {
    if (finalResults?.results?.confidence! >= 85 && finalResults?.results?.prediction === "safe driving") return "Attentive";
    if (finalResults?.results?.confidence! >= 60) return "Moderately Attentive";
    return "Inattentive";
  };

  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `attention-report-${new Date().toISOString()}.json`
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center justify-between">
            <span>Attention Analysis</span>
            <Badge
              variant={
                finalResults?.results?.confidence! >= 85
                  ? "default"
                  : finalResults?.results?.confidence! >= 70
                  ? "outline"
                  : "destructive"
              }
              className="ml-2 text-md px-3 py-1"
            >
              {getAttentionStatus()}
            </Badge>
          </CardTitle>
          <CardDescription>
            {type === "image"
              ? "Single image analysis"
              : type === "video"
              ? "Video sequence analysis"
              : "Webcam capture analysis"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-muted">
              <div className="text-4xl font-bold flex flex-col items-center">
                <span className={getAttentionColor()}>
                  {finalResults?.results?.confidence!}
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  Attention Score
                </span>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-center py-6 text-${
              finalResults?.results?.prediction === "safe driving"
                ? "green-500"
                : "amber-500"
            } `}
          >
            {getAttentionIcon()}
            {/* Change color according to prediction */}

            <span className="text-2xl font-bold ml-2">
              {finalResults?.results?.prediction === "safe driving" ? (
                "Safe Driving"
              ) : (
                <span>
                  Distracted Driving
                  <div> Maybe {finalResults?.results?.prediction}</div>
                </span>
              )}
            </span>
          </div>

          {!isVideoResults && "eyesOpen" in results && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <span>Eyes: {results.eyesOpen ? "Open" : "Closed"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                <span>
                  Looking ahead:{" "}
                  {results.prediction === "safe driving" ? "Yes" : "No"}
                </span>
              </div>
            </div>
          )}

          {isVideoResults && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  {/* <span>Duration: {results.totalDuration}</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  {/* <span>Distraction Events: {results.distractionEvents}</span> */}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Attention Over Time
                </h4>
                <div className="h-16 flex items-end gap-1">
                  {/* {results.attentionOverTime.map((value, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-full h-[${value}%] rounded-t-sm ${
                              value >= 85
                                ? "bg-green-500"
                                : value >= 70
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ height: `${value}%` }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Score: {value}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))} */}
                </div>
              </div>

              {/* {results.riskPeriods.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Risk Periods</h4>
                  <div className="space-y-2">
                    {results.riskPeriods.map((period, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm p-2 bg-muted rounded-md"
                      >
                        <span>
                          {period.start} - {period.end}
                        </span>
                        <Badge variant="outline">{period.reason}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          )}

          {!isVideoResults && "distractions" in results && (
            // results.distractions.length > 0
            //  &&
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Detected Distractions
              </h4>
              <div className="flex flex-wrap gap-2">
                {/* {results.distractions.map((distraction, index) => (
                  <Badge key={index} variant="outline">
                    {distraction}
                  </Badge>
                ))} */}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* {results.recommendations.map((recommendation, index) => (
              <Alert key={index}>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Recommendation {index + 1}</AlertTitle>
                <AlertDescription>{recommendation}</AlertDescription>
              </Alert>
            ))} */}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="w-full" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div>
    </div>
  );
}
