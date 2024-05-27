// app/api/get_audio_s3
import { NextRequest, NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // initialize s3 client
    const s3Client = new S3Client({ 
      region: 'us-west-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });
    console.log(s3Client)

    // let input = {
    //   Bucket: 'supertonic',
    //   Prefix: 'Vox Stems/',
    //   Delimiter: '/',
    //   ContinuationToken: null
    // }

    const command = new GetObjectCommand({ //! this is causing error
      Bucket: 'supertonic',
      Key: 'Vox Stems/Levitate_VOX.mp3' //test out getting one file
    })
    const audioUrl = await getSignedUrl(
      s3Client,
      command,
      { expiresIn: 3600 } // URL expires in 1 hour
    );
    console.log('url',audioUrl)
    
    return NextResponse.json({ url: audioUrl }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}