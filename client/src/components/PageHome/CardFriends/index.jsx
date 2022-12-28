import React from "react";
import { Link } from "react-router-dom";

function CardFriends({ friend }) {


  return (
    <Link to = {`/profile/${friend._id}`} className=" flex items-center justify-between p-2 bg-neutral-800 my-1 ">
      <div className=" flex items-center gap-3  ">
        <img
          className="rounded-full w-10 h-10 border "
          src={friend.avatar}
          alt="avatar user"
        />
        <span className="uppercase"> { friend.firstName } { friend.lastName} </span>
      </div>
      <span>Amigos</span>
    </Link>
  );
}

export default CardFriends;
