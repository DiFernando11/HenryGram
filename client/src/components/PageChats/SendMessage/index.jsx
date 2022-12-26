import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import { chatTimeReal, sendMessageBackAction } from "../../../redux/actions";
import styles from "./index.module.css";

// obtener la fecha y la hora

function SendMessage({ scrollLastMessage }) {
  let today = new Date();
  let hourSystem = today.toISOString();
  const [sendMessage, setSendMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { id } = useParams();
  const userInformation = useSelector((state) => state.userInformation);
  const chatTimeRealArray = useSelector((state) => state.chatTimeReal);

  // const
  const myCallback = (code) => {
    const emoji = code.emoji;
    setSendMessage(`${sendMessage} ${emoji}`);
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSendMessage(e.target.value);
    setShowEmoji(false);
    // socket.emit("registrarse", userInformation?._id);
  };

  const handleSentMessage = (e) => {
    e.preventDefault();

    dispatch(
      sendMessageBackAction({
        from: userInformation._id,
        to: id,
        message: sendMessage,
      })
    );
    socket.emit("message", userInformation._id, id, sendMessage, hourSystem);
    const messageInformation = {
      from: userInformation._id,
      to: id,
      message: sendMessage,
      hour: hourSystem,
      fromSelf: true,
    };
    dispatch(chatTimeReal(messageInformation));

    // setMessagesFront([
    //   ...messagesFront,
    //   {
    //     from: userInformation._id,
    //     to: id,
    //     message: sendMessage,
    //     hour: hourSystem,
    //     fromSelf: true,
    //   },
    // ]);
    setSendMessage("");
    scrollLastMessage && setTimeout(() => scrollLastMessage(), 100);
  };
  useEffect(() => {
    const receivedMessage = (sendMessage) => {
      dispatch(chatTimeReal(sendMessage));
      // setMessagesFront([sendMessage, ...messagesFront]);
    };
    socket.on("message", receivedMessage);
    scrollLastMessage && setTimeout(() => scrollLastMessage(), 100);
    return () => {
      socket.off("message", receivedMessage);
    };
  }, [chatTimeRealArray]);
  useEffect(() => {
    setShowEmoji(false);
  }, [id]);

  return (
    <form onSubmit={handleSentMessage}>
      {showEmoji && (
        <div className="absolute bottom-14 bg-black">
          <EmojiPicker onEmojiClick={myCallback} />
        </div>
      )}

      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>

      <div className={`relative ${styles.inputSentMessage}`}>
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <i className="bi bi-emoji-sunglasses text-yellow-300"></i>
        </div>
        <input
          type="search"
          id="search"
          value={sendMessage}
          onChange={handleChange}
          className="block w-full p-3 pl-10 text-sm text-white border rounded-lg  bg-zinc-900 border-amber-200"
          placeholder="Hello..."
          autoComplete="off"
          required
        />

        <i className="bi bi-mic text-yellow-300 absolute right-2.5 bottom-2.5 text-sm px-16 py-1"></i>
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 text-sm px-4 py-1 border-0 "
        >
          <i className="bi bi-send-fill text-yellow-300 "></i>
        </button>
      </div>
    </form>
  );
}

export default SendMessage;
