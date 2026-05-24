import {
  useEffect,
  useState
} from 'react'

import {
  FaPaperPlane
} from 'react-icons/fa'

import {
  connectSocket,
  sendMessage
} from '../services/websocketService'

import {
  getMessages
} from '../services/api'

function ChatWindow({

  selectedUser

}) {

  const currentUser =
    localStorage.getItem(
      'userEmail'
    )

  const [message, setMessage] =
    useState('')

  const [messages, setMessages] =
    useState([])

  // LOAD OLD CHATS
  useEffect(() => {

    if (!selectedUser) return

    const fetchMessages =
      async () => {

        try {

          const data =
            await getMessages(

              currentUser,

              selectedUser.email
            )

          const formatted =
            data.map((msg) => ({

              id: msg.id,

              text: msg.content,

              sender: msg.sender,

              receiver: msg.receiver,

              own:
                msg.sender ===
                currentUser,

              time:
                new Date()
                  .toLocaleTimeString()
            }))

          setMessages(formatted)

        } catch (error) {

          console.log(error)
        }
      }

    fetchMessages()

  }, [

    selectedUser,
    currentUser
  ])

  // SOCKET CONNECTION
  useEffect(() => {

    connectSocket((newMessage) => {

      const isCurrentChat =

        (
          newMessage.sender ===
            currentUser

          &&

          newMessage.receiver ===
            selectedUser?.email
        )

        ||

        (
          newMessage.sender ===
            selectedUser?.email

          &&

          newMessage.receiver ===
            currentUser
        )

      if (!isCurrentChat) return

      setMessages((prev) => [

        ...prev,

        {

          id:
            newMessage.id ||

            Date.now(),

          text:
            newMessage.content,

          sender:
            newMessage.sender,

          receiver:
            newMessage.receiver,

          own:
            newMessage.sender ===
            currentUser,

          time:
            new Date()
              .toLocaleTimeString()
        }
      ])
    })

  }, [selectedUser])

  // SEND MESSAGE
  const handleSend = () => {

    if (!message.trim()) return

    const messageData = {

      sender:
        currentUser,

      receiver:
        selectedUser.email,

      content:
        message
    }

    sendMessage(messageData)

    setMessage('')
  }

  // NO USER SELECTED
  if (!selectedUser) {

    return (

      <div className='chat-window'>

        <div className='chat-header'>

          <h2>
            Select User To Chat
          </h2>

        </div>

      </div>
    )
  }

  return (

    <div className='chat-window'>

      {/* HEADER */}

      <div className='chat-header'>

        <h3>
          {
            selectedUser.username
          }
        </h3>

      </div>

      {/* MESSAGES */}

      <div className='messages-container'>

        {

          messages.map((msg) => (

            <div

              key={msg.id}

              className={

                msg.own

                  ? 'my-message'

                  : 'other-message'
              }
            >

              <p>
                {msg.text}
              </p>

            </div>
          ))
        }

      </div>

      {/* INPUT */}

      <div className='message-input'>

        <input

          type='text'

          value={message}

          placeholder='Type message...'

          onChange={(e) =>

            setMessage(
              e.target.value
            )
          }

          onKeyDown={(e) => {

            if (
              e.key === 'Enter'
            ) {

              handleSend()
            }
          }}
        />

        <button
          onClick={handleSend}
        >

          <FaPaperPlane />

        </button>

      </div>

    </div>
  )
}

export default ChatWindow