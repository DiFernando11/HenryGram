import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
import {
  chatTimeReal,
  getMessageByUserBackAction,
  sendMessageBackAction,
} from "../../../redux/actions";
import Loader from "../../Loader";
import SkeletonUser from "../../Skeletons/skeletonUser";
import AvatarStack from "../avatarStack";
import CardMessage from "../CardMessage";
import SendMessage from "../SendMessage";
import styles from "./index.module.css";

function Messages() {
  const [page, setPage] = useState(20);
  const [loadingOldMessage, setLoadingOldMessage] = useState(true);
  const [loadginSkeletonMessages, setLoadginSkeletonMessages] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const chatByUser = useSelector((state) => state.chatByUser);
  const chatUsers = useSelector((state) => state.chatUsers);
  const chatPrevent = useSelector((state) => state.chatPrevent);
  const userInformation = useSelector((state) => state.userInformation);
  const chatTimeRealUser = useSelector((state) => state.chatTimeReal);
  function scrollLastMessage() {
    var objDiv = document.getElementById("divu");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  useEffect(() => {
    dispatch(
      getMessageByUserBackAction({
        from: userInformation?._id,
        to: id,
        limit: page,
      })
    );
    setLoadingOldMessage(false);
  }, [id, chatUsers, page]);

  useEffect(() => {
    if (chatByUser?.projectedMessages && chatUsers.length) {
      setLoadginSkeletonMessages(false);
      setTimeout(() => scrollLastMessage(), 100);
    }
  }, [chatByUser, chatUsers]);

  useEffect(() => {
    document.getElementById("divu").addEventListener("scroll", handleScroll);
    setPage(20);
    setLoadginSkeletonMessages(true);
    return () => {
      if (document.getElementById("divu")) {
        document
          .getElementById("divu")
          .removeEventListener("scroll", handleScroll);
      }
      dispatch(getMessageByUserBackAction("clear"));
      setLoadginSkeletonMessages(true);
      dispatch(chatTimeReal("clear"));
    };
  }, [id]);

  const handleScroll = () => {
    const heigthScroll = document.getElementById("divu").scrollHeight;
    const containerHeight = document.getElementById("divu").clientHeight;

    if (
      document.getElementById("divu").scrollTop === 0 &&
      heigthScroll !== containerHeight
    ) {
      // setLoadingOldMessage(true);
      setPage(40);
    }
  };

  if (chatUsers?.length) {
    const chatUsersID = chatUsers.map((user) => user?.usr?._id).includes(id);
    const chatUsersPreventID = chatPrevent.map((user) => user._id).includes(id);
    if (!chatUsersID && !chatUsersPreventID)
      return <Navigate to={"/message"} />;
  }

  return (
    <section className={styles.section_Messages}>
      <div className={styles.header_message}>
        {!chatByUser?.informationUserTo ? (
          <SkeletonUser isMessage={false} />
        ) : (
          <div className={styles.userInformationChat}>
            <img src={chatByUser?.informationUserTo?.avatar} alt="user_chat" />

            <span>
              {`${chatByUser?.informationUserTo?.firstName} ${chatByUser?.informationUserTo?.lastName} `}
            </span>
          </div>
        )}

        <div className={styles.actionsChat}>
          <AvatarStack avatars={avatars} />
          <i className={`bi bi-camera-video`}></i>
          <i className="bi bi-telephone"></i>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div id="divu" className={`${styles.messagesSent} relative`}>
        {loadginSkeletonMessages
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
          : chatByUser?.projectedMessages?.length
          ? chatByUser?.projectedMessages?.map((message, index) => (
              <CardMessage
                key={index}
                message={message.message}
                image={chatByUser?.informationUserTo?.avatar}
                name={chatByUser?.informationUserTo?.firstName}
                lastName={chatByUser?.informationUserTo?.lastName}
                time={message.hour}
                fromSelf={message.fromSelf}
              />
            ))
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
              time={message.hour}
              fromSelf={message.fromSelf}
              from={message.from}
              to={message.to}
            />
          ))}
      </div>
      <SendMessage
        informationTo={chatByUser.informationUserTo}
        scrollLastMessage={scrollLastMessage}
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
