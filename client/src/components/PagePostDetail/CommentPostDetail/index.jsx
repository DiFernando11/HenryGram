import React from "react";
import logoMatch from "../../../assets/coheteHenry.png";
import SendMessage from "../../PageChats/SendMessage";
function CommentPostDetail() {
  return (
    <>
      <div className="w-full flex gap-14 mt-5 mb-5 justify-center items-center border-y border-neutral-700 py-4">
        <i className="bi bi-hand-thumbs-up text-3xl text-yellow"></i>
        <i className="bi bi-chat-square-dots text-3xl text-yellow"></i>
        {/* {type === "Match" && ( */}
        <img src={logoMatch} alt="match" className="w-8 h-8" />
        {/* )} */}
      </div>
      <SendMessage />
      <div className="h-[calc(100vh-23rem)]  overflow-y-scroll">

      </div>
    </>
  );
}

export default CommentPostDetail;
