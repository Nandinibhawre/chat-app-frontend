import SockJS from 'sockjs-client'

import { Client }
from '@stomp/stompjs'

let stompClient = null

export const connectSocket = (
  onMessageReceived
) => {

  if (
    stompClient &&
    stompClient.connected
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

      onConnect: () => {

        console.log(
          'Socket Connected'
        )

        stompClient.subscribe(

          '/user/queue/messages',

          (message) => {

            const data =
              JSON.parse(
                message.body
              )

            onMessageReceived(
              data
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