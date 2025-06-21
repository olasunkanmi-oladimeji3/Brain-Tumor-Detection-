"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface DiagnosisClientProps {
  diagnosisId: string
  initialNotes: string
}

export function DiagnosisClient({ diagnosisId, initialNotes }: DiagnosisClientProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSaveNotes = async () => {
    setIsSaving(true)

    try {
      const supabase = createClient()

      const { error } = await (await supabase).from("diagnoses").update({ clinical_notes: notes }).eq("id", diagnosisId)

      if (error) {
        console.error("Error saving notes:", error)
        // You could add a toast notification here
      } else {
        // Refresh the page to show updated data
        router.refresh()
      }
    } catch (error) {
      console.error("Error saving notes:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
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
          <Button onClick={handleSaveNotes} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Notes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
