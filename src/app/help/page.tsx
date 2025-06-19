import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, Shield, MessageCircle, Mail, Phone, ArrowLeft, HelpCircle, Book, Video } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const faqs = [
    {
      question: "What file formats are supported for MRI uploads?",
      answer:
        "We support DICOM (.dcm), JPEG (.jpg, .jpeg), and PNG (.png) formats. DICOM is preferred as it contains the most medical metadata for accurate analysis.",
    },
    {
      question: "How accurate is the AI tumor detection?",
      answer:
        "Our AI model achieves 94.2% accuracy on average, with sensitivity of 96.8% and specificity of 92.4%. However, AI results should always be reviewed by qualified medical professionals.",
    },
    {
      question: "How long does the analysis take?",
      answer:
        "Most scans are analyzed within 30 seconds. Complex cases or high-resolution images may take up to 2 minutes.",
    },
    {
      question: "Is my patient data secure and HIPAA compliant?",
      answer:
        "Yes, we are fully HIPAA compliant. All data is encrypted in transit and at rest, and we follow strict security protocols for medical data handling.",
    },
    {
      question: "Can I download the analysis results?",
      answer:
        "Yes, you can download detailed PDF reports, DICOM files with annotations, and export data in various formats for integration with your hospital systems.",
    },
    {
      question: "What types of brain tumors can the AI detect?",
      answer:
        "Our AI can detect and classify Gliomas, Meningiomas, and Pituitary Adenomas. We're continuously training the model to detect additional tumor types.",
    },
    {
      question: "Can I share results with colleagues?",
      answer:
        "Yes, you can securely share diagnosis reports with other medical professionals within your institution or external colleagues with proper permissions.",
    },
    {
      question: "What if the AI analysis seems incorrect?",
      answer:
        "You can request a second opinion, add clinical notes to override AI suggestions, or contact our medical team for review. Remember, AI is a diagnostic aid, not a replacement for clinical judgment.",
    },
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
              <HelpCircle className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Help & Support</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">Find answers to common questions and get support for using NeuroDetect AI.</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search help articles..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Start Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-green-600" />
                  <span>Quick Start Guide</span>
                </CardTitle>
                <CardDescription>Get started with NeuroDetect AI in 3 simple steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Upload MRI Scan</h3>
                    <p className="text-gray-600">
                      Upload your DICOM, JPEG, or PNG MRI files through our secure platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Analysis</h3>
                    <p className="text-gray-600">Our AI analyzes the scan for brain tumors in under 30 seconds.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Review Results</h3>
                    <p className="text-gray-600">Review the detailed diagnosis report and add your clinical notes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about using NeuroDetect AI</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-purple-600" />
                  <span>Video Tutorials</span>
                </CardTitle>
                <CardDescription>Watch step-by-step video guides</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Getting Started</h3>
                    <p className="text-sm text-gray-600">Learn the basics of uploading and analyzing MRI scans.</p>
                    <Badge className="mt-2">5 min</Badge>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Understanding Results</h3>
                    <p className="text-sm text-gray-600">
                      How to interpret AI diagnosis results and confidence scores.
                    </p>
                    <Badge className="mt-2">8 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span>Contact Support</span>
                </CardTitle>
                <CardDescription>Get help from our medical support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@neurodetect.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            {/* Submit Ticket */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Ticket</CardTitle>
                <CardDescription>Describe your issue and we'll help you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Please provide detailed information about your issue..." rows={4} />
                </div>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/docs" className="flex items-center space-x-2 text-blue-600 hover:underline">
                  <Book className="h-4 w-4" />
                  <span>Documentation</span>
                </Link>
                <Link href="/api-docs" className="flex items-center space-x-2 text-blue-600 hover:underline">
                  <FileText className="h-4 w-4" />
                  <span>API Documentation</span>
                </Link>
                <Link href="/security" className="flex items-center space-x-2 text-blue-600 hover:underline">
                  <Shield className="h-4 w-4" />
                  <span>Security & Compliance</span>
                </Link>
                <Link href="/training" className="flex items-center space-x-2 text-blue-600 hover:underline">
                  <Video className="h-4 w-4" />
                  <span>Training Materials</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
