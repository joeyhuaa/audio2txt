'use client'
import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "./page.module.css";
import Uploader from "@/components/Uploader";
import Transcriber from "@/components/Transcriber";
import LeftSidebar from "@/components/LeftSidebar";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | Blob | null>(null) //just Blob?
  const [s3FileKey, setS3FileKey] = useState<string | null>(null)
  const [downloadUri, setDownloadUri] = useState<string | null>(null)
  const [transcripts, setTranscripts] = useState<any[]>([])

  //fetch all transcripts
  useEffect(() => {
    async function getAllTranscripts() {
      const response = await fetch('/api/get_transcripts')
      const data = await response.json()
      setTranscripts(data)
    }
    getAllTranscripts()
  }, [])

  //create audio url from s3 file key
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

  //
  useEffect(() => {

  }, [audioFile])

  return (
    <Main>
      <LeftSidebar transcripts={transcripts} />
      <main className={styles.main}>
        <Uploader setAudio={(audio: { audioFile: File | Blob | null, s3FileKey: string | null }) => {
          setAudioFile(audio.audioFile)
          setS3FileKey(audio.s3FileKey)
        }} />
        <Transcriber audioUrl={downloadUri} />
      </main>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  padding: 35px;
`
