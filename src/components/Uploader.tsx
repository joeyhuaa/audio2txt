'use client'
import { useState, useEffect, useRef } from "react"
import styled from "styled-components"

interface UploaderProps {
  setAudio: (audio: { audioFile: File | null, s3FileKey: string | null }) => void;
}

//audio file uploads
const Uploader: React.FC<UploaderProps> = ({ setAudio }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null) //just Blob?
  const [s3FileKey, setS3FileKey] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  // elevate.ai api
  useEffect(() => {
    async function uploadAudio() {
      const formdata: any = new FormData()
      formdata.append('audioFile', audioFile)

      const response = await fetch('/api/upload_audio_s3', {
        method: 'POST',
        body: formdata
      })
      const data = await response.json()
      console.log(data)
      const { s3FileKey } = data;
      setS3FileKey(s3FileKey)
    }
    if (audioFile) {
      uploadAudio()
    }
  }, [audioFile])

  // pass audio states to parent
  useEffect(() => {
    setAudio({ audioFile, s3FileKey })
  }, [s3FileKey, audioFile])

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      setAudioFile(files[0]);
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