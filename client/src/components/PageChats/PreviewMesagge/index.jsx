import React, { useEffect, useState } from "react";
import SearchBar from "../../SearchBar";
import CardPreviewMessage from "../CardPreviewMessage";
import logoMatch from "../../../assets/coheteHenry.png";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUltimateMessageTimeRealAction,
  getChatsBackAction,
  getChatsGroupAction,
  messagesIsChat,
  searchChatsAction,
} from "../../../redux/actions";
import SkeletonUser from "../../Skeletons/skeletonUser";

function PreviewMesagge({ title }) {
  // const [isChat, setIsChat] = useState(true);
  const isChat = useSelector((state) => state.isChat);
  const chatPrevent = useSelector((state) => state.chatPrevent);
  const messages = useSelector((state) => state.chatUsers);
  const userInformation = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const handleSwitchChats = () => {
    dispatch(messagesIsChat());
  };

  useEffect(() => {
    if (userInformation) {
      if (!isChat) {
        dispatch(getChatsGroupAction(userInformation._id));
      } else {
        dispatch(getChatsBackAction(userInformation._id));
        console.log("entre");
      }
      dispatch(getChatsGroupAction("clear"));
    }
  }, [isChat, userInformation]);
  // useEffect(() => {
  //   if (messages.length) {
  //     dispatch(changeUltimateMessageTimeRealAction());
  //   }
  // }, [chatTimeRealUser]);
  return (
    <section className={`${styles.container_preview_message} sm:mb-2 sm:ml-2`}>
      <SearchBar handleChangeSearch={searchChatsAction} />
      <div
        className="flex rounded-md shadow-sm items-center justify-center my-5"
        role="group"
      >
        <button
          onClick={handleSwitchChats}
          type="button"
          className={`inline-flex items-center gap-3 py-2 px-4 ${
            !messages.length &&
            "pointer-events-none cursor-not-allowed text-white"
          }  ${
            isChat
              ? "text-black bg-amber-300 text-base font-semibold"
              : "text-sm font-medium text-white bg-gray-900"
          }   rounded-l-lg border border-gray-900   dark:border-white`}
        >
          <i className="bi bi-chat-right-text-fill"></i>
          Chats
        </button>

        <button
          onClick={handleSwitchChats}
          type="button"
          className={`inline-flex items-center gap-3 py-2 px-4  ${
            !messages.length &&
            "pointer-events-none cursor-not-allowed text-white"
          } ${
            !isChat
              ? "text-black bg-amber-300 text-base font-semibold"
              : "text-sm font-medium text-white bg-gray-900"
          } rounded-r-md border border-gray-900 dark:border-white`}
        >
          <img src={logoMatch} className={"w-6 h-6"} />
          Match
        </button>
      </div>
      <span className={styles.textMessagePreview}>{title}</span>
      <div
        className={`${styles.containerAllMessage} h-[calc(100vh-16rem)] sm:h-[calc(100vh-12rem)] overflow-y-scroll `}
      >
        {chatPrevent?.length
          ? chatPrevent
              ?.map((message, index) => (
                <CardPreviewMessage
                  key={index}
                  image={message.avatar}
                  id={message._id}
                  lastName={message.lastName}
                  name={message.firstName}
                />
              ))
              .reverse()
          : null}
        {isChat
          ? messages
              ?.map((message, index) => (
                <CardPreviewMessage
                  key={index}
                  image={message?.usr?.avatar}
                  message={message?.msg?.message.text}
                  id={message?.usr?._id}
                  time={message?.msg?.createdAt}
                  lastName={message?.usr?.lastName}
                  name={message?.usr?.firstName}
                  sender={message?.msg?.sender}
                />
              ))
              .reverse()
          : messages?.map((message, index) => (
              <CardPreviewMessage
                key={index}
                image={message?.ch?.avatar}
                message={message?.ch?.content}
                id={message?.ch?.userId}
                time={message?.ch?.createdAt}
                name={message?.ch?.firstName}
                title={`Grupo ${index}`}
                sender={message?.ch?.userId}
              />
            ))}
        {!messages.length &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((value) => <SkeletonUser key={value} />)}
      </div>
    </section>
  );
}

export default PreviewMesagge;
