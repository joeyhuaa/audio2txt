'use client'
import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

interface UploaderProps {
  setAudio: (audio: { audioFile: File | Blob | null, downloadUri: string | null }) => void;
}

//audio file uploads
const Uploader: React.FC<UploaderProps> = ({ setAudio }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [audioFile, setAudioFile] = useState<File | Blob | null>(null) //just Blob?
  const [downloadUri, setDownloadUri] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  // elevate.ai api
  useEffect(() => {
    async function getTranscript() {
      if (downloadUri) {
        const res1 = await fetch('/api/declare_audio', {
          method: 'POST',
          body: JSON.stringify({ downloadUri }),
        })
        const { interactionIdentifier } = await res1?.json()
        console.log(interactionIdentifier)

        //todo
        // const res2 = await fetch('/api/transcribe', {
        //   method: 'POST',
        //   body: JSON.stringify({ interactionIdentifier })
        // })

        //! cors error maybe need to do this on server
        const res2 = await fetch(`https://api.elevateai.com/v1/interactions/${interactionIdentifier}/transcript`, {
          method: 'GET',
          headers: { 'X-API-Token': process.env.ELEVATE_AI_API_KEY }
        })
        const data = await res2.json()
        console.log('data',data)
      } 
      
      //todo
      // if (audioFile) {
        // const formdata = new FormData()
        // formdata.append('file.mp3', audioFile)
      //   console.log('no audioFile has been uploaded yet')
      // }
    }

    // console.log('audioFile',audioFile)
    // getTranscript()
  }, [downloadUri, audioFile])

  // pass audio states to parent
  useEffect(() => {
    setAudio({ audioFile, downloadUri })
  }, [downloadUri, audioFile])

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      setAudioFile(files[0]);

      // Generate download URI for the selected file
      const uri = URL.createObjectURL(files[0]);
      setDownloadUri(uri);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
      />
      <UploadButton
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        {audioFile ? audioFile.name : 'Drag & Drop or Click to Upload Track'}
      </UploadButton>
    </div>
  )
}

export default Uploader

const UploadButton = styled.button`
  margin: auto;
  cursor: pointer;
  padding: 20px;
  background: purple;
  border: none;
  border-radius: 15px;
  display: flex;
  align-items: center;
  &:hover { background: #301934 };
`