import { useState } from "react";

function MessageInput() {

  const [text, setText] =
        useState("");

  const handleSend = () => {

    console.log(text);

    setText("");
  };

  return (

    <div className="message-input">
<input
  type="file"
  onChange={handleFileUpload}
/>
      <input
        value={text}

        onChange={(e) =>
          setText(e.target.value)
        }

        placeholder="Type message..."
      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>
  );
}

export default MessageInput;