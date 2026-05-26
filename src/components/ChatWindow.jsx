import {
  useEffect,
  useState
} from 'react'

import {
  FaPaperPlane
} from 'react-icons/fa'

import {
  connectSocket,
  sendMessage,
  disconnectSocket
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

  // LOAD OLD MESSAGES
  useEffect(() => {

    if (!selectedUser) return

    fetchMessages()

  }, [selectedUser])

  const fetchMessages =
    async () => {

      try {

        const data =
          await getMessages(

            currentUser,
            selectedUser.email
          )

        const formatted = data.map(
          (msg) => ({

            id: msg.id,

            text: msg.content,

            sender: msg.sender,

            own:
              msg.sender ===
              currentUser,

            time:
              msg.timestamp
                ? new Date(
                    msg.timestamp
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : ''
          })
        )

        // SORT BY TIME
        formatted.sort(
          (a, b) =>
            new Date(a.time) -
            new Date(b.time)
        )

        setMessages(formatted)

      } catch (error) {

        console.log(error)
      }
    }

  // SOCKET CONNECTION
  useEffect(() => {

    if (!selectedUser) return

    connectSocket((newMessage) => {

      const isCurrentChat =

        (
          newMessage.sender ===
            currentUser
          &&
          newMessage.receiver ===
            selectedUser.email
        )

        ||

        (
          newMessage.sender ===
            selectedUser.email
          &&
          newMessage.receiver ===
            currentUser
        )

      if (isCurrentChat) {

        setMessages((prev) => [

          ...prev,

          {

            id:
              Date.now(),

            text:
              newMessage.content,

            sender:
              newMessage.sender,

            own:
              newMessage.sender ===
              currentUser,

            time:
              new Date()
                .toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
          }
        ])
      }
    })

    return () => {

      disconnectSocket()
    }

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

  if (!selectedUser) {

    return (

      <div className='chat-window'>

        <h2>
          Select User To Chat
        </h2>

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
            alt='user'

            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%'
            }}
          />

          <div>

            <h3>
              {selectedUser.username}
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

      {/* CHAT */}

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

          placeholder='Type a message...'

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