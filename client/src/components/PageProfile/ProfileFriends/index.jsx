import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileFriendAction } from '../../../redux/actions';
import Profile from '../Profile';

function ProfileFriends() {
	const userProfileFriend = useSelector((state) => state.userProfileFriend);
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			dispatch(getProfileFriendAction(id));
		})();
	}, [id]);
	return (
		<div className='h-screen overflow-scroll'>
			<Profile userInformation={userProfileFriend} />
		</div>
	);
}

export default ProfileFriends;
