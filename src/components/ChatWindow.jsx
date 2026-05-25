import {
  useEffect,
  useState,
  useRef
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

  const socketConnected =
    useRef(false)

  // LOAD OLD CHATS
  useEffect(() => {

    if (!selectedUser) return

    const loadMessages =
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

              text:
                msg.content,

              sender:
                msg.sender,

              own:
                msg.sender ===
                currentUser,

              time:
                msg.timestamp
                  ? new Date(
                      msg.timestamp
                    ).toLocaleTimeString()
                  : ''
            }))

          setMessages(
            formatted
          )

        } catch (error) {

          console.log(error)
        }
      }

    loadMessages()

  }, [selectedUser])

  // SOCKET
  useEffect(() => {

    if (
      socketConnected.current
    ) return

    socketConnected.current =
      true

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

      if (!isCurrentChat)
        return

      setMessages((prev) => {

        const alreadyExists =
          prev.some(

            (msg) =>

              msg.id ===
              newMessage.id
          )

        if (alreadyExists)
          return prev

        return [

          ...prev,

          {

            id:
              newMessage.id,

            text:
              newMessage.content,

            sender:
              newMessage.sender,

            own:
              newMessage.sender ===
              currentUser,

            time:
              new Date()
                .toLocaleTimeString()
          }
        ]
      })
    })

  }, [])

  // SEND
  const handleSend = () => {

    if (
      !message.trim()
    ) return

    const messageData = {

      sender:
        currentUser,

      receiver:
        selectedUser.email,

      content:
        message
    }

    sendMessage(messageData)

    // SHOW IMMEDIATELY
    setMessages((prev) => [

      ...prev,

      {

        id:
          Date.now(),

        text:
          message,

        sender:
          currentUser,

        own: true,

        time:
          new Date()
            .toLocaleTimeString()
      }
    ])

    setMessage('')
  }

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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >

          <img
            src='https://i.pravatar.cc/50'
            alt=''

            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%'
            }}
          />

          <div>

            <h3>
              {
                selectedUser.username
              }
            </h3>

            <span
              style={{
                color: 'green'
              }}
            >
              Online
            </span>

          </div>

        </div>

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

              <p>{msg.text}</p>

              <span>
                {msg.time}
              </span>

            </div>
          ))
        }

      </div>

      {/* INPUT */}

      <div className='message-input'>

        <input

          type='text'

          placeholder='Type message...'

          value={message}

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