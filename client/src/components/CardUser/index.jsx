import React from "react";
import { Link } from "react-router-dom";

function CardUser({ friend }) {
  return (
    <div className=" bg-black p-3 z-10 border border-slate-900 ">
      <Link to={`/profile/${friend._id}`} className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full"
          src={friend.avatar}
          alt={`Friend ${friend.firstName}`}
        />
        <span className="truncate">
          {friend.firstName} {friend.lastName}
        </span>
      </Link>
    </div>
  );
}

export default CardUser;
