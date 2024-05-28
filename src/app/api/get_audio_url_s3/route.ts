// app/api/get_audio_url_s3
import { NextRequest, NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { s3FileKey } = await req.json()
    console.log('get_audio_url_s3', s3FileKey)

    // initialize s3 client
    const s3Client = new S3Client({ 
      region: 'us-west-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
      }
    });

    const command = new GetObjectCommand({ //! this is causing error
      Bucket: 'supertonic',
      Key: s3FileKey //test out getting one file
    })
    const audioUrl = await getSignedUrl(
      s3Client,
      command,
      { expiresIn: 3600 } // URL expires in 1 hour
    );
    
    return NextResponse.json({ url: audioUrl }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}