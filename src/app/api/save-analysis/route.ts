import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase.from("diagnoses").insert([
    {
      patient_id: body.patient_id,
      tumor_type: body.tumor_type,
      confidence: body.confidence,
      tumor_detected: body.tumor_detected,
      image_url: body.image_url,
      gender: body.gender,
      age: body.age,
      scan_type: body.scan_type,
      field_strength: body.field_strength,
      clinical_notes: body.clinical_notes,
      scan_date: body.scan_date,
      user_uid: body.user_uid,
    },
  ]).select("id")
    .single();  // 👈 Make sure to select `id` for return
  if (error || !data?.id) {
    console.error("Error saving to Supabase:", error);
    return NextResponse.json({ success: false, error: error?.message || "No ID returned" }, { status: 500 });
  }

  
  // /api/save-analysis/route.ts
const insertedId = data?.id;
return NextResponse.json({ success: true, id: insertedId }, { status: 200 });

}
