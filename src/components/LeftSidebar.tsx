import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
// import { useRouter } from 'next/router'

export default function LeftSidebar({ transcripts }) {
  console.log('transcripts',transcripts)
  //* controls which projects are shown on homepage -- solo projects or shared projects
  const [activeTab, setActiveTab] = useState(null)
  // const router = useRouter();

  async function getTranscript(id) {
    console.log('getTranscript')
    const response = await fetch(`/api/get_transcripts/${id}`)
    const data = await response.json()
    console.log(data)

    //todo - pass transcript back up to parent 
  }

  return (
    <SidebarWrapper id='leftsidebar'>
      <div id='top'>
        <Title>View Transcripts</Title>
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

const SidebarWrapper = styled.section`
  // background-color: ${props => props.theme.color1};
  border-right: #292928 1px solid;
  padding-right: 35px;
`;
const Title = styled.h1`
  font-size: 25px;
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

// const Tab = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 5px;
//   border-top-left-radius: 50px;
//   border-bottom-left-radius: 50px;
//   border-top-right-radius: 50px;
//   border-bottom-right-radius: 50px;
//   border: solid whitesmoke;
//   height: 40px;
//   width: 130px;
//   font-size: 10pt;
//   background-color: ${props => props.selected ? 'whitesmoke' : 'black'};
//   color: ${props => props.selected ? 'black' : 'whitesmoke'};
// `;