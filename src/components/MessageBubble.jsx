function MessageBubble({

  own,
  text,
  time,
  sender

}) {

  return (

    <div
      className={`message-wrapper ${
        own
          ? 'my-message-wrapper'
          : 'other-message-wrapper'
      }`}
    >

      <div
        className={`message-bubble ${
          own
            ? 'my-message'
            : 'other-message'
        }`}
      >

        {
          !own && (

            <p className='sender-name'>
              {sender}
            </p>
          )
        }

        <p>{text}</p>

        <span>{time}</span>

      </div>

    </div>
  )
}

export default MessageBubble