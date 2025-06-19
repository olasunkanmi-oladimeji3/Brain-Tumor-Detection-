"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Brain, FileImage, CheckCircle, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/diagnosis/scan-004")
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
              <span className="text-xl font-bold text-gray-900">Upload MRI Scan</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload MRI Scan</h1>
          <p className="text-gray-600">Upload your MRI images for AI-powered brain tumor detection and analysis.</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Enter patient details for this scan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input id="patientId" placeholder="P-2024-004" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="45" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scanDate">Scan Date</Label>
                  <Input id="scanDate" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinicalNotes">Clinical Notes (Optional)</Label>
                <Textarea id="clinicalNotes" placeholder="Any relevant clinical information or symptoms..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Scan Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Configuration</CardTitle>
              <CardDescription>Specify the type and parameters of the MRI scan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scanType">Scan Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t1">T1-weighted</SelectItem>
                      <SelectItem value="t2">T2-weighted</SelectItem>
                      <SelectItem value="flair">FLAIR</SelectItem>
                      <SelectItem value="dwi">DWI</SelectItem>
                      <SelectItem value="contrast">T1 with contrast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldStrength">Field Strength</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field strength" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5T">1.5 Tesla</SelectItem>
                      <SelectItem value="3T">3 Tesla</SelectItem>
                      <SelectItem value="7T">7 Tesla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload MRI Images</CardTitle>
              <CardDescription>
                Drag and drop your MRI files or click to browse. Supported formats: DICOM, JPEG, PNG
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">Drop your MRI files here</p>
                  <p className="text-gray-500">or click to browse from your computer</p>
                  <Input
                    type="file"
                    multiple
                    accept=".dcm,.jpg,.jpeg,.png,.dicom"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="fileInput"
                  />
                  <Label htmlFor="fileInput">
                    <Button type="button" variant="outline" className="mt-4">
                      Browse Files
                    </Button>
                  </Label>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Maximum file size: 100MB per file</p>
                  <p>Supported formats: DICOM (.dcm), JPEG (.jpg), PNG (.png)</p>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-gray-900">Selected Files ({files.length})</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileImage className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{file.name.split(".").pop()?.toUpperCase()}</Badge>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {uploading && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading and analyzing...</span>
                    <span className="text-sm text-gray-500">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Brain className="h-4 w-4 animate-pulse text-blue-600" />
                    <span>AI analysis will begin automatically after upload</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>All data is encrypted and HIPAA compliant</span>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={files.length === 0 || uploading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? (
                <>
                  <Brain className="mr-2 h-5 w-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload & Analyze ({files.length} files)
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
