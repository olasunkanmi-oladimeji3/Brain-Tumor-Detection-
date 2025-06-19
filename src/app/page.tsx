import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Upload, FileSearch, Shield, Users, Award } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NeuroDetect AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">AI-Powered Medical Diagnosis</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AI-Powered Brain Tumor Detection</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced machine learning technology to assist medical professionals in detecting and classifying brain
            tumors from MRI scans with high accuracy and speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Upload className="mr-2 h-5 w-5" />
                Upload MRI Scan
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <FileSearch className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Our System Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Upload MRI Scan</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Securely upload DICOM, JPEG, or PNG MRI images through our encrypted platform
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our advanced neural network analyzes the scan for tumor detection and classification
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <FileSearch className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Detailed Report</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive comprehensive diagnosis reports with confidence scores and visualizations
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">94.5%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{"<"}30s</div>
              <div className="text-gray-600">Analysis Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Scans Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Medical Professionals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Trusted by Medical Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>HIPAA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Full compliance with healthcare data protection regulations</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Clinical Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Validated by leading radiologists and neurosurgeons worldwide</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>FDA Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Approved for clinical use as a diagnostic aid tool</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of medical professionals using AI to improve brain tumor diagnosis accuracy and speed.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="font-bold">NeuroDetect AI</span>
              </div>
              <p className="text-gray-400">Advanced AI-powered brain tumor detection for medical professionals.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features">Features</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/demo">Demo</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/docs">Documentation</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/compliance">Compliance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NeuroDetect AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
