"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileSearch, Brain, TrendingUp, Clock, CheckCircle, AlertTriangle, Users, Activity } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const recentScans = [
    {
      id: "scan-001",
      patientId: "P-2024-001",
      date: "2024-01-15",
      status: "completed",
      result: "Glioma detected",
      confidence: 94.2,
    },
    {
      id: "scan-002",
      patientId: "P-2024-002",
      date: "2024-01-14",
      status: "completed",
      result: "No tumor detected",
      confidence: 98.7,
    },
    {
      id: "scan-003",
      patientId: "P-2024-003",
      date: "2024-01-14",
      status: "processing",
      result: "Analysis in progress",
      confidence: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NeuroDetect AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Dr. Sarah Johnson</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              SJ
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Dr. Johnson</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your brain tumor diagnoses today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/upload">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Upload New Scan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Upload MRI scans for AI analysis</CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/history">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <FileSearch className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">View History</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Browse previous scan results</CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>View diagnostic statistics</CardDescription>
            </CardContent>
          </Card>

          <Link href="/help">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg">Help & Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Get help and documentation</CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tumors Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">18.1% detection rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Analysis Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24s</div>
              <p className="text-xs text-muted-foreground">-3s from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>Your latest MRI scan analyses</CardDescription>
              </div>
              <Link href="/history">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{scan.patientId}</div>
                      <div className="text-sm text-gray-500">{scan.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">{scan.result}</div>
                      {scan.confidence && <div className="text-sm text-gray-500">Confidence: {scan.confidence}%</div>}
                    </div>

                    <Badge
                      variant={scan.status === "completed" ? "default" : "secondary"}
                      className={scan.status === "completed" ? "bg-green-100 text-green-800" : ""}
                    >
                      {scan.status === "completed" ? "Completed" : "Processing"}
                    </Badge>

                    {scan.status === "completed" && (
                      <Link href={`/diagnosis/${scan.id}`}>
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
