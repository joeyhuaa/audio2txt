'use client'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
// import { useRouter } from 'next/router'

interface LeftSidebarProps {
  transcripts: any[];
  setCurrTranscript: () => void;
}

const LeftSidebar = React.FC<LeftSidebarProps> = ({ transcripts, setCurrTranscript }) => {
  console.log('transcripts',transcripts)
  //* controls which projects are shown on homepage -- solo projects or shared projects
  const [activeTab, setActiveTab] = useState(null)
  // const router = useRouter();

  async function getTranscript(id: string) {
    const response = await fetch(`/api/get_transcripts/${id}`)
    const data = await response.json()

    //pass transcript back up to parent 
    setCurrTranscript(data)
  }

  return (
    <SidebarWrapper id='leftsidebar'>
      <div id='top'>
        <Title>Your Transcripts ({transcripts.length})</Title>
      </div>

      <List>
        {transcripts.map((transcript: object) => {
          return (
            <ListItem key={transcript.id} onClick={() => getTranscript(transcript.id)}>
              {transcript.id}
            </ListItem>
          )
        })}
      </List>

      {/* <button
        onClick={createProject}
        id='new-project-btn'
        className='oval-btn submit-btn grow'
      >New Project</button> */}
    </SidebarWrapper>
  )
}

export default LeftSidebar

const SidebarWrapper = styled.section`
  border-right: #292928 1px solid;
  padding-right: 35px;
  overflow: auto;
  height: 80%;
`;
const Title = styled.h1`
  // font-size: 25px;
  text-shadow: 0px 0px 3px whitesmoke;
  margin-bottom: 25px;
`;
const List = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
`
const ListItem = styled.span`
  cursor: pointer;
  padding-bottom: 10px;
  padding-top: 10px;
`