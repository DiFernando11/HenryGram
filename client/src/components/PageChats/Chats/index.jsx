import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { getChatsBackAction } from "../../../redux/actions";
import PreviewMesagge from "../PreviewMesagge";

function Chats() {
  const dispatch = useDispatch();

  const chatUsers = useSelector((state) => state.chatUsers);
  const userInformation = useSelector((state) => state.userInformation);
  const { pathname } = useLocation();
  const responsiveIsCell = pathname === "/message";
  console.log(pathname, responsiveIsCell, "location");

  useEffect(() => {
    if (userInformation) {
      dispatch(getChatsBackAction(userInformation?._id));
    }
  }, [userInformation]);

  return (
    <main className="flex w-full bg-[url('https://unageek.com/wp-content/uploads/2020/03/Fondo_pantalla_chat_WA_StarWars_UnaGeek_Oscuro.jpg')]">
      <div className={`lg:w-[30%]  sm:w-[50%] w-screen sm:flex ${!responsiveIsCell && "hidden"}`}>
        <PreviewMesagge
          title={"Messages"}
          messages={chatUsers}
          messagesGroup={messagessGroup}
        />
      </div>
      <Outlet />
    </main>
  );
}

const messagessGroup = [
  {
    id: 1,
    image:
      "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Programadores",
  },
  {
    id: 2,
    image:
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",

    time: "8:30",
    message: "Reunion de trabajo",
    name: "Grupo Office",
  },
  {
    id: 3,
    image:
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",

    time: "8:30",
    message: "poquito",
    name: "Argentinos",
  },
  {
    id: 4,
    image:
      "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Viajes",
  },
  {
    id: 5,
    image:
      "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Trabajadores",
  },
  {
    id: 6,
    image:
      "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",

    message: "poquito",
    time: "8:30",
    name: "Diego",
  },
  {
    id: 7,
    image:
      "https://lh3.googleusercontent.com/ogw/AOh-ky3yFATVLoTM_AdMXMinG316CxoKmhR3G3gPWUJ3CA=s64-c-mo",

    message: "poquito",
    time: "8:30",
    name: "Diego",
  },
];

export default Chats;
