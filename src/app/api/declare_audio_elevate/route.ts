// app/api/declare_audio_elevate
import { NextRequest, NextResponse } from 'next/server';

interface Headers {
  type: string;
  languageTag: string;
  vertical: string;
  audioTranscriptionMode: string;
  downloadUri?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('app/api/declare_audio_elevate')
  try {
    //ELEVATE.AI API - https://docs.elevateai.com/
    //declare interaction - POST https://api.elevateai.com/v1/interactions

    //construct headers
    let headers: Headers = {
      "type": "audio",
      "languageTag": "en-us",
      "vertical": "default",
      "audioTranscriptionMode": "highAccuracy",
    }
    const { downloadUri } = await req.json()
    if (downloadUri) headers['downloadUri'] = downloadUri

    //construct request
    const res = await fetch('https://api.elevateai.com/v1/interactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Token': process.env.ELEVATE_AI_API_KEY
      },
      body: JSON.stringify(headers)
    })
    // console.log('res1',res1)

    const { interactionIdentifier } = await res?.json()
    console.log('interactionIdentifier',interactionIdentifier)

    const data = { interactionIdentifier }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
