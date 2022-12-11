import React from "react";
import Messages from "../Mesagge";
import PreviewMesagge from "../PreviewMesagge";
import styles from "./index.module.css";

function Chats() {
  return (
    <main className={styles.page_Chats}>
      <div className={styles.sections_Preview_Page}>
        <PreviewMesagge />
        <PreviewMesagge />
      </div>
      <Messages />
    </main>
  );
}

export default Chats;
