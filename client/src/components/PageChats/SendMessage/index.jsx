import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const URL = import.meta.env.VITE_URL_RAILWAY
const socket = io(`${URL || "http://localhost:3000"}`);
import { chatTimeReal } from "../../../redux/actions";
import styles from "./index.module.css";
import { uploadImage } from "../../helpers/uploadImage";
import { Spinner } from "flowbite-react";

// obtener la fecha y la hora

function SendMessage({ scrollLastMessage, messageSend }) {
  let today = new Date();
  let hourSystem = today.toISOString();
  const [sendMessage, setSendMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [sendImages, setSendImage] = useState([]);
  const [loadingMessageImage, setLoadingMessageImage] = useState(false);
  const { id } = useParams();
  const userInformation = useSelector((state) => state.userInformation);
  const chatTimeRealArray = useSelector((state) => state.chatTimeReal);

  const handleSaveSendImage = async (e) => {
    await uploadImage(e, setLoadingMessageImage, null, null, setSendImage);
  };

  const handleDeleteImageSend = (indexImage) => {
    const imageSend = sendImages.filter((image, index) => index !== indexImage);
    setSendImage(imageSend);
  };

  const myCallback = (code) => {
    const emoji = code.emoji;
    setSendMessage(`${sendMessage} ${emoji}`);
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSendMessage(e.target.value);
    setShowEmoji(false);
  };

  const handleSentMessage = (e) => {
    e.preventDefault();
    dispatch(messageSend(userInformation?._id, id, sendMessage, sendImages));
    socket.emit("message", userInformation?._id, id, sendMessage, hourSystem);
    const messageInformation = {
      from: userInformation._id,
      to: id,
      message: sendMessage,
      image: sendImages,
      hour: hourSystem,
      fromSelf: true,
    };
    dispatch(chatTimeReal(messageInformation));
    setSendMessage("");
    scrollLastMessage && setTimeout(() => scrollLastMessage(), 100);
    setSendImage([]);
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

  useEffect(() => {
    setShowEmoji(false);
    setSendImage([]);
  }, [id]);

  return (
    <form onSubmit={handleSentMessage} className="relative">
      <div className="absolute w-full -top-20  flex justify-center gap-3">
        {sendImages.length
          ? sendImages.map((url, index) => (
              <div
                key={index}
                className="relative  border pt-6 p-2 cursor-pointer bg-[#a39e9e5a] modal-container"
              >
                <img className="w-12 h-12" src={url} alt={"image send"} />
                <i
                  className="bi bi-x text-white absolute top-0 right-0"
                  onClick={() => handleDeleteImageSend(index)}
                ></i>
              </div>
            ))
          : null}
        {loadingMessageImage && (
          <div className="relative flex justify-center items-center  border pt-6 p-5 cursor-pointer bg-[#a39e9e5a]">
            <Spinner />
          </div>
        )}
      </div>

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
          <i className="bi bi-emoji-sunglasses text-yellow"></i>
        </div>
        <input
          type="search"
          id="search"
          value={sendMessage}
          onChange={handleChange}
          className="block w-full p-3 pl-10 text-sm text-white border rounded-lg  bg-zinc-900 border-amber-200"
          placeholder="Hello..."
          autoComplete="off"
        />

        <label htmlFor="file-input">
          <i
            className={`bi bi-images text-yellow absolute right-6 bottom-2.5 text-sm px-16 py-1 ${
              (sendImages.length > 3 || loadingMessageImage) &&
              "cursor-not-allowed pointer-events-none text-neutral-400"
            }  `}
          ></i>
        </label>
        <input
          id="file-input"
          name="foto"
          type="file"
          onChange={handleSaveSendImage}
          className="hidden"
        />

        <button
          type="submit"
          className={`absolute right-2.5 bottom-2.5 text-sm px-4 py-1 border-0 ${
            !sendImages.length &&
            !sendMessage &&
            "cursor-not-allowed pointer-events-none"
          }   `}
        >
          <i
            className={`bi bi-send-fill text-yellow ${
              !sendImages.length &&
              !sendMessage &&
              "cursor-not-allowed pointer-events-none text-neutral-400"
            } `}
          ></i>
        </button>
      </div>
    </form>
  );
}

export default SendMessage;
