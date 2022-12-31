import React, { useState } from "react";
import { useSelector } from "react-redux";
import { confirmedRequestFriendAction } from "../../redux/actions";

function DropDownSelect({ status, icon, select, confirmed, requests , position = "bottom"}) {
  const userInformation = useSelector((state) => state.userInformation);
  const [show, setShow] = useState(false);
  const handleConfirmedRequestFriend = (id) => {
    dispatch(
      confirmedRequestFriendAction({
        UserA: userInformation._id,
        UserB: id,
        resp: true,
      })
    );
    setStatusFriend("Amigos");
  };
  const handleRejectRequestFriend = (id) => {
    dispatch(
      confirmedRequestFriendAction({
        UserA: userInformation,
        UserB: id,
        resp: false,
      })
    );
    setStatusFriend("Seguir");
  };
  return (
    <div
      onBlur={() => setShow(false)}
      className="relative flex items-center justify-center items-center bg-transparent group "
    >
      <div
        className="relative flex items-center gap-2 z-10"
        onClick={() => setShow(!show)}
      >
        {confirmed && (
          <span className="flex justify-center  items-center absolute bg-red-600 rounded-full w-5 h-5 -top-2 left-4 text-xs ">
            {requests}
          </span>
        )}
        <i className={`bi ${icon} ${confirmed ? "text-3xl" : "text-2xl"} text-yellow`}></i>
        {status ? (
          <span
            className={`${
              confirmed ? "text-base font-medium" : "text-yellow"
            } cursor-pointer`}
          >
            {status}
          </span>
        ) : null}
      </div>

      <div
        className={`absolute ${!show ? "hidden" : null} ${
          position === "left" ? "-right-[300px]" : "right-5"
        } top-full min-w-full w-max  shadow-md mt-1 rounded cursor-pointer z-20 `}
      >
        <ul className="text-left border rounded-l-md rounded-br-md bg-zinc-800 cursor-pointer ">
          {select.length &&
            select.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 flex items-center gap-2  border-b"
                onClick={
                  item.handleActionFriend ? item.handleActionFriend : null
                }
              >
                {item?.avatar && (
                  <img
                    src={item.avatar}
                    alt="avatar user"
                    className="rounded-full w-10 h-10"
                  />
                )}
                <span className="uppercase"> {item.text}</span>
                {item?.icon && <i className={`bi ${item.icon} text-yellow`}></i>}
                {confirmed && (
                  <div className="ml-3 text-xs flex gap-2 ">
                    <span
                      className="border p-1 bg-green-700"
                      onClick={() => handleConfirmedRequestFriend(item?.id)}
                    >
                      CONFIRM
                    </span>
                    <span
                      className="border p-1 bg-red-600"
                      onClick={() => handleRejectRequestFriend(item?.id)}
                    >
                      REJECT
                    </span>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DropDownSelect;
