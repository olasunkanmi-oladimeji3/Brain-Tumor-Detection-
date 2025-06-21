"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Download,
  Share2,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DiagnosisClient } from "../diagnosis-client";
import { useParams } from "next/navigation";

type Diagnosis = {
  id: string;
  patient_id: string;
  scan_date: string;
  created_at: string;
  tumor_type: string;
  tumor_detected: boolean;
  confidence: number;
  scan_type: string;
  field_strength: string;
  clinical_notes: string;
  location?: string;
  size?: string;
  volume?: string;
  processing_time?: string;
};

// Server component that fetches data from Supabase
export default function DiagnosisPage() {
  const { id } = useParams();
  const [diagnosisData, setdiagnosisData] = useState<Diagnosis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("diagnoses")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Not found");
        return;
      }

      setdiagnosisData(data);
    };

    if (id) fetchDiagnosis();
  }, [id]);

  // Transform Supabase data to match our existing interface

  if (error || !diagnosisData) {
    return (
      <div className="p-6 text-red-600">
        Error: {error || "Diagnosis not found."}
      </div>
    );
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
              <span className="text-xl font-bold text-gray-900">
                Diagnosis Report
              </span>
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
              <h1 className="text-3xl font-bold text-gray-900">
                Patient {diagnosisData?.patient_id}
              </h1>
              <p className="text-gray-600">
                Scan Date: {diagnosisData?.scan_date} • Analysis:{" "}
                {diagnosisData?.created_at}
              </p>
            </div>
            <Badge
              className={`text-lg px-4 py-2 ${
                diagnosisData?.tumor_detected
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {diagnosisData?.tumor_detected
                ? "Tumor Detected"
                : "No Tumor Detected"}
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
                    <CardDescription>
                      Automated brain tumor detection and classification
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {diagnosisData?.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {diagnosisData?.tumor_detected ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-red-700">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-semibold">Tumor Detected</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Tumor Type
                        </label>
                        <p className="text-lg font-semibold">
                          {diagnosisData?.tumor_type}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <p className="text-lg font-semibold">
                          {diagnosisData?.location}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Size
                        </label>
                        <p className="text-lg font-semibold">
                          {diagnosisData?.size}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Volume
                        </label>
                        <p className="text-lg font-semibold">
                          {diagnosisData?.volume}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Confidence Score
                      </label>
                      <div className="flex items-center space-x-3">
                        <Progress
                          value={diagnosisData.confidence}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">
                          {diagnosisData.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">
                      No tumor detected in this scan
                    </span>
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
                <CardDescription>
                  Original scan with AI-highlighted regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">
                      MRI Scan Visualization
                    </p>
                    <p className="text-sm">
                      Interactive viewer would be displayed here
                    </p>
                    {diagnosisData?.tumor_detected && (
                      <Badge className="mt-2 bg-red-100 text-red-800">
                        Tumor regions highlighted in red
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Notes - Client Component for Editing */}
            <DiagnosisClient
              diagnosisId={diagnosisData?.id ?? ""}
              initialNotes={diagnosisData?.clinical_notes ?? ""}
            />
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
                  <label className="text-sm font-medium text-gray-700">
                    Scan Type
                  </label>
                  <p className="text-sm">{diagnosisData?.scan_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Field Strength
                  </label>
                  <p className="text-sm">{diagnosisData?.field_strength}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Processing Time
                  </label>
                  <p className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {diagnosisData?.processing_time || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    AI Model
                  </label>
                  <p className="text-sm flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    {/* {diagnosisData?.ai_model} */}
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
                      {/* <span>{diagnosisData?.metrics.sensitivity}%</span> */}
                    </div>
                    {/* <Progress value={diagnosisData?.metrics.sensitivity} /> */}
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Specificity</span>
                      {/* <span>{diagnosisData?.metrics.specificity}%</span> */}
                    </div>
                    {/* <Progress value={diagnosisData?.metrics.specificity} /> */}
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Precision</span>
                      {/* <span>{diagnosisData?.metrics.precision}%</span> */}
                    </div>
                    {/* <Progress value={diagnosisData?.metrics.precision} /> */}
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>F1-Score</span>
                      {/* <span>{diagnosisData?.metrics.f1Score}%</span> */}
                    </div>
                    {/* <Progress value={diagnosisData?.metrics.f1Score} /> */}
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
  );
}
