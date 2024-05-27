'use client'
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Uploader from "@/components/Uploader";
import Transcriber from "@/components/Transcriber";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | Blob | null>(null) //just Blob?
  const [downloadUri, setDownloadUri] = useState<string | null>(null)

  useEffect(() => {
    console.log(audioFile)
    console.log(downloadUri)
  }, [audioFile, downloadUri])

  useEffect(() => {
    async function getAudioS3() {
      const response = await fetch('/api/get_audio_s3')
      const data = await response.json()
      console.log('getAudioS3', data)
      setDownloadUri(data.url)
    }
    getAudioS3()
  }, [])

  return (
    <main className={styles.main}>
      {/* <Uploader setAudio={(audio: { audioFile: File | Blob | null, downloadUri: string | null }) => {
        setAudioFile(audio.audioFile)
        setDownloadUri(audio.downloadUri)
      }} /> */}
      <Transcriber audioUrl={downloadUri} />
    </main>
  );
}
