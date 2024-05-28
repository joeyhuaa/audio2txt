// app/api/get_transcripts/[id]
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = params
    //fetch 10 most recent transcripts
    const response = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
      method: 'GET',
      headers: { 'Authorization': process.env.ASSEMBLY_AI_API_KEY }
    })
    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}