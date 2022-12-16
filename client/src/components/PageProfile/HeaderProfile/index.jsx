import React from "react";
//import logoUploadImage from "../../../assets/subirImage.png";
import logoUploadImage from "../../../assets/camera.png";

function HeaderProfile({ isFriend }) {
  return (
    <header className="relative h-36">
      <img
        className="w-full h-36 object-cover absolute "
        src="https://unageek.com/wp-content/uploads/2020/03/Fondo_pantalla_chat_WA_StarWars_UnaGeek_Oscuro.jpg"
        alt="Portada User"
      />
      <div className="absolute">
        <img
          className="w-32 h-32 object-cover rounded-full relative ml-5 top-1.5"
          src="https://fondosmil.com/fondo/17012.jpg"
          alt="avatar User"
        />
        {!isFriend && (
          <div className="bg-amber-300 w-12 h-12 absolute -bottom-2 -right-2  rounded-full flex items-center justify-center">
            <img
              className="w-10 h-10"
              src={logoUploadImage}
              alt="upload image"
            />
          </div>
        )}
      </div>
      {!isFriend && (
        <div className="bg-amber-300 w-16 h-16 absolute right-8 top-4 rounded-full flex items-center justify-center">
          <img
            className="w-14 h-14 "
            src={logoUploadImage}
            alt="upload image"
          />
        </div>
      )}
    </header>
  );
}

export default HeaderProfile;
