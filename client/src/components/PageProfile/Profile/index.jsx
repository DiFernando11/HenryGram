import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AboutProfile from "../AboutProfile";
import HeaderProfile from "../HeaderProfile";
import PostProfile from "../PostProfile";

function Profile({ userInformation }) {
  const userInformationVerify = useSelector((state) => state.userInformation);
  const userProfileFriend = useSelector((state) => state.userProfileFriend);
  const [isFriend, setIsFriend] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setIsFriend(userProfileFriend?._id === userInformationVerify?._id);
    return () => {
      setIsFriend(true);
    };
  }, [id]);

  return (
    <main className="xl:p-4 flex flex-col gap-2">
      <HeaderProfile userInformation={userInformation} isFriend={isFriend} />
      <div className="flex flex-col gap-5 xl:h-fit  sm:h-[calc(100vh-9rem)] lg:h-[calc(100vh-9rem)] h-[calc(100vh-13rem)]">
        <AboutProfile userInformation={userInformation} isFriend={isFriend} />
        <PostProfile userInformation={userInformation} isFriend={isFriend} />
      </div>
    </main>
  );
}

export default Profile;
