// app/api/upload_audio_elevate
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('app/api/upload_audio_elevate')

  try {
    //upload audio file - POST https://api.elevateai.com/v1/interactions/{interactionIdentifier}/upload

    // const formdata = await req.formData()
    // console.log('formdata',formdata)

    const res = await fetch(`https://api.elevateai.com/v1/interactions/${interactionIdentifier}/upload`, {
      method: 'POST',
      headers: { 
        'X-API-Token': process.env.ELEVATE_AI_API_KEY 
      }
    })
    const data = await res.json()
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}