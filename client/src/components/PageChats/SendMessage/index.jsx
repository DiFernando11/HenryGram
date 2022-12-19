import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageBackAction,
  sendMessagesFrontAction,
} from "../../../redux/actions";
import styles from "./index.module.css";
let today = new Date();
// obtener la fecha y la hora
let hourSystem = today.toISOString();
function SendMessage({ idTo, scrollLastMessage }) {
  const [sendMessage, setSendMessage] = useState("");
  const userInformation = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };

  const handleSentMessage = (e) => {
    e.preventDefault();
    dispatch(
      sendMessageBackAction({
        from: userInformation._id,
        to: idTo,
        message: sendMessage,
      })
    );
    dispatch(
      sendMessagesFrontAction({
        from: userInformation._id,
        to: idTo,
        message: sendMessage,
        hour: hourSystem,
        fromSelf: true,
      })
    );
    setSendMessage("");
    setTimeout(() => scrollLastMessage(), 100);
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
