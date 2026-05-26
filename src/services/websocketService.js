import SockJS from 'sockjs-client'

import { Client }
from '@stomp/stompjs'

let stompClient = null

export const connectSocket = (
  onMessageReceived
) => {

  // GET LOGGED IN USER
  const currentUser =
    localStorage.getItem(
      'userEmail'
    )

  const socket =
    new SockJS(
      `http://localhost:8080/ws?email=${currentUser}`
    )

  stompClient =
    new Client({

      webSocketFactory:
        () => socket,

      reconnectDelay: 5000,

      debug: () => {},

      onConnect: () => {

        console.log(
          'Socket Connected'
        )

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
      }
    })

  stompClient.activate()
}

export const sendMessage = (
  message
) => {

  if (
    stompClient &&
    stompClient.connected
  ) {

    stompClient.publish({

      destination:
        '/app/sendMessage',

      body:
        JSON.stringify(message)
    })
  }
}

export const disconnectSocket = () => {

  if (stompClient) {

    stompClient.deactivate()

    stompClient = null
  }
}