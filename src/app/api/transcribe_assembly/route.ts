// app/api/transcribe_assembly
import { NextRequest, NextResponse } from "next/server"
import { AssemblyAI } from 'assemblyai'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { audioUrl } = await req.json()
    if (audioUrl) {
      const client = new AssemblyAI({ apiKey: process.env.ASSEMBLY_AI_API_KEY ?? '' })

      const params = {
        audio: audioUrl,
        speaker_labels: true
      }

      const transcript = await client.transcripts.transcribe(params)
      return NextResponse.json(transcript, { status: 200 })
    } else {
      return NextResponse.json({ message: 'no download uri was found' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}