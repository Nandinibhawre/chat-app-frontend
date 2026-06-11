// import SockJS from 'sockjs-client'

// import { Client }
// from '@stomp/stompjs'
// let stompClient = null
// export const connectSocket = (
//   onMessageReceived,
//   onTypingReceived
// ) => {

//   const currentUser =
//     localStorage.getItem(
//       'userEmail'
//     )

//   const socket =
//     new SockJS(
//       `https://chat-app-backend-production-54a2.up.railway.app/ws?email=${currentUser}`
//     )

//   stompClient =
//     new Client({

//       webSocketFactory:
//         () => socket,

//       reconnectDelay: 5000,

//       debug: () => {},

//       onConnect: () => {

//         console.log(
//           'Socket Connected'
//         )

//         // MESSAGE SUBSCRIPTION
//         stompClient.subscribe(

//           '/user/queue/messages',

//           (message) => {

//             const receivedMessage =
//               JSON.parse(
//                 message.body
//               )

//             onMessageReceived(
//               receivedMessage
//             )
//           }
//         )

//         // TYPING SUBSCRIPTION
//         stompClient.subscribe(

//           '/user/queue/typing',

//           (message) => {

//             const typingData =
//               JSON.parse(
//                 message.body
//               )

//             if (
//               onTypingReceived
//             ) {

//               onTypingReceived(
//                 typingData
//               )
//             }
//           }
//         )
//       }
//     })

//   stompClient.activate()
// }
// export const sendMessage = (
//   message
// ) => {

//   if (
//     stompClient &&
//     stompClient.connected
//   ) {

//     stompClient.publish({

//       destination:
//         '/app/sendMessage',

//       body:
//         JSON.stringify(message)
//     })
//   }
// }

// export const disconnectSocket = () => {

//   if (stompClient) {

//     stompClient.deactivate()

//     stompClient = null
//   }
// }
// export const sendTypingStatus =
//   (typingData) => {

//     if (
//       stompClient &&
//       stompClient.connected
//     ) {

//       stompClient.publish({

//         destination:
//           '/app/typing',

//         body:
//           JSON.stringify(
//             typingData
//           )
//       })
//     }
//   }
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

let stompClient = null

export const connectSocket = (
  onMessageReceived,
  onTypingReceived
) => {

  const currentUser =
    localStorage.getItem(
      'userEmail'
    )

  const socket =
    new SockJS(
      `https://chat-app-backend-production-54a2.up.railway.app/ws?email=${currentUser}`
    )

  stompClient =
    new Client({

      webSocketFactory:
        () => socket,

      reconnectDelay: 0,
  connectHeaders: {

    userEmail:
      currentUser
  },
      debug: () => {},

      onConnect: () => {

        console.log(
          'Socket Connected'
        )

        // MESSAGE SUBSCRIPTION
        stompClient.subscribe(

          '/user/queue/messages',

          (message) => {

            const receivedMessage =
              JSON.parse(
                message.body
              )

            onMessageReceived(
              receivedMessage
            )
          }
        )

        // TYPING SUBSCRIPTION
        stompClient.subscribe(

          '/user/queue/typing',

          (message) => {

            const typingData =
              JSON.parse(
                message.body
              )

            if (
              onTypingReceived
            ) {

              onTypingReceived(
                typingData
              )
            }
          }
        )
      }
    })

  stompClient.activate()
}
// export const getUserStatus =
//   async (email) => {

//     const response =
//       await api.get(
//         `/api/status/${email}`
//       )

//     return response.data
//   }
  
export const sendMessage =
  (message) => {

    if (
      stompClient &&
      stompClient.connected
    ) {

      stompClient.publish({

        destination:
          '/app/sendMessage',

        body:
          JSON.stringify(
            message
          )
      })
    }
  }
export const getUserStatus =
async (email) => {

    const response =
    await axios.get(

      `https://chat-app-backend-production-54a2.up.railway.app/api/status/${email}`
    );

    return response.data;
}
export const sendTypingStatus =
  (typingData) => {

    if (
      stompClient &&
      stompClient.connected
    ) {

      stompClient.publish({

        destination:
          '/app/typing',

        body:
          JSON.stringify(
            typingData
          )
      })
    }
  }

export const disconnectSocket =
  () => {

    if (stompClient) {

      stompClient.deactivate()

      stompClient = null
    }
  }