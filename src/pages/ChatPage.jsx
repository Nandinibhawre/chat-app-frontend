import { useState }
from 'react'

import Navbar
from '../components/Navbar'

import ChatSidebar
from '../components/ChatSidebar'

import ChatWindow
from '../components/ChatWindow'

function ChatPage() {

  const [selectedUser,
         setSelectedUser] =
         useState(null)

  return (

    <div className='chat-page'>
{/* 
      <Navbar /> */}

      <div className='chat-container'>

        <ChatSidebar

          selectedUser={
            selectedUser
          }

          setSelectedUser={
            setSelectedUser
          }
        />

        <ChatWindow

          selectedUser={
            selectedUser
          }
        />

      </div>

    </div>
  )
}

export default ChatPage