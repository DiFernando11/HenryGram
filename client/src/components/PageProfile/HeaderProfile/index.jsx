import React, { useState, useEffect } from "react";
//import logoUploadImage from "../../../assets/subirImage.png";
import logoUploadImage from "../../../assets/camera.png";
import { uploadImage } from "../../helpers/uploadImage";
import { useSelector } from "react-redux";
import { editProfileAction } from "../../../redux/actions/index";
import { useDispatch } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const giftUpload =
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921";

function HeaderProfile({ userInformation }) {
  const dispatch = useDispatch();
  const [avatarUser, setAvatarUser] = useState("");
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [bannerUser, setBannerUser] = useState("");
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [editHeader, setEditHeader] = useState(false);
  const userId = useSelector((state) => state.userInformation?._id);

  const handleSaveAvatarUser = (e) => {
    uploadImage(e, setLoadingAvatar, null, setAvatarUser).then((res) => {
      dispatch(
        editProfileAction({
          avatar: res,
          id: userId,
        })
      );
    });
  };
  const handleSaveBannerUser = (e) => {
    uploadImage(e, setLoadingBanner, null, setBannerUser).then((res) => {
      dispatch(
        editProfileAction({
          banner: res,
          id: userId,
        })
      );
    });
  };

  // useEffect(() => {}, [userInformation]);

  return (
    <header className="relative sm:h-header h-32 z-10 rounded-t-lg">
      <img
        className="w-full sm:h-header h-32   object-cover absolute rounded-lg"
        src={loadingBanner ? giftUpload : bannerUser || userInformation?.banner}
        alt="Portada User"
      />
      <div className=" absolute sm:bottom-avatar -bottom-16 xl:w-2/5 w-full flex justify-center overflow-visible">
        <img
          className="w-32 h-32 object-cover rounded-full xl:ml- border-spacing-2 bg-neutral-600 sm:ml-0"
          src={
            loadingAvatar ? giftUpload : avatarUser || userInformation?.avatar
          }
          alt="avatar User"
        />
        {userInformation._id === userId && editHeader && (
          <div className="bg-amber-300 w-12 h-12 absolute -bottom-2 right-custom1  rounded-full flex items-center justify-center ">
            <label htmlFor="file" className="cursor-pointer">
              <img
                className="w-10 h-10"
                src={logoUploadImage}
                alt="upload image"
              />
            </label>
            <input
              id="file"
              name="image"
              type="file"
              className="hidden"
              onChange={handleSaveAvatarUser}
            />
          </div>
        )}
      </div>
      {userInformation._id === userId && editHeader && (
        <div className="bg-amber-300 w-16 h-16 absolute right-8 bottom-4 rounded-full flex items-center justify-center">
          <label htmlFor="file-banner" className="cursor-pointer">
            <img
              className="w-14 h-14 "
              src={logoUploadImage}
              alt="upload image"
            />
          </label>
          <input
            id="file-banner"
            name="image-banner"
            type="file"
            className="hidden"
            onChange={handleSaveBannerUser}
          />
        </div>
      )}

      {userInformation._id === userId && (
        <div className="absolute right-3 top-3">
          <button
            className="bg-stone-500 w-fit h-fit py-1 px-2 rounded-md gap-2 flex items-center justify-center"
            onClick={() => setEditHeader(!editHeader)}
          >
            <p className="text-sm text-white">
              {editHeader ? "Cancelar" : "Editar"}
            </p>
            {editHeader ? (
              <RxCross1 className="w-3 h-3" />
            ) : (
              <BsPencilSquare className="w-3 h-3 text-white" />
            )}
          </button>
        </div>
      )}
    </header>
  );
}

export default HeaderProfile;
