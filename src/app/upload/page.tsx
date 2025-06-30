"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Brain,
  FileImage,
  CheckCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  
  useEffect(() => {
    const supabase = createClient();
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      }
    };
    checkUser();
  }, [ router]);

  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [patientData, setpatientData] = useState({
    patientId: "",
    age: "",
    gender: "",
    medicalHistory: "",
    scanDate: "",
    scanType: "",
    fieldStrength: "",
    clinicalNotes: "",
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

// make sure this is imported

const handleUpload = async (e: React.FormEvent) => {
  // saving images is left and pushing to git
  e.preventDefault();
  if (files.length === 0) return;

  setUploading(true);
  setUploadProgress(0);

  const formData = new FormData();
  formData.append("file", files[0]);

  try {
    const analyzeRes = await fetch(
      "https://ml-ai-for-detecting-brain-tumor.onrender.com/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!analyzeRes.ok) throw new Error("Failed to analyze");

    const result = await analyzeRes.json();

    // ✅ Create Supabase client
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // ✅ Save to Supabase and get the inserted ID
    const saveRes = await fetch("/api/save-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user?.id,
        patient_id: patientData.patientId,
        tumor_type: result.tumor_type,
        age: Number(patientData.age),
        gender: patientData.gender,
        scan_date: patientData.scanDate,
        scan_type: patientData.scanType,
        field_strength: patientData.fieldStrength,
        clinical_notes: patientData.clinicalNotes,
        confidence: result.confidence,
        tumor_detected: result.tumor_detected,
        image_url: "", // optional
      }),
    });

    const saveData = await saveRes.json();

    if (saveRes.ok && saveData.id) {
      console.log("✅ Upload success:", saveData);
      // ✅ Redirect to details page with inserted diagnosis ID
      router.push(`/diagnosis/${saveData.id}`);
    } else {
      throw new Error(saveData?.error || "Saving to Supabase failed");
    }
  } catch (error) {
    console.error("❌ Error during upload:", error);
    alert("Upload or analysis failed.");
  }

  setUploading(false);
};


  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white">
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
              <span className="text-xl font-bold text-gray-900">
                Upload MRI Scan
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload MRI Scan
          </h1>
          <p className="text-gray-600">
            Upload your MRI images for AI-powered brain tumor detection and
            analysis.
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Enter patient details for this scan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    placeholder="P-2024-004"
                    required
                    onChange={(e) =>
                      setpatientData({
                        ...patientData,
                        patientId: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="45"
                    required
                    onChange={(e) =>
                      setpatientData({ ...patientData, age: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) =>
                      setpatientData({ ...patientData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-neutral-100">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scanDate">Scan Date</Label>
                  <Input
                    id="scanDate"
                    type="date"
                    required
                    onChange={(e) =>
                      setpatientData({
                        ...patientData,
                        scanDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinicalNotes">Clinical Notes (Optional)</Label>
                <Textarea
                  id="clinicalNotes"
                  placeholder="Any relevant clinical information or symptoms..."
                  rows={3}
                  onChange={(e) =>
                    setpatientData({
                      ...patientData,
                      clinicalNotes: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Scan Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Configuration</CardTitle>
              <CardDescription>
                Specify the type and parameters of the MRI scan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scanType">Scan Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setpatientData({ ...patientData, scanType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scan type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-neutral-100">
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
                  <Select
                    onValueChange={(value) =>
                      setpatientData({ ...patientData, fieldStrength: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field strength" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-neutral-100">
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
                Drag and drop your MRI files or click to browse. Supported
                formats: DICOM, JPEG, PNG
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">
                    Drop your MRI files here
                  </p>
                  <p className="text-gray-500">
                    or click to browse from your computer
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".dcm,.jpg,.jpeg,.png,.dicom"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="fileInput"
                  />
                  <Label htmlFor="fileInput">
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 mx-auto"
                    >
                      Browse Files
                    </Button>
                  </Label>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Maximum file size: 100MB per file</p>
                  <p>
                    Supported formats: DICOM (.dcm), JPEG (.jpg), PNG (.png)
                  </p>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Selected Files ({files.length})
                  </h4>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileImage className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <Badge variant="secondary">
                          {file.name.split(".").pop()?.toUpperCase()}
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
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
                    <span className="text-sm font-medium">
                      Uploading and analyzing...
                    </span>
                    <span className="text-sm text-gray-500">
                      {uploadProgress}%
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Brain className="h-4 w-4 animate-pulse text-blue-600" />
                    <span>
                      AI analysis will begin automatically after upload
                    </span>
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
  );
}
