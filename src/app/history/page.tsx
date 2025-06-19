"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Search, Filter, Download, Eye, Calendar, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterResult, setFilterResult] = useState("all")

  // Mock scan history data
  const scanHistory = [
    {
      id: "scan-001",
      patientId: "P-2024-001",
      scanDate: "2024-01-15",
      analysisDate: "2024-01-15 14:30:22",
      status: "completed",
      tumorDetected: true,
      tumorType: "Glioma",
      confidence: 94.2,
      scanType: "T1 with contrast",
    },
    {
      id: "scan-002",
      patientId: "P-2024-002",
      scanDate: "2024-01-14",
      analysisDate: "2024-01-14 16:45:10",
      status: "completed",
      tumorDetected: false,
      tumorType: null,
      confidence: 98.7,
      scanType: "T2-weighted",
    },
    {
      id: "scan-003",
      patientId: "P-2024-003",
      scanDate: "2024-01-14",
      analysisDate: "2024-01-14 11:20:33",
      status: "completed",
      tumorDetected: true,
      tumorType: "Meningioma",
      confidence: 91.8,
      scanType: "FLAIR",
    },
    {
      id: "scan-004",
      patientId: "P-2024-004",
      scanDate: "2024-01-13",
      analysisDate: "2024-01-13 09:15:44",
      status: "completed",
      tumorDetected: true,
      tumorType: "Pituitary Adenoma",
      confidence: 89.3,
      scanType: "T1-weighted",
    },
    {
      id: "scan-005",
      patientId: "P-2024-005",
      scanDate: "2024-01-12",
      analysisDate: "2024-01-12 15:30:12",
      status: "completed",
      tumorDetected: false,
      tumorType: null,
      confidence: 96.4,
      scanType: "T2-weighted",
    },
    {
      id: "scan-006",
      patientId: "P-2024-006",
      scanDate: "2024-01-11",
      analysisDate: "2024-01-11 13:45:28",
      status: "processing",
      tumorDetected: null,
      tumorType: null,
      confidence: null,
      scanType: "DWI",
    },
  ]

  const filteredScans = scanHistory.filter((scan) => {
    const matchesSearch =
      scan.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (scan.tumorType && scan.tumorType.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = filterStatus === "all" || scan.status === filterStatus

    const matchesResult =
      filterResult === "all" ||
      (filterResult === "tumor" && scan.tumorDetected) ||
      (filterResult === "no-tumor" && scan.tumorDetected === false)

    return matchesSearch && matchesStatus && matchesResult
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Scan History</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
          <p className="text-gray-600">View and manage all your previous MRI scan analyses.</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter & Search</CardTitle>
            <CardDescription>Find specific scans using filters and search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Patient ID or tumor type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="tumor">Tumor Detected</SelectItem>
                  <SelectItem value="no-tumor">No Tumor</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{scanHistory.length}</div>
              <p className="text-sm text-gray-600">Total Scans</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">{scanHistory.filter((s) => s.tumorDetected).length}</div>
              <p className="text-sm text-gray-600">Tumors Detected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {scanHistory.filter((s) => s.tumorDetected === false).length}
              </div>
              <p className="text-sm text-gray-600">Clear Scans</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {scanHistory.filter((s) => s.status === "processing").length}
              </div>
              <p className="text-sm text-gray-600">Processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Scan List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Scan Results ({filteredScans.length})</CardTitle>
                <CardDescription>Click on any scan to view detailed results</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredScans.map((scan) => (
                <div key={scan.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{scan.patientId}</h3>
                          <Badge
                            variant={scan.status === "completed" ? "default" : "secondary"}
                            className={
                              scan.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : scan.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {scan.status === "completed"
                              ? "Completed"
                              : scan.status === "processing"
                                ? "Processing"
                                : "Failed"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {scan.scanDate}
                          </span>
                          <span>{scan.scanType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {scan.status === "completed" && (
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {scan.tumorDetected ? (
                              <>
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <span className="font-medium text-red-700">{scan.tumorType}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-green-700">No tumor detected</span>
                              </>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Confidence: {scan.confidence}%</div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        {scan.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                            <Link href={`/diagnosis/${scan.id}`}>
                              <Button size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Report
                              </Button>
                            </Link>
                          </>
                        )}
                        {scan.status === "processing" && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Processing...
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredScans.length === 0 && (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No scans found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterStatus !== "all" || filterResult !== "all"
                      ? "Try adjusting your search or filters"
                      : "Upload your first MRI scan to get started"}
                  </p>
                  <Link href="/upload">
                    <Button>
                      <Brain className="h-4 w-4 mr-2" />
                      Upload New Scan
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
