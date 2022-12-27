import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AboutProfile from '../AboutProfile';
import HeaderProfile from '../HeaderProfile';
import PostProfile from '../PostProfile';

function Profile({ userInformation }) {
	const userInformationVerify = useSelector((state) => state.userInformation);
	const userProfileFriend = useSelector((state) => state.userProfileFriend);
	const [isFriend, setIsFriend] = useState(true);
	const { id } = useParams();


	
	useEffect(() => {
		setIsFriend(userProfileFriend?._id === userInformationVerify?._id);
		return () => {
			setIsFriend(false);
		};
	}, [id]);



	return (
		<main className="w-full">
			<HeaderProfile userInformation={userInformation} />
			<div className=" w-full xl:flex sm:h-[calc(100vh-9rem)] lg:h-[calc(100vh-9rem)] h-[calc(100vh-13rem)] overflow-y-scroll">
				<AboutProfile userInformation={userInformation} />
				<PostProfile userInformation={userInformation} isFriend={isFriend} />
			</div>
		</main>
	);
}

export default Profile;
