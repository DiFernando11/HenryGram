import React from "react";
import AvatarStack from "../avatarStack";
import styles from "./index.module.css";

function Messages() {
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
          {/* <i class="bi bi-mic"></i> */}
        </div>
      </div>
      <form>
        <label
          for="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className={styles.messagesSent}></div>
        <div className={`relative ${styles.inputSentMessage}`}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i className="bi bi-emoji-sunglasses text-yellow-300"></i>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 pl-10 text-sm text-white border rounded-lg  bg-zinc-900 border-amber-200"
            placeholder="Hello..."
            autoComplete="off"
            required
          />
          <i className="bi bi-mic text-yellow-300 absolute right-2.5 bottom-2.5 text-sm px-16 py-1"></i>
          <i className="bi bi-send-fill text-yellow-300 absolute right-2.5 bottom-2.5 text-sm px-4 py-1"></i>
        </div>
      </form>
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
