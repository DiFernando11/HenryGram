import React from "react";
import { useSelector } from "react-redux";
import AvatarStack from "../avatarStack";
import CardMessage from "../CardMessage";
import SendMessage from "../SendMessage";
import styles from "./index.module.css";

function Messages() {
  const messages = useSelector((state) => state.messages);
  return (
    <section className={styles.section_Messages}>
      <div className={styles.header_message}>
        <div className={styles.userInformationChat}>
          <img
            src="https://assets.stickpng.com/thumbs/585e4bf3cb11b227491c339a.png"
            alt="user_chat"
          />
          <span>Andres Aldao</span>
        </div>
        <div className={styles.actionsChat}>
          <AvatarStack avatars={avatars} />
          <i className={`bi bi-camera-video`}></i>
          <i className="bi bi-telephone"></i>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div className={styles.messagesSent}>
        {messages.length &&
          messages.map((message) => (
            <CardMessage
              key={message.messageid}
              id={message.id}
              message={message.message}
              image={message.image}
              name={message.name}
            />
          ))}
      </div>
      <SendMessage />
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
