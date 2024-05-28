// app/api/upload_audio_s3
import { NextRequest, NextResponse } from "next/server"
import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formdata: any = await req.formData()
    const file = formdata.get('audioFile')
    const fileStream = file!.stream();

    // initialize s3 client
    const s3Client = new S3Client({ 
      region: 'us-west-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
      }
    });
    const s3FileKey = `Vox Stems/${file?.name}`
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME || 'supertonic',
        Key: s3FileKey, //folder Vox Stems
        Body: fileStream,
        ContentType: "audio/mpeg", //todo - handle other file types
      }
    })
    try {
      upload.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      await upload.done();
      return NextResponse.json({ 
        message: "File uploaded successfully",
        s3FileKey
      }, { status: 200 }) //success
    } catch (error) {
      console.error("Error uploading filestream:", error);
      return NextResponse.json({ message: "Error uploading filestream" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}