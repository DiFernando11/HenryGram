import React from "react";
import { useSelector } from "react-redux";
import Profile from "../Profile";
function ProfileUser() {
  const userInformation = useSelector((state) => state.userInformation);
  return <Profile userInformation={userInformation} />;
}

export default ProfileUser;
