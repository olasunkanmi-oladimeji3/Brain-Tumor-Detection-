"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileSearch,
  Brain,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Scan = {
  id: string;
  patient_id: string;
  scan_date: string;
  status: "completed" | "processing" | "failed"; // adjust as needed
  result?: string;
  confidence?: number;
};
export default function DashboardPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null>(null);

  const [recentScans, setRecentScans] = useState<Scan[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("medical_users")
        .select("*")
        .eq("id", user.id)
        .single();

      setUserInfo({
        id: user.id,
        email: user.email!,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
      });

      // 🧠 Fetch diagnoses for this user
      const { data: scans, error } = await supabase
        .from("diagnoses")
        .select("*")
        .eq("user_uid", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching diagnoses", error);
      } else {
        setRecentScans(scans);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              NeuroDetect AI
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                router.push("/auth/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userInfo?.last_name}
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your brain tumor diagnoses
            today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/upload"
            className="hover:shadow-lg transition-shadow bg-white"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Upload New Scan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload MRI scans for AI analysis
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link
            href="/history"
            className="hover:shadow-lg transition-shadow bg-white"
          >
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

          <Card className="hover:shadow-lg transition-shadow bg-white">
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

          <Link
            href="/help"
            className="hover:shadow-lg transition-shadow bg-white"
          >
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
          <Card className="hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tumors Detected
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                18.1% detection rate
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Confidence
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Analysis Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24s</div>
              <p className="text-xs text-muted-foreground">
                -3s from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans */}
        <Card className="hover:shadow-lg transition-shadow bg-neutral-100">
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
                <Link
                  key={scan.id}
                  href={`/diagnosis/${scan.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-amber-100 hover:bg-amber-200 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{scan.patient_id}</div>
                        <div className="text-sm text-gray-500">
                          {scan.scan_date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {scan.result || "Pending analysis"}
                        </div>
                        {scan.confidence && (
                          <div className="text-sm text-gray-500">
                            Confidence: {scan.confidence}%
                          </div>
                        )}
                      </div>

                      <Badge
                        variant={
                          scan.status === "completed" ? "default" : "secondary"
                        }
                        className={
                          scan.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {scan.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
