import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AboutProfile from "../AboutProfile";
import HeaderProfile from "../HeaderProfile";
import PostProfile from "../PostProfile";
import { clearState } from "../../../redux/actions";

function Profile({ userInformation }) {
  const dispatch = useDispatch()
  const userInformationVerify = useSelector((state) => state.userInformation);
  const userProfileFriend = useSelector((state) => state.userProfileFriend);
  const { id } = useParams();
  const handleIsFriend = () => {
    let result;
    if (userProfileFriend?._id === userInformationVerify?._id || !id)
      result = false;
    else result = true;
    return result;
  };
  
  const isFriend = handleIsFriend();
  return (
    <main className="w-full">
      <HeaderProfile userInformation={userInformation} isFriend={isFriend} />
      <div className=" w-full xl:flex sm:h-[calc(100vh-9rem)] lg:h-[calc(100vh-9rem)] h-[calc(100vh-13rem)] overflow-y-scroll" >
        <AboutProfile userInformation={userInformation} isFriend={isFriend} />
        <PostProfile userInformation={userInformation} isFriend={isFriend} />
      </div>
    </main>
  );
}

export default Profile;
