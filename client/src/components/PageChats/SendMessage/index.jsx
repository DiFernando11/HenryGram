import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessagesAction } from "../../../redux/actions";
import styles from "./index.module.css";
const userInfo = {
  id: 2,
  name: "Diego Apolo",
  messageid: 10,
  image:
    "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s32-c-mo",
};

function SendMessage() {
  const [sendMessage, setSendMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };
  const handleSentMessage = (e) => {
    e.preventDefault();
    dispatch(
      sendMessagesAction({
        ...userInfo,
        message: sendMessage,
      })
    );
    setSendMessage("");
  };

  return (
    <form onSubmit={handleSentMessage}>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>

      <div className={`relative ${styles.inputSentMessage}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
