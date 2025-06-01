"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileImage,
  FileVideo,
  Search,
  Trash2,
} from "lucide-react"

// Mock data for history
const mockHistoryData = [
  {
    id: "1",
    type: "image",
    timestamp: "2023-05-15T14:30:00Z",
    score: 92,
    status: "Attentive",
    notes: "Morning commute check",
  },
  {
    id: "2",
    type: "video",
    timestamp: "2023-05-14T18:45:00Z",
    score: 78,
    status: "Moderately Attentive",
    notes: "Evening drive analysis",
  },
  {
    id: "3",
    type: "webcam",
    timestamp: "2023-05-14T10:15:00Z",
    score: 95,
    status: "Attentive",
    notes: "Pre-drive check",
  },
  {
    id: "4",
    type: "image",
    timestamp: "2023-05-13T16:20:00Z",
    score: 65,
    status: "Inattentive",
    notes: "Fatigue detection test",
  },
  {
    id: "5",
    type: "video",
    timestamp: "2023-05-12T09:30:00Z",
    score: 82,
    status: "Attentive",
    notes: "Highway driving analysis",
  },
  {
    id: "6",
    type: "webcam",
    timestamp: "2023-05-11T14:00:00Z",
    score: 73,
    status: "Moderately Attentive",
    notes: "After lunch check",
  },
  {
    id: "7",
    type: "image",
    timestamp: "2023-05-10T11:45:00Z",
    score: 88,
    status: "Attentive",
    notes: "Regular monitoring",
  },
  {
    id: "8",
    type: "video",
    timestamp: "2023-05-09T19:20:00Z",
    score: 68,
    status: "Inattentive",
    notes: "Night driving analysis",
  },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter history based on search query
  const filteredHistory = mockHistoryData.filter(
    (item) =>
      item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Paginate results
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const paginatedHistory = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Attentive":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "Moderately Attentive":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "Inattentive":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-4 w-4" />
      case "video":
        return <FileVideo className="h-4 w-4" />
      case "webcam":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Attentive":
        return "default"
      case "Moderately Attentive":
        return "outline"
      case "Inattentive":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Detection History</CardTitle>
          <CardDescription>View and manage your previous driver attention analysis sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by type, status, or notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(item.timestamp)}</TableCell>
                      <TableCell>{item.score}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(item.status)} className="flex w-fit items-center gap-1">
                          {getStatusIcon(item.status)}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.notes}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
          <CardDescription>Overview of your driver attention monitoring history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <div className="text-4xl font-bold text-green-500 mb-2">
                {mockHistoryData.filter((item) => item.status === "Attentive").length}
              </div>
              <div className="text-sm text-muted-foreground">Attentive Sessions</div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <div className="text-4xl font-bold text-amber-500 mb-2">
                {mockHistoryData.filter((item) => item.status === "Moderately Attentive").length}
              </div>
              <div className="text-sm text-muted-foreground">Moderate Sessions</div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              <div className="text-4xl font-bold text-red-500 mb-2">
                {mockHistoryData.filter((item) => item.status === "Inattentive").length}
              </div>
              <div className="text-sm text-muted-foreground">Inattentive Sessions</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Average Attention Score</h3>
            <div className="w-full bg-muted rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full"
                style={{
                  width: `${mockHistoryData.reduce((acc, item) => acc + item.score, 0) / mockHistoryData.length}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
