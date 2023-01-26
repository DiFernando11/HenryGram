import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import PreviewMesagge from "../PreviewMesagge";

function Chats() {
  const { pathname } = useLocation();
  const responsiveIsCell = pathname === "/message";

  return (
    <main className="flex w-full sm:h-screen bg-[url('https://unageek.com/wp-content/uploads/2020/03/Fondo_pantalla_chat_WA_StarWars_UnaGeek_Oscuro.jpg')]">
      <div
        className={`md:w-[35%]  w-full md:flex ${
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
