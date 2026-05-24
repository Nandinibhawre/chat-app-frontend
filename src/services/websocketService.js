import SockJS from 'sockjs-client'

import { Client }
from '@stomp/stompjs'

let stompClient = null

let isConnected = false

export const connectSocket = (
  onMessageReceived
) => {

  // PREVENT MULTIPLE CONNECTIONS
  if (
    stompClient &&
    isConnected
  ) {
    return
  }

  const socket =
    new SockJS(
      'http://localhost:8080/ws'
    )

  stompClient =
    new Client({

      webSocketFactory:
        () => socket,

      reconnectDelay: 5000,

      debug: () => {},

      onConnect: () => {

        isConnected = true

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
      },

      onDisconnect: () => {

        isConnected = false
      },

      onStompError: () => {

        isConnected = false

        console.log(
          'Socket Error'
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
    isConnected
  ) {

    stompClient.publish({

      destination:
        '/app/sendMessage',

      body:
        JSON.stringify(message)
    })
  }
}