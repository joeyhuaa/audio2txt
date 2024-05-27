'use client'
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Uploader from "@/components/Uploader";
import Transcriber from "@/components/Transcriber";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | Blob | null>(null) //just Blob?
  const [s3FileKey, setS3FileKey] = useState<string | null>(null)
  const [downloadUri, setDownloadUri] = useState<string | null>(null)

  useEffect(() => {
    async function getAudioUrlS3() {
      console.log('s3FileKey',s3FileKey)
      const response = await fetch('/api/get_audio_url_s3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ s3FileKey })
      })
      const data = await response.json()
      console.log('getAudioUrlS3', data)
      setDownloadUri(data.url)
    }
    if (s3FileKey) getAudioUrlS3()
  }, [s3FileKey])

  useEffect(() => {

  }, [audioFile])

  return (
    <main className={styles.main}>
      <Uploader setAudio={(audio: { audioFile: File | Blob | null, s3FileKey: string | null }) => {
        setAudioFile(audio.audioFile)
        setS3FileKey(audio.s3FileKey)
      }} />
      <Transcriber audioUrl={downloadUri} />
    </main>
  );
}
