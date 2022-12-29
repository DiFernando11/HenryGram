import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeHours } from "../utils";
import styles from "./index.module.css";

function CardMessage({
  image,
  name,
  lastName,
  message,
  messageImage,
  fromSelf,
  time,
  from,
  to,
}) {
  console.log(messageImage , "image");
  const { id } = useParams();
  const userInformation = useSelector((state) => state.userInformation);
  if (userInformation?._id !== from && id && to && from && id !== from) return;
  const timesHours = timeHours(time);

  // const timeMessage = timeDate.split(",");
  const DBName = fromSelf
    ? `${userInformation?.firstName} ${userInformation?.lastName}`
    : `${name} ${lastName}`;
  const DBImage = fromSelf ? userInformation?.avatar : image;
  return (
    <div
      className={`${styles.containerMessage} ${
        fromSelf && styles.containerMessageStaff
      } `}
    >
      <img className={styles.imageCard} src={DBImage} alt={"user message"} />
      <div className={styles.textContainerMessage}>
        <div className={styles.flexHeaderMessage}>
          <span className={`${styles.nameTextMessage} truncate w-4/5`}>
            {DBName}
          </span>
          <span className={styles.textHours}>{timesHours}</span>
        </div>
        <div className={styles.textMessage}>
          <span>{message}</span>
          <div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] items-center bg-transparent gap-2">
            {messageImage?.length ?
              messageImage.map((url) => (
                <img
                  className="rounded pt-2 block w-full object-cover ml-auto  h-20"
                  src={url}
                />
              )) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMessage;
