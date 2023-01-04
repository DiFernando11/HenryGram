import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileFriendAction } from "../../../redux/actions";
import Profile from "../Profile";

function ProfileFriends() {
  const userProfileFriend = useSelector((state) => state.userProfileFriend);
  const { id } = useParams();
  const dispatch = useDispatch();
  const refreshUpdateProfile = useSelector(
    (state) => state.refresh_update_profile
  );
  useEffect(() => {
    (async () => {
      dispatch(getProfileFriendAction(id));
    })();
  }, [id, refreshUpdateProfile]);
  return (
    <div
      id="viewHeightPostByUser"
      className="w-full h-screen overflow-y-scroll"
    >
      <Profile userInformation={userProfileFriend} />
    </div>
  );
}

export default ProfileFriends;
