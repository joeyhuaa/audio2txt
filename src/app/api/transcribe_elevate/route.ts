// app/api/transcribe_elevate
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log('app/api/transcribe_elevate')

  try {
    //get transcript - POST https://api.elevateai.com/v1/interactions/{interactionIdentifier}/transcript
    const res = await fetch(`https://api.elevateai.com/v1/interactions/${interactionIdentifier}/transcript`, {
      method: 'GET',
      headers: { 'X-API-Token': process.env.ELEVATE_AI_API_KEY }
    })
    const data = await res.json()
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}