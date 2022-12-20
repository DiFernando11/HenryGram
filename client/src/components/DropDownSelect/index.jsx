import React, { useState } from "react";

function DropDownSelect({ status, icon, select, confirmed, requests }) {
  const [show, setShow] = useState(false);

  return (
    <div
      onBlur={() => setShow(false)}
      className="relative flex items-center justify-center items-center bg-transparent group"
    >
      <div
        className="relative flex items-center gap-2"
        onClick={() => setShow(!show)}
      >
        {confirmed && (
          <span className="flex justify-center  items-center absolute bg-red-600 rounded-full w-5 h-5 -top-2 left-4 text-xs ">
            {requests}
          </span>
        )}
        <i className={`bi ${icon} ${confirmed ? "text-3xl" : "text-2xl"}`}></i>
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
        className={`absolute ${
          !show ? "hidden" : null
        } right-5  top-full min-w-full w-max  shadow-md mt-1 rounded cursor-pointer z-10 `}
      >
        <ul className="text-left border rounded-l-md rounded-br-md bg-zinc-800 cursor-pointer ">
          {select.length &&
            select.map((item, index) => (
              <li key={index} className="px-4 py-1 flex items-center gap-2  border-b">
                {item?.avatar && (
                  <img
                    src={item.avatar}
                    alt="avatar user"
                    className="rounded-full"
                  />
                )}
                <span className="uppercase"> {item.text}</span>
                {item?.icon && <i className={`bi ${item.icon}`}></i>}
                {confirmed && (
                  <div className="ml-3 text-xs flex gap-2 ">
                    <button className="border p-1 bg-green-700">CONFIRM</button>
                    <button className="border p-1 bg-red-600">REJECT</button>
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
