import { NextResponse } from "next/server"
import { IncomingForm, Fields, Files } from "formidable"
import type { IncomingMessage } from "http"

export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper to parse form with proper types (no `any`)
function parseForm(req: IncomingMessage): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: "./public/uploads",
      keepExtensions: true,
      multiples: true,
    })

    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export async function POST(req: Request) {
  try {
    const { files } = await parseForm(req as unknown as IncomingMessage)

    return NextResponse.json(
      { message: "Upload successful", uploaded: Object.keys(files) },
      { status: 200 }
    )
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
