import React from "react";
import logoMatch from "../../../assets/coheteHenry.png";
import SendMessage from "../../PageChats/SendMessage";

function Post({ type, seguir, message, user, imagePost, handleIsMatch }) {
  return (
    <section className="w-11/12 bg-gray-500 h-auto mt-6 m-auto relative pt-8 p-6 border border-amber-300 containerBackrougndImagePost ">
      {type === "Match" && (
        <div className="absolute ml-6 top-0 left-0 mt-2 flex items-center gap-1">
          <span className=" text-xs ml-2">Match</span>
          <img src={logoMatch} alt="match" className="w-4 h-4" />
        </div>
      )}
      <i className="bi bi-three-dots text-yellow-300 absolute top-0 right-0 mr-8 text-2xl"></i>
      <div className="border-t border-amber-300 pt-4 flex gap-2.5 relative">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user.image}
          alt={user.name}
        />
        <span className="leading-10">{user.name}</span>
        {!seguir && (
          <span className="absolute top-0 right-0 mt-7 text-sm ">Seguir</span>
        )}
      </div>
      <p className="my-5">{message}</p>
      {imagePost && (
        <img
          className="w-full h-80 object-cover"
          src={imagePost}
          alt="post user"
        />
      )}

      <div className="flex gap-10 mt-5 mb-5 items-center border-y border-neutral-700 py-4">
        <i className="bi bi-hand-thumbs-up text-3xl"></i>
        {type === "Normal" ? (
          <i className="bi bi-chat-square-dots text-3xl"></i>
        ) : (
          <img
            src={logoMatch}
            alt="match"
            className="w-8 h-8"
            onClick={handleIsMatch}
          />
        )}
      </div>
      {type === "Normal" && <SendMessage />}
    </section>
  );
}

export default Post;
