'use client'
import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

interface TranscriberProps {
  audioUrl: string | null;
}

//handles audio transcription
const Transcriber: React.FC<TranscriberProps> = ({ audioUrl }) => {
  const [transcript, setTranscript] = useState<string>()

  useEffect(() => {
    console.log(audioUrl)
    async function getTranscript() {
      const response = await fetch('/api/transcribe_assembly', {
        method: 'POST',
        body: JSON.stringify({ audioUrl })
      })
      const data = await response.json()
      const text = data.text
      setTranscript(text)
    } 
    if (audioUrl) getTranscript()
  }, [audioUrl])

  return (
    <div>
      <h1>Transcriber</h1>
      <p>{transcript ? transcript : 'transcribing audio...'}</p>
    </div>
  )
}

export default Transcriber