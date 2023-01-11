import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_URL_RAILWAY;
import {
  chatTimeReal,
  getMessageByUserBackAction,
  sendMessageBackAction,
} from "../../../redux/actions";
import Loader from "../../Loader";
import SkeletonUser from "../../Skeletons/skeletonUser";
import CardMessage from "../CardMessage";
import SendMessage from "../SendMessage";
import styles from "./index.module.css";

function Messages() {
  const [page, setPage] = useState(1);
  const [loadingOldMessage, setLoadingOldMessage] = useState(false);
  const [loadginSkeletonMessages, setLoadginSkeletonMessages] = useState(true);
  const [isMoreMessages, setIsMoreMessages] = useState(true);
  const [oldMessage, setOldMessage] = useState({
    informationUserTo: {},
    projectedMessages: [],
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const chatByUser = useSelector((state) => state.chatByUser);
  const chatUsers = useSelector((state) => state.chatUsers);
  const chatPrevent = useSelector((state) => state.chatPrevent);
  const userInformation = useSelector((state) => state.userInformation);
  const chatTimeRealUser = useSelector((state) => state.chatTimeReal);
  if (chatUsers?.length) {
    const chatUsersID = chatUsers.map((user) => user?.usr?._id).includes(id);
    const chatUsersPreventID = chatPrevent.map((user) => user._id).includes(id);
    if (!chatUsersID && !chatUsersPreventID)
      return <Navigate to={"/message"} />;
  }

  function scrollLastMessage() {
    var objDiv = document.getElementById("divu");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  useEffect(() => {
    dispatch(
      getMessageByUserBackAction({
        from: userInformation?._id,
        to: id,
        limit: 1,
      })
    );
  }, [id, chatUsers]);

  useEffect(() => {
    try {
      if (page > 1 && isMoreMessages) {
        axios
          .post(`${URL || "http://localhost:3000"}/api/messages/all`, {
            from: userInformation._id,
            to: id,
            limit: page,
          })
          .then((response) => {
            if (!response.data.projectedMessages.length) {
              setIsMoreMessages(false);
            } else {
              setOldMessage({
                informationUserTo: response.data.informationUserTo,
                projectedMessages: [
                  ...response.data.projectedMessages.reverse(),
                  ...oldMessage.projectedMessages.reverse(),
                ],
              });
              var objDiv = document.getElementById("divu");
              objDiv.scrollTop = 1500;
            }
            setLoadingOldMessage(false);
          });
      }
    } catch (error) {
      console.error("error en la funcion getChatsBackAction");
    }
  }, [page]);

  useEffect(() => {
    if (chatByUser?.projectedMessages && chatUsers?.length) {
      setLoadginSkeletonMessages(false);
      setTimeout(() => scrollLastMessage(), 100);
    }
  }, [chatByUser, chatUsers]);

  useEffect(() => {
    setPage(1);
    setLoadginSkeletonMessages(true);
    return () => {
      dispatch(getMessageByUserBackAction("clear"));
      setLoadginSkeletonMessages(true);
      dispatch(chatTimeReal("clear"));
      setOldMessage({
        informationUserTo: {},
        projectedMessages: [],
      });
      setIsMoreMessages(true);
    };
  }, [id]);

  useEffect(() => {
    document.getElementById("divu").addEventListener("scroll", handleScroll);
    return () => {
      if (document.getElementById("divu")) {
        document
          .getElementById("divu")
          .removeEventListener("scroll", handleScroll);
      }
    };
  }, [id, page, isMoreMessages]);

  const handleScroll = () => {
    const heigthScroll = document.getElementById("divu").scrollHeight;
    const containerHeight = document.getElementById("divu").clientHeight;
    if (isMoreMessages) {
      if (
        document.getElementById("divu").scrollTop === 0 &&
        heigthScroll !== containerHeight
      ) {
        setLoadingOldMessage(true);
        setPage(page + 1);
      }
    }
  };

  return (
    <section className="lg:w-[70%] w-full">
      <div className={styles.header_message}>
        {!chatByUser?.informationUserTo ? (
          <SkeletonUser isMessage={false} />
        ) : (
          <div className={styles.userInformationChat}>
            <img src={chatByUser?.informationUserTo?.avatar} alt="user_chat" />

            <span className="truncate w-4/5">
              {`${chatByUser?.informationUserTo?.firstName} ${chatByUser?.informationUserTo?.lastName} `}
            </span>
          </div>
        )}

        <div className={styles.actionsChat}>
          {/* <AvatarStack avatars={avatars} /> */}
          <i className={`bi bi-camera-video lg:block hidden`}></i>
          <i className="bi bi-telephone lg:block hidden"></i>
          <i className="bi bi-three-dots-vertical lg:block hidden"></i>
        </div>
      </div>
      <div
        id="divu"
        className={`${styles.messagesSent} relative h-[calc(100vh-12rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll`}
      >
        {!chatByUser?.projectedMessages?.length &&
          chatByUser &&
          !chatTimeRealUser?.length && (
            <div className="text-white text-lg uppercase text-center bg-black p-4 rounded m-auto">{`greets ${chatByUser?.informationUserTo?.firstName} ${chatByUser?.informationUserTo?.lastName} 👋`}</div>
          )}

        {loadingOldMessage && <Loader />}
        {!isMoreMessages && (
          <h1 className="text-center text-white bg-black rounded-full uppercase p-2 font-semibold">
            {`You greeted ${chatByUser?.informationUserTo?.firstName} ${chatByUser?.informationUserTo?.lastName} 🤝 `}{" "}
          </h1>
        )}
        {oldMessage.projectedMessages.length
          ? oldMessage.projectedMessages.map((message, index) => (
              <CardMessage
                key={index}
                message={message.message}
                image={chatByUser?.informationUserTo?.avatar}
                name={chatByUser?.informationUserTo?.firstName}
                lastName={chatByUser?.informationUserTo?.lastName}
                time={message.hour}
                fromSelf={message.fromSelf}
                from={message.from}
                to={message.to}
                messageImage={message.image}
              />
              // <div>hOKLA</div>
            ))
          : null}
        {chatByUser?.projectedMessages?.length
          ? chatByUser?.projectedMessages
              ?.map((message, index) => (
                <CardMessage
                  key={index}
                  message={message.message}
                  image={chatByUser?.informationUserTo?.avatar}
                  name={chatByUser?.informationUserTo?.firstName}
                  lastName={chatByUser?.informationUserTo?.lastName}
                  messageImage={message.image}
                  time={message.hour}
                  fromSelf={message.fromSelf}
                />
              ))
              .reverse()
          : null}

        {chatTimeRealUser
          .sort((a, b) => new Date(a.hour) - new Date(b.hour))
          .map((message, index) => (
            <CardMessage
              key={index}
              message={message.message}
              image={chatByUser?.informationUserTo?.avatar}
              name={chatByUser?.informationUserTo?.firstName}
              lastName={chatByUser?.informationUserTo?.lastName}
              messageImage={message.image}
              time={message.hour}
              fromSelf={message.fromSelf}
              from={message.from}
              to={message.to}
            />
          ))}
        {!chatByUser
          ? [1, 2, 3, 4, 5, 6].map((value, index) => {
              return (
                <div
                  key={value}
                  className={`${index % 2 === 0 && "w-[300px] ml-auto"}`}
                >
                  <SkeletonUser />
                </div>
              );
            })
          : null}
      </div>
      <SendMessage
        scrollLastMessage={scrollLastMessage}
        messageSend={sendMessageBackAction}
      />
    </section>
  );
}

const avatars = [
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];

export default Messages;
