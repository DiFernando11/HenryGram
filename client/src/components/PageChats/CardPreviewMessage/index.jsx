import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { timeHours } from "../utils";
import styles from "./index.module.css";

function CardPreviewMessage({
  id,
  image,
  name,
  lastName,
  message,
  time,
  sender,
  title,
  creator,
  pendings,
}) {
  const timeHour = time ? timeHours(time) : null;
  let senderMessage = id !== sender;
  const chatTimeReal = useSelector((state) => state.chatTimeReal);
  const findChatTimeReal = chatTimeReal.some((chat) => chat.from === id);
  const userInformation = useSelector((state) => state.userInformation);
  const isCreatorGroup = creator === userInformation?._id;

  return (
    <NavLink
      to={`${title ? `/message/chat/group/${id}` : `/message/chat/${id}`}`}
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: "rgb(99, 99, 22)",
              position: "relative",
              borderRadius: "8px",
              transform: "translateX(15%)",
              transition: "0.25s",
            }
          : { backgroundColor: "#242424" }
      }
    >
      <div
        // onClick={handleTopScroll}
        className={`flex gap-1 relative p-2.5 border-slate-200 my-0.5 ${styles.backgroundCardUser}`}
      >
        {creator && isCreatorGroup && pendings.length ? (
          <span className="absolute bottom-2 right-4  w-3 h-3 bg-red-500 rounded-full"/>
        ): null}
        <div className="relative mr-2 flex items-center">
          <img className={`${styles.imageCard} border bg-neutral-600 border-amber-300`} src={image} alt={"user message"} />
          <span className="top-1 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>

        <div className="items-center self-center font-bold w-4/5 truncate">
          <span className="block leading-5 w-4/5  truncate">{`${
            title ? title : name
          } ${lastName ? lastName : ""}`}</span>

          <span
            className={`${styles.textMessage} w-4/5 truncate inline-block `}
          >
            <b>
              {message ? (senderMessage ? "Tu: " : `${name} :`) : "No messages"}
            </b>
            {message ? message : null}
          </span>
          {findChatTimeReal ? (
            <span className="absolute flex items-center justify-center text-xs text-black bottom-1 right-0 mr-4 m-2 bg-red-600 w-4 h-4 rounded-full"></span>
          ) : null}
          {timeHour && (
            <span className="m-1 mr-2 mt-3.5 absolute -top-2 right-0 text-xs ">
              {timeHour}
            </span>
          )}

          {/* {time ? (
            <i className="bi bi-check2-all m-1 mr-3 absolute bottom-0 right-0"></i>
          ) : (
            <img
              src={logoMatch}
              className="m-1 mr-3 mb-4 absolute bottom-0 right-0 w-8 h-8"
              alt="button match"
            />
          )} */}
        </div>
      </div>
    </NavLink>
  );
}

export default CardPreviewMessage;
