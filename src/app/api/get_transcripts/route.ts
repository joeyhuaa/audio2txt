// app/api/get_transcripts
import { NextResponse } from "next/server"
import { requestHeaders } from "@/util";

export async function GET(): Promise<NextResponse> {
  try {
    let transcripts: any[] = []
    requestHeaders.set('Authorization', process.env.ASSEMBLY_AI_API_KEY ?? '')

    //fetch 10 most recent transcripts
    const response = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'GET',
      headers: requestHeaders,
      cache: 'no-store' //nextjs caches GET requests by default, opt out so we get fresh results every call
    })
    const data = await response.json()
    console.log('data',data)
    transcripts = data.transcripts
    
    //keep fetching prev page of transcripts if prev_url is present 
    let prevUrl = data.page_details.prev_url
    while (prevUrl) {
      const response = await fetch(prevUrl, {
        method: 'GET',
        headers: requestHeaders,
        cache: 'no-store'
      })
      const newData = await response.json()
      transcripts = [...transcripts, ...newData.transcripts]
      prevUrl = newData.page_details.prev_url
    }

    return NextResponse.json(transcripts, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}