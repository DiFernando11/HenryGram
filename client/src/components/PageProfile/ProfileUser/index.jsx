import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../Profile";
import { clearState } from "../../../redux/actions";
function ProfileUser() {
  
  const userInformation = useSelector((state) => state.userInformation);
  return <Profile userInformation={userInformation} />;
}

export default ProfileUser;
