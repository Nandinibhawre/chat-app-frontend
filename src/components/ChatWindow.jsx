import axios from "axios";
import { useEffect, useState } from "react";

import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa";

import EmojiPicker from "emoji-picker-react";

import {
  connectSocket,
  sendMessage,
  disconnectSocket,
  sendTypingStatus,
} from "../services/websocketService";

import { getMessages, getUserStatus } from "../services/api";

function ChatWindow({ selectedUser }) {
  const currentUser = localStorage.getItem("userEmail");
  const [isTyping, setIsTyping] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // LOAD OLD MESSAGES
  useEffect(() => {
    if (!selectedUser) return;

    fetchMessages();
  }, [selectedUser]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://chat-app-backend-production-54a2.up.railway.app/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const fileUrl = response.data;

      const messageData = {
        sender: currentUser,

        receiver: selectedUser.email,

        content: "",

        fileUrl: fileUrl,

        fileType: file.type,
      };

      sendMessage(messageData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMessages = async () => {
    try {
      const data = await getMessages(currentUser, selectedUser.email);

      const formatted = data.map((msg) => ({
        id: msg.id,

        text: msg.content,

        fileUrl: msg.fileUrl,

        fileType: msg.fileType,

        sender: msg.sender,

        own: msg.sender === currentUser,

        time: msg.timestamp
          ? new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      }));

      setMessages(formatted);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {

  if (!selectedUser) return;

  const fetchStatus = async () => {

    try {

      const data =
        await getUserStatus(
          selectedUser.email
        );

      setUserStatus(data);

    } catch (err) {

      console.log(err);

    }

  };

  fetchStatus();

 
}, [selectedUser?.email]);

  // SOCKET CONNECTION
  useEffect(() => {
    if (!selectedUser) return;
    connectSocket(
      (newMessage) => {
        const isCurrentChat =
          (newMessage.sender === currentUser &&
            newMessage.receiver === selectedUser.email) ||
          (newMessage.sender === selectedUser.email &&
            newMessage.receiver === currentUser);
        if (newMessage.receiver === currentUser) {
          sendSeenStatus({
            messageId: newMessage.id,

            sender: newMessage.sender,

            receiver: currentUser,
          });
        }
        if (isCurrentChat) {
          setMessages((prev) => {
            const exists = prev.some((msg) => msg.id === newMessage.id);

            if (exists) {
              return prev;
            }

            return [
              ...prev,

              {
                id: newMessage.id,

                text: newMessage.content,

                fileUrl: newMessage.fileUrl,

                fileType: newMessage.fileType,

                sender: newMessage.sender,

                own: newMessage.sender === currentUser,

                status: newMessage.status,

                time: new Date(newMessage.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                }),
              },
            ];
          });
        }
      },

      (typingData) => {
        if (typingData.sender === selectedUser.email) {
          setIsTyping(typingData.typing);
        }
      },

      (seenMessage) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === seenMessage.id
              ? {
                  ...msg,

                  status: "SEEN",
                }
              : msg,
          ),
        );
      },
    );

    return () => {
      disconnectSocket();
    };
  }, [selectedUser]);

  // SEND MESSAGE
  const handleSend = () => {
    if (!message.trim()) return;

    const messageData = {
      sender: currentUser,

      receiver: selectedUser.email,

      content: message,
    };

    sendMessage(messageData);

    setMessage("");

    setShowEmojiPicker(false);
  };

  // ADD EMOJI
  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  // NO USER SELECTED
  if (!selectedUser) {
    return (
      <div className="chat-window">
        <div className="chat-header">
          <h2>Select User To Chat</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* HEADER */}

      <div className="chat-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="https://i.pravatar.cc/50"
            alt=""
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
            }}
          />

          <div>
            <h3>{selectedUser.username}</h3>

            {isTyping ? (
              <span
                style={{
                  color: "#25D366",
                }}
              >
                typing...
              </span>
            ) : userStatus?.online ? (
              <span
                style={{
                  color: "green",
                }}
              >
                Online
              </span>
            ) : (
              <span
                style={{
                  color: "gray",
                }}
              >
                Last seen{" "}
                {userStatus?.lastSeen
                  ? new Date(userStatus.lastSeen).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })
                  : "recently"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MESSAGES */}

      <div className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.own ? "my-message" : "other-message"}
          >
            {msg.fileUrl ? (
              msg.fileType?.startsWith("image") ? (
                <img
                  src={msg.fileUrl}
                  alt=""
                  style={{
                    maxWidth: "250px",
                    borderRadius: "10px",
                    marginBottom: "5px",
                  }}
                />
              ) : (
                <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                  📎 Open File
                </a>
              )
            ) : (
              <p>{msg.text}</p>
            )}

            <span>
              <span>
                {msg.time}

                {msg.own &&
                  (msg.status === "SENT" ? (
                    <span
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      ✓
                    </span>
                  ) : msg.status === "DELIVERED" ? (
                    <span
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      ✓✓
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#4FC3F7",
                        marginLeft: "5px",
                      }}
                    >
                      ✓✓
                    </span>
                  ))}
              </span>

              {msg.own &&
                (msg.status === "SENT"
                  ? " ✓"
                  : msg.status === "DELIVERED"
                    ? " ✓✓"
                    : " ✓✓")}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT */}

      <div className="message-input">
        {/* EMOJI */}

        <div
          style={{
            position: "relative",
          }}
        >
          <FaSmile
            className="emoji-icon"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />

          {showEmojiPicker && (
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                padding: "10px",
                left: "0",
                zIndex: 1000,
              }}
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {/* INPUT */}
        <label
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: "#666",
          }}
        >
          <FaPaperclip />

          <input type="file" hidden onChange={handleFileUpload} />
        </label>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);

            sendTypingStatus({
              sender: currentUser,

              receiver: selectedUser.email,

              typing: true,
            });

            clearTimeout(window.typingTimeout);

            window.typingTimeout = setTimeout(() => {
              sendTypingStatus({
                sender: currentUser,

                receiver: selectedUser.email,

                typing: false,
              });
            }, 1000);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        {/* SEND */}

        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
