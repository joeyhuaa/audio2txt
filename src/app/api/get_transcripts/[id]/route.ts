// app/api/get_transcripts/[id]
import { NextRequest, NextResponse } from "next/server"
import { requestHeaders } from "@/util";

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = params
    
    requestHeaders.set('Authorization', process.env.ASSEMBLY_AI_API_KEY)
    const response = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
      method: 'GET',
      headers: requestHeaders
    })
    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}