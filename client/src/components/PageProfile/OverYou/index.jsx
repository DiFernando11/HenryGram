import React,  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditAbout from "./EditAbout/editAbout";
import FriendProfile from "./FriendProfile/FriendProfile";
import YourProfile from "./YourProfile/YourProfile";
import { BsPencilSquare } from "react-icons/bs";

function aboutYou({profileId}) {

  const [editAbout, setEditAbout] = useState(false);
  const about = useSelector((state) => state.userProfileFriend?.description);
  const userId = useSelector((state) => state.userInformation?._id);

  useEffect(() => {
  }, [about, editAbout]);

  return (
    userId === profileId ? (
      <YourProfile profileId = { profileId } />
    ) : (
      <FriendProfile profileId = { profileId } />
    )
  );
}

export default aboutYou;
