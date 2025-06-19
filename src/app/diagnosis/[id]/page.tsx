"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Download, Share2, ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Eye, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


// type Props = {
//   params: {
//     id: string
//   }
// }

// ✅ This works for Next.js App Router dynamic routes
export default function DiagnosisPage() {
  // const { id } = params;
  // console.log(id);
  
  const [notes, setNotes] = useState("")

  // Mock diagnosis data
  const diagnosis = {
    id: 1,
    patientId: "P-2024-004",
    scanDate: "2024-01-15",
    analysisDate: "2024-01-15 14:30:22",
    status: "completed",
    tumorDetected: true,
    tumorType: "Glioma",
    confidence: 94.2,
    location: "Left frontal lobe",
    size: "2.3 x 1.8 x 1.5 cm",
    volume: "6.21 cm³",
    scanType: "T1-weighted with contrast",
    fieldStrength: "3 Tesla",
    processingTime: "24 seconds",
    aiModel: "NeuroDetect v2.1",
    metrics: {
      sensitivity: 96.8,
      specificity: 92.4,
      precision: 89.7,
      recall: 96.8,
      f1Score: 93.1,
    },
  }

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
              <span className="text-xl font-bold text-gray-900">Diagnosis Report</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient {diagnosis.patientId}</h1>
              <p className="text-gray-600">
                Scan Date: {diagnosis.scanDate} • Analysis: {diagnosis.analysisDate}
              </p>
            </div>
            <Badge
              className={`text-lg px-4 py-2 ${
                diagnosis.tumorDetected ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}
            >
              {diagnosis.tumorDetected ? "Tumor Detected" : "No Tumor Detected"}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Analysis Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span>AI Analysis Results</span>
                    </CardTitle>
                    <CardDescription>Automated brain tumor detection and classification</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {diagnosis.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {diagnosis.tumorDetected ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-red-700">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-semibold">Tumor Detected</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Tumor Type</label>
                        <p className="text-lg font-semibold">{diagnosis.tumorType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <p className="text-lg font-semibold">{diagnosis.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Size</label>
                        <p className="text-lg font-semibold">{diagnosis.size}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Volume</label>
                        <p className="text-lg font-semibold">{diagnosis.volume}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Confidence Score</label>
                      <div className="flex items-center space-x-3">
                        <Progress value={diagnosis.confidence} className="flex-1" />
                        <span className="text-sm font-medium">{diagnosis.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">No tumor detected in this scan</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* MRI Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span>MRI Visualization</span>
                </CardTitle>
                <CardDescription>Original scan with AI-highlighted regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">MRI Scan Visualization</p>
                    <p className="text-sm">Interactive viewer would be displayed here</p>
                    {diagnosis.tumorDetected && (
                      <Badge className="mt-2 bg-red-100 text-red-800">Tumor regions highlighted in red</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>Clinical Notes</span>
                </CardTitle>
                <CardDescription>Add your clinical observations and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your clinical notes, observations, and recommendations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                />
                <div className="flex justify-end mt-4">
                  <Button>Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scan Information */}
            <Card>
              <CardHeader>
                <CardTitle>Scan Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Scan Type</label>
                  <p className="text-sm">{diagnosis.scanType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Field Strength</label>
                  <p className="text-sm">{diagnosis.fieldStrength}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Processing Time</label>
                  <p className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {diagnosis.processingTime}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">AI Model</label>
                  <p className="text-sm flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    {diagnosis.aiModel}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
                <CardDescription>Model accuracy statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sensitivity</span>
                      <span>{diagnosis.metrics.sensitivity}%</span>
                    </div>
                    <Progress value={diagnosis.metrics.sensitivity} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Specificity</span>
                      <span>{diagnosis.metrics.specificity}%</span>
                    </div>
                    <Progress value={diagnosis.metrics.specificity} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Precision</span>
                      <span>{diagnosis.metrics.precision}%</span>
                    </div>
                    <Progress value={diagnosis.metrics.precision} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>F1-Score</span>
                      <span>{diagnosis.metrics.f1Score}%</span>
                    </div>
                    <Progress value={diagnosis.metrics.f1Score} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download DICOM
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Colleague
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Separator />
                <Button className="w-full" variant="destructive" size="sm">
                  Request Second Opinion
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
