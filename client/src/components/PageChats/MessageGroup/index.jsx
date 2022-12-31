import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  chatTimeReal,
  getChatByUserGroupAction,
  getMessageByUserBackAction,
  responseInvitationGroupAction,
  sendMessageByGroup,
} from "../../../redux/actions";
import AvatarStack from "../AvatarStack/index";
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
  const [findChatUser, setFindChatUser] = useState(null);
  const [integrantsGroup, setIntegrantsGroup] = useState([]);
  const [pendingsUser, setPendingsUser] = useState([]);
  const chatUsers = useSelector((state) => state.chatUsers);
  const chatTimeRealUser = useSelector((state) => state.chatTimeReal);
  const userInformation = useSelector((state) => state.userInformation);

  const isCreatorGroup = findChatUser?.gr?.creator === userInformation?._id;

  function scrollLastMessage() {
    var objDiv = document.getElementById("divu");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatByUserGroupAction(id, 1));
    if (chatUsers?.length) {
      const findChat = chatUsers?.find((chat) => chat?.gr?._id === id);
      setFindChatUser(findChat);
    }
  }, [id, chatUsers]);

  useEffect(() => {
    try {
      if (findChatUser && findChatUser?.gr?.users.length > 1) {
        axios
          .post(`http://localhost:3000/api/users/info`, {
            users: findChatUser.gr?.users.slice(0, 4),
          })
          .then((response) => {
            console.log(response, "response");
            setIntegrantsGroup(response.data);
          });
      }
    } catch (error) {
      console.error("error en la funcion user Integrants");
    }
    try {
      if (findChatUser && findChatUser?.gr?.pendings.length) {
        axios
          .post(`http://localhost:3000/api/users/info`, {
            users: findChatUser?.gr?.pendings,
          })
          .then((response) => {
            setPendingsUser(response.data);
          });
      }
    } catch (error) {
      console.error("error en la funcion get pendindg users");
    }
    return () => {
      setIntegrantsGroup([]);
      setPendingsUser([]);
    };
  }, [findChatUser]);

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
  const handleResponseInvitation = (response, idUser) => {
    dispatch(
      responseInvitationGroupAction({
        groupId: findChatUser?.gr?._id,
        userId: idUser,
        response: response,
      })
    );
    handleHideInvitation(idUser);
  };
  const handleHideInvitation = (idUser) => {
    const responsePendings = pendingsUser.filter((user) => user._id !== idUser);
    setPendingsUser(responsePendings);
  };


  return (
    <section className="lg:w-[70%] sm:w-[50%] w-full">
      <div className={styles.header_message}>
        {!findChatUser ? (
          <SkeletonUser isMessage={false} />
        ) : (
          <div className={styles.userInformationChat}>
            <img src={findChatUser.gr.avatar} alt="user_chat" />

            <span className="truncate w-4/5">{findChatUser.gr.title}</span>
          </div>
        )}

        <div className={styles.actionsChat}>
          <AvatarStack avatars={integrantsGroup} />
          <i className={`bi bi-camera-video lg:block hidden`}></i>
          <i className="bi bi-telephone lg:block hidden"></i>
          <i className="bi bi-three-dots-vertical lg:block hidden"></i>
        </div>
      </div>
      <div
        id="divu"
        className={` ${styles.messagesSent} relative h-[calc(100vh-12rem)] sm:h-[calc(100vh-8rem)] overflow-y-scroll`}
      >
        {isCreatorGroup &&
        findChatUser?.gr?.pendings?.length &&
        pendingsUser.length
          ? pendingsUser.map((user) => (
              <div
                key={user._id}
                className="w-[98%] bg-amber-300 py-4 px-2 flex items-center justify-between justify-self-center absolute z-10"
              >
                <span
                  onClick={() => handleHideInvitation(user._id)}
                  className="absolute -top-1 left-1 text-black font-black cursor-pointer"
                >
                  X
                </span>
                <div className="flex items-center gap-3 ml-3">
                  <img
                    src={user.avatar}
                    alt="user avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-black font-black uppercase truncate w-4/5">
                    {`${user.firstName} ${user.lastName}`}
                  </span>
                </div>
                <span className="uppercase text-black font-black lg:block hidden">
                  join the group
                </span>
                <div className="flex gap-3 items-center justify-center font-black">
                  <span
                    onClick={() => handleResponseInvitation(false, user._id)}
                    className="cursor-pointer font-black text-red-700 text-lg bg-amber-400 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    X
                  </span>
                  <i
                    onClick={() => handleResponseInvitation(true, user._id)}
                    className="bi bi-check2 font-black text-green-800 bg-amber-400 rounded-full w-8 h-8 text-2xl flex items-center justify-center"
                  ></i>
                </div>
              </div>
            ))
          : null}

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
                messageImage={message.image}
                fromSelf={message.userId === userInformation?._id}
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
                  fromSelf={message.userId === userInformation?._id}
                  messageImage={message.image}
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
              messageImage={message.image}
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
        {!chatByUser?.length && chatByUser && !chatTimeRealUser?.length && (
          <div className="text-white text-lg uppercase text-center bg-black p-4 rounded m-auto">{`greetings to all 👋`}</div>
        )}
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
