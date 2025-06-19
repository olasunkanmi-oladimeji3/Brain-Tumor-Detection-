"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Users,
  Database,
  Settings,
  Upload,
  Download,
  Activity,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [isRetraining, setIsRetraining] = useState(false)
  const [retrainProgress, setRetrainProgress] = useState(0)

  const handleRetrain = () => {
    setIsRetraining(true)
    setRetrainProgress(0)

    const interval = setInterval(() => {
      setRetrainProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRetraining(false)
          return 100
        }
        return prev + 5
      })
    }, 500)
  }

  // Mock data
  const systemStats = {
    totalUsers: 247,
    activeUsers: 189,
    totalScans: 12847,
    scansToday: 34,
    modelAccuracy: 94.2,
    avgProcessingTime: 24,
    storageUsed: 78,
    systemUptime: 99.9,
  }

  const recentUsers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "s.johnson@hospital.com",
      role: "Radiologist",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "m.chen@medical.edu",
      role: "Researcher",
      status: "active",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "e.rodriguez@clinic.org",
      role: "Neurologist",
      status: "pending",
      lastLogin: "Never",
    },
  ]

  const modelVersions = [
    { version: "v2.1", accuracy: 94.2, status: "active", deployDate: "2024-01-10", scansProcessed: 8420 },
    { version: "v2.0", accuracy: 92.8, status: "deprecated", deployDate: "2023-12-15", scansProcessed: 4427 },
    { version: "v1.9", accuracy: 91.3, status: "archived", deployDate: "2023-11-20", scansProcessed: 2156 },
  ]

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
              <Settings className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Administrator Access
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Administration</h1>
          <p className="text-gray-600">Manage users, datasets, and AI model configurations.</p>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">{systemStats.activeUsers} active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalScans.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{systemStats.scansToday} today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.modelAccuracy}%</div>
              <p className="text-xs text-muted-foreground">Avg processing: {systemStats.avgProcessingTime}s</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</div>
              <p className="text-xs text-muted-foreground">Uptime this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage medical professional accounts and permissions</CardDescription>
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Last: {user.lastLogin}</span>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Datasets */}
          <TabsContent value="datasets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Training Datasets</CardTitle>
                    <CardDescription>Manage datasets used for AI model training</CardDescription>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Dataset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <Database className="h-5 w-5 text-blue-600" />
                          <Badge>Active</Badge>
                        </div>
                        <h3 className="font-semibold">Primary Training Set</h3>
                        <p className="text-sm text-gray-600 mb-2">15,420 labeled MRI scans</p>
                        <div className="text-xs text-gray-500">Last updated: Jan 10, 2024</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <Database className="h-5 w-5 text-green-600" />
                          <Badge variant="outline">Validation</Badge>
                        </div>
                        <h3 className="font-semibold">Validation Set</h3>
                        <p className="text-sm text-gray-600 mb-2">3,840 labeled MRI scans</p>
                        <div className="text-xs text-gray-500">Last updated: Jan 8, 2024</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <Database className="h-5 w-5 text-purple-600" />
                          <Badge variant="secondary">Test</Badge>
                        </div>
                        <h3 className="font-semibold">Test Set</h3>
                        <p className="text-sm text-gray-600 mb-2">1,920 labeled MRI scans</p>
                        <div className="text-xs text-gray-500">Last updated: Jan 5, 2024</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Storage Usage</h4>
                    <div className="flex items-center space-x-3">
                      <Progress value={systemStats.storageUsed} className="flex-1" />
                      <span className="text-sm font-medium">{systemStats.storageUsed}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">2.4 TB used of 3.0 TB available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Models */}
          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI Model Versions</CardTitle>
                    <CardDescription>Manage and deploy AI model versions</CardDescription>
                  </div>
                  <Button onClick={handleRetrain} disabled={isRetraining}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRetraining ? "animate-spin" : ""}`} />
                    {isRetraining ? "Retraining..." : "Retrain Model"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isRetraining && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                          <span className="font-medium">Model Retraining in Progress</span>
                        </div>
                        <Progress value={retrainProgress} className="mb-2" />
                        <p className="text-sm text-gray-600">
                          Training new model version with latest dataset... {retrainProgress}%
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {modelVersions.map((model) => (
                    <div key={model.version} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">NeuroDetect {model.version}</div>
                          <div className="text-sm text-gray-500">
                            Deployed: {model.deployDate} • {model.scansProcessed.toLocaleString()} scans processed
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">{model.accuracy}% Accuracy</div>
                        </div>
                        <Badge
                          variant={model.status === "active" ? "default" : "secondary"}
                          className={
                            model.status === "active"
                              ? "bg-green-100 text-green-800"
                              : model.status === "deprecated"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {model.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Metrics
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max File Size (MB)</label>
                    <Input defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Session Timeout (minutes)</label>
                    <Input defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Concurrent Analysis Limit</label>
                    <Input defaultValue="10" />
                  </div>
                  <Button>Save Configuration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage security and compliance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">HIPAA Compliance Mode</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Audit Logging</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Audit Log
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
