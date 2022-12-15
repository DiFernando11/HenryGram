import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileFriendAction } from "../../../redux/actions";
import Profile from "../Profile";

function ProfileFriends() {
  const userProfileFriend = useSelector((state) => state.userProfileFriend);

  const { id } = useParams();
  console.log(id, "idUser");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileFriendAction(id));
  }, [id]);
  return <Profile userInformation={userProfileFriend} />;
}

export default ProfileFriends;
