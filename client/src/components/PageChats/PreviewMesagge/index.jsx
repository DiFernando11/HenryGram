import React, { useEffect, useState } from "react";
import SearchBar from "../../SearchBar";
import CardPreviewMessage from "../CardPreviewMessage";
import logoMatch from "../../../assets/coheteHenry.png";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import {
  getChatsBackAction,
  getChatsGroupAction,
  searchChatsAction,
} from "../../../redux/actions";
import SkeletonUser from "../../Skeletons/skeletonUser";

function PreviewMesagge({ title }) {
  // const [isChat, setIsChat] = useState(true);
  const { pathname } = useLocation();
  const { id } = useParams();
  const { state } = useLocation();
  const [isChat, setIsChat] = useState(
    state?.isMatch ? false : pathname !== `/message/chat/group/${id}`
  );

  const [loading, setLoading] = useState(true);
  const chatPrevent = useSelector((state) => state.chatPrevent);
  const messages = useSelector((state) => state.chatUsers);

  const userInformation = useSelector((state) => state.userInformation);
  const dispatch = useDispatch();
  const handleSwitchChats = (boolean) => {
    if (isChat) {
      (async () => {
        dispatch(getChatsGroupAction(userInformation._id));
        setLoading(false);
      })();
    } else if (!isChat) {
      (async () => {
        dispatch(getChatsBackAction(userInformation._id));
        setLoading(false);
      })();
    }
    dispatch(getChatsGroupAction("clear"));
    setIsChat(boolean);
  };

  useEffect(() => {
    if (userInformation) {
      if (!isChat) {
        (async () => {
          dispatch(getChatsGroupAction(userInformation?._id));
          // setLoading(false);
        })();
      } else {
        (async () => {
          dispatch(getChatsBackAction(userInformation?._id));
          // setLoading(false);
        })();
      }
    }
  }, [userInformation]);
  useEffect(() => {
    dispatch(getChatsGroupAction("clear"));
  }, [isChat]);

  return (
    <section className={`${styles.container_preview_message} sm:mb-2 sm:ml-2`}>
      <SearchBar handleChangeSearch={searchChatsAction} />
      <div
        className="flex rounded-md shadow-sm items-center justify-center my-5"
        role="group"
      >
        <Link to={"/message"} className="flex">
          <button
            onClick={() => handleSwitchChats(true)}
            type="button"
            className={`inline-flex items-center gap-3 py-2 px-4 ${
              (!messages || !messages || !userInformation) &&
              "pointer-events-none cursor-not-allowed text-white"
            }  ${
              isChat
                ? "text-black bg-yellow text-base font-semibold"
                : "text-base font-semibold text-white bg-black"
            } transition-all ease-in duration:100 rounded-l-lg border border-white dark:border-white`}
          >
            <i className="bi bi-chat-right-text-fill"></i>
            <span className=" sm:block md:hidden lg:block ">Chats</span>
          </button>

          <button
            onClick={() => handleSwitchChats(false)}
            type="button"
            className={`inline-flex items-center gap-3 py-2 px-4  ${
              !messages && "pointer-events-none cursor-not-allowed text-white"
            } ${
              !isChat
                ? "text-black bg-yellow text-base font-semibold "
                : "text-base font-semibold text-white bg-black"
            } transition-all ease-in duration:100 rounded-r-lg border border-white dark:border-white`}
          >
            <img src={logoMatch} className={"w-6 h-6 "} />
            <span className=" sm:block md:hidden lg:block ">Match</span>
          </button>
        </Link>
      </div>
      <span className={styles.textMessagePreview}>{title}</span>
      <div
        className={`${styles.containerAllMessage} h-[calc(100vh-16rem)] sm:h-[calc(100vh-12rem)] overflow-y-scroll `}
      >
        {chatPrevent?.length && isChat
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
          : messages
              ?.map((message, index) => (
                <CardPreviewMessage
                  key={index}
                  image={
                    message?.gr?.avatar ||
                    "https://res.cloudinary.com/dgmv4orvc/image/upload/v1671629546/Images/g8ivckqtlen69rgcyzop.png"
                  }
                  message={message?.ch?.content}
                  id={message?.gr?._id}
                  time={message?.ch?.createdAt}
                  name={message?.ch?.firstName}
                  title={`${
                    message?.gr?.title ? message?.gr?.title : `Grupo ${index}`
                  } `}
                  creator={message?.gr?.creator}
                  pendings={message?.gr?.pendings}
                  sender={message?.ch?.userId}
                />
              ))
              .reverse()}
        {!messages &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((value) => <SkeletonUser key={value} />)}
        {!messages?.length && !chatPrevent.length && (
          <div className=" flex  gap-2 text-white border p-4 uppercase text-[10px] border-zinc-700">
            Still not connecting with your friends
            <i className="bi bi-people text-sm"></i>
          </div>
        )}
      </div>
    </section>
  );
}

export default PreviewMesagge;
