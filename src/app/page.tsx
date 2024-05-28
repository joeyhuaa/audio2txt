'use client'
import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "./page.module.css";
import Uploader from "@/components/Uploader";
import Transcriber from "@/components/Transcriber";
import LeftSidebar from "@/components/LeftSidebar";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null) //just Blob?
  const [s3FileKey, setS3FileKey] = useState<string | null>(null)
  const [downloadUri, setDownloadUri] = useState<string | null>(null)
  const [transcripts, setTranscripts] = useState<any[]>([])
  const [currTranscript, setCurrTranscript] = useState<{ text: string } | null>(null)

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
      <LeftSidebar transcripts={transcripts} setCurrTranscript={(transcript: { text: string }) => setCurrTranscript(transcript)} />

      <TranscriptView>
        <h1 style={{marginBottom:'20px'}}>View Transcript</h1>
        {currTranscript && <TranscriptContent>{currTranscript.text}</TranscriptContent>}
      </TranscriptView>

      <RightSide>
        <Uploader setAudio={(audio: { audioFile: File | null, s3FileKey: string | null }) => {
          setAudioFile(audio.audioFile)
          setS3FileKey(audio.s3FileKey)
        }} />
        <Transcriber audioUrl={downloadUri} />
      </RightSide>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  padding: 35px;
`
const TranscriptView = styled.div`
  height: 80%;
  padding-left: 35px;
  width: 60%;
`
const TranscriptContent = styled.span`
  // margin-top: 20px;
`
const RightSide = styled.div`
  display: flex;
  flex-direction: column;
`
