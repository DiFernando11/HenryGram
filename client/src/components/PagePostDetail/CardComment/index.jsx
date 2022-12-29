import React from "react";
import { Link } from "react-router-dom";

function CardComment({ userId, comment , firstName , lastName , avatar }) {
  return (
    <div className="p-4 border border-zinc-700 flex gap-2 items-center justify-start">
      <Link to={`/profile/${userId}`}>
        <img
          className="fit-cover max-w-[30px] min-w-[30px] rounded-full"
          src={avatar}
          alt="user avatar"
        />
      </Link>
      <div>
        <Link to={`/profile/${userId}`}>
          <span className="uppercase block text-[9px] leading-[8px] mb-2 ">{`${firstName} ${lastName}`}</span>
        </Link>
        <p className="text-[13px]  max-w-40 text-white">{comment}</p>
      </div>
    </div>
  );
}

export default CardComment;
