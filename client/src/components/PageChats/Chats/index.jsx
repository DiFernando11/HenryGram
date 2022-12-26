import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";
import { getChatsBackAction } from "../../../redux/actions";
import PreviewMesagge from "../PreviewMesagge";

function Chats() {
  const dispatch = useDispatch();
  const chatUsers = useSelector((state) => state.chatUsers);
  const userInformation = useSelector((state) => state.userInformation);

  useEffect(() => {
    if (userInformation) {
      dispatch(getChatsBackAction(userInformation?._id));
    }
  }, [userInformation]);
  const { pathname } = useLocation();

  const responsiveIsCell = pathname === "/message";

  return (
    <main className="flex w-full sm:h-screen bg-[url('https://unageek.com/wp-content/uploads/2020/03/Fondo_pantalla_chat_WA_StarWars_UnaGeek_Oscuro.jpg')]">
      <div
        className={`lg:w-[30%]  sm:w-[50%] w-screen sm:flex ${
          !responsiveIsCell && "hidden"
        }`}
      >
        <PreviewMesagge title={"Messages"} />
      </div>
      <Outlet />
    </main>
  );
}

export default Chats;
