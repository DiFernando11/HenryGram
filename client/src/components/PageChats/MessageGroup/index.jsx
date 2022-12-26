import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  chatTimeReal,
  getChatByUserGroupAction,
  getMessageByUserBackAction,
  messagesIsChat,
  sendMessageByGroup,
} from "../../../redux/actions";
import SkeletonUser from "../../Skeletons/skeletonUser";
import CardMessage from "../CardMessage";
import SendMessage from "../SendMessage";
import styles from "./index.module.css";
import Loader from "../../Loader";
function MessageGroup() {
  const chatByUser = useSelector((state) => state.chatByUser);
  const [page, setPage] = useState(1);
  const [isMoreMessages, setIsMoreMessages] = useState(true);
  const [loadingOldMessage, setLoadingOldMessage] = useState(false);
  const [oldMessage, setOldMessage] = useState([]);
  const chatUsers = useSelector((state) => state.chatUsers);
  const chatTimeRealUser = useSelector((state) => state.chatTimeReal);
  function scrollLastMessage() {
    var objDiv = document.getElementById("divu");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatByUserGroupAction(id, 1));
  }, [id, chatUsers]);

  useEffect(() => {
    try {
      if (page > 1) {
        axios
          .get(`http://localhost:3000/api/groups?id=${id}&limit=${page}`)
          .then((response) => {
            console.log(response);
            if (!response.data.length) {
              setIsMoreMessages(false);
            } else {
              setOldMessage([
                ...response.data.reverse(),
                ...oldMessage.reverse(),
              ]);
              //   var objDiv = document.getElementById("divu");
              //   objDiv.scrollTop = 1500;
            }
            setLoadingOldMessage(false);
          });
      }
    } catch (error) {
      console.error("eror en la llamada");
    }
  }, [page]);

  useEffect(() => {
    if (chatByUser?.length && chatUsers?.length) {
      setTimeout(() => scrollLastMessage(), 100);
    }
  }, [chatByUser, chatUsers]);

  useEffect(() => {
    setPage(1);
    // setLoadginSkeletonMessages(true);
    return () => {
      dispatch(getMessageByUserBackAction("clear"));
      //   setLoadginSkeletonMessages(true);
      dispatch(chatTimeReal("clear"));
      setOldMessage([]);
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
    <section className="lg:w-[70%] sm:w-[50%] w-full">
      <div className={styles.header_message}>
        {!chatByUser?.length ? (
          <SkeletonUser isMessage={false} />
        ) : (
          <div className={styles.userInformationChat}>
            <img src={chatByUser[0]?.avatar} alt="user_chat" />

            <span className="truncate w-4/5">GRUPO 0</span>
          </div>
        )}

        <div className={styles.actionsChat}>
          <i className={`bi bi-camera-video lg:block hidden`}></i>
          <i className="bi bi-telephone lg:block hidden"></i>
          <i className="bi bi-three-dots-vertical lg:block hidden"></i>
        </div>
      </div>
      <div
        id="divu"
        className={` ${styles.messagesSent} relative h-[calc(100vh-12rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll`}
      >
        {loadingOldMessage && <Loader />}
        {!isMoreMessages && (
          <h1 className="text-center text-white bg-black rounded-full uppercase p-2 font-semibold">
            {`Greetings to everyone in group 0 🤝`}
          </h1>
        )}
        {oldMessage.length
          ? oldMessage.map((message, index) => (
              <CardMessage
                key={index}
                message={message.content}
                image={message.avatar}
                name={message.firstName}
                lastName={message.lastName}
                time={message.createdAt}
                fromSelf={false}
              />
              // <div>hOKLA</div>
            ))
          : null}
        {chatByUser?.length
          ? chatByUser
              .map((message, index) => (
                <CardMessage
                  key={index}
                  message={message.content}
                  image={message.avatar}
                  name={message.firstName}
                  lastName={message.lastName}
                  time={message.createdAt}
                  fromSelf={false}
                  //   from={message.from}
                  //   to={message.to}
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
          {!chatByUser?.length && chatByUser &&  <div className="text-white text-lg uppercase text-center bg-black p-4 rounded m-auto">{`greetings to all 👋`}</div>}
      </div>
      <SendMessage
        messageSend={sendMessageByGroup}
        // informationTo={chatByUser.informationUserTo}
        scrollLastMessage={scrollLastMessage}
      />
    </section>
  );
}

export default MessageGroup;
