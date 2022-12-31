import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Link,
	Navigate,
	useParams,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import {
	addChatBackAction,
	confirmedRequestFriendAction,
	getChatsBackAction,
	sendRequestFriendAction,
	getFriendsAvatarAndName,
} from '../../../redux/actions';
import DropDownSelect from '../../DropDownSelect';
import AvatarStack from '../../PageChats/AvatarStack';
import FavoriteActivities from '../FavoriteActivities';
import ModalEditProfile from '../ModalEditProfile';
import ModalFriends from '../ModalFriends';
import OverYou from '../OverYou';
import axios from 'axios';

function AboutProfile({ userInformation }) {
	//useInformation: Profile information
	const dispatch = useDispatch();
	const [statusFriend, setStatusFriend] = useState('seguir');
	const [show, setShow] = useState(false);
	const [showEditProfile, setShowEditProfile] = useState(false);
	const chatUsers = useSelector((state) => state.chatUsers);
	const chatPrevent = useSelector((state) => state.chatPrevent);
	const friendsByUser = useSelector((state) => state.friendsByUser);
	const userID = useSelector((state) => state.userInformation?._id);
	const navigate = useNavigate();
	const { id } = useParams();
	const applicationStatus = friendsByUser.find(
		(friend) => friend.recipient == id || friend.requester == id
	);

	const [friendsAvatars, setFriendsAvatars] = useState([]);

	useEffect(() => {
		try {
			axios
				.get(`http://localhost:3000/api/users/nameAndAvatar/${id}`)
				.then((response) => {
					setFriendsAvatars(response.data);
				});
		} catch (error) {
			console.error('error en la funcion get avatar');
		}
	}, [id]);

	const handleStatusFriend = () => {
		if (applicationStatus) {
			if (Number(applicationStatus.status) === 1) setStatusFriend('Enviada');
			else if (Number(applicationStatus.status) === 2)
				setStatusFriend('Recibido');
			else if (Number(applicationStatus.status) === 3)
				setStatusFriend('Amigos');
		} else setStatusFriend('Seguir');
	};

	useEffect(() => {
		handleStatusFriend();
	}, [friendsByUser, id]);

	useEffect(() => {
		if (userID && !chatUsers?.length) {
			dispatch(getChatsBackAction(userID));
		}
	}, [userID]);

	const handleRedirectChatUser = () => {
		if (
			!chatUsers.some((user) => user?._id === id) &&
			!chatPrevent.some((user) => user?._id === id)
		) {
			dispatch(
				addChatBackAction({
					avatar: userInformation?.avatar,
					firstName: userInformation?.firstName,
					lastName: userInformation?.lastName,
					_id: userInformation?._id,
				})
			);
		}
		navigate(`/message/chat/${userInformation?._id}`);
	};

	const handleSendRequestFriend = () => {
		dispatch(sendRequestFriendAction({ UserA: userID, UserB: id }));
		setStatusFriend('Enviada');
	};
	const handleConfirmedReuqestFriend = () => {
		dispatch(
			confirmedRequestFriendAction({ UserA: userID, UserB: id, resp: true })
		);
		setStatusFriend('Amigos');
	};
	const handleRejectReuqestFriend = () => {
		dispatch(
			confirmedRequestFriendAction({
				UserA: userID,
				UserB: id,
				resp: false,
			})
		);
		setStatusFriend('Seguir');
	};

	const handleCloseModals = () => {
		if (show) setShow(false);
		if (showEditProfile) setShowEditProfile(false);
	};
	console.log(showEditProfile);
	return (
		<section
			className="rounded-lg text-white flex xl:flex-row flex-col gap-2 justify-center w-full xl:h-aboutSection h-fit xl:overflow-visible"
		>
			<div className="relative bg-white rounded-lg xl:w-2/5 w-full h-full py-1 flex flex-col gap-3 bg-gray900">
				<div className="flex items-center  ml-2 mt-custom2 justify-center z-0">
					<div className="flex gap-2 items-center">
						<h1 className="text-2xl font-black">
							{userInformation?.firstName} {userInformation?.lastName}
						</h1>
						{userInformation?.gender === 'male' ? (
							<i className="bi bi-gender-male text-blue-500"></i>
						) : (
							<i className="bi bi-gender-female text-pink-500"></i>
						)}
					</div>
				</div>
				<div className="w-full px-5 flex justify-between absolute top-2">
					{userInformation._id !== userID && (
						<div className="flex text-yellow gap-1 items-center  ">
							{statusFriend === 'Seguir' && (
								<>
									<DropDownSelect
										status={statusFriend}
										icon="bi-person-fill-add"
										select={[
											{
												text: 'Send friend request',
												icon: 'bi-plus',
												handleActionFriend: handleSendRequestFriend,
											},
										]}
									/>
								</>
							)}
							{statusFriend === 'Enviada' && (
								<>
									<DropDownSelect
										status={statusFriend}
										icon="bi-person-fill-exclamation"
										select={[
											{
												text: 'Cancel request',
												icon: 'bi-check',
												handleActionFriend: handleRejectReuqestFriend,
											},
										]}
									/>
								</>
							)}
							{statusFriend === 'Recibido' && (
								<>
									<DropDownSelect
										status={statusFriend}
										icon="bi-people-fill"
										select={[
											{
												text: 'Accept',
												icon: 'bi-check',
												handleActionFriend: handleConfirmedReuqestFriend,
											},
											{
												text: 'Reject',
												icon: 'bi-x',
												handleActionFriend: handleRejectReuqestFriend,
											},
										]}
									/>
								</>
							)}
							{statusFriend === 'Amigos' && (
								<DropDownSelect
									status={statusFriend}
									icon="bi-people-fill"
									select={[
										{
											text: 'Delete friend',
											icon: 'bi-trash3-fill',
											handleActionFriend: handleRejectReuqestFriend,
										},
									]}
								/>
							)}
						</div>
					)}
					{userInformation._id !== userID && (
						<div className="flex gap-8 items-center">
							<i
								onClick={handleRedirectChatUser}
								className="bi bi-chat-dots-fill text-yellow text-2xl"
								title="Send message"
							></i>
						</div>
					)}
				</div>
				{userInformation._id === userID && (
					<div className="absolute z-50 top-4 right-4">
						<i
							className="bi bi-gear-fill text-xl text-yellow"
							onClick={() => setShowEditProfile(!showEditProfile)}
						></i>
					</div>
				)}
				<div className="w-full lg:h-custom3">
					<FavoriteActivities id={id} />
				</div>
				<div className="flex xl:absolute xl:bottom-0 w-full justify-around  divide-x border-t mt-1">
					<div className="flex w-full justify-around items-center gap-3 py-2">
						<div
							onClick={setShow}
							className="flex flex-col justify-center items-center w-full gap-2 text-lg hover:cursor-pointer hover:scale-110"
						>
							<span className=" font-black">{friendsAvatars.length}</span>
							<span className="">Friends</span>
						</div>
						<div className="w-full flex justify-center px-2">
							{friendsAvatars.length !== 0 ? (
								<AvatarStack
									avatars={friendsAvatars}
									openModalFriends={setShow}
									show={show}
								/>
							) : (
								<span className="text-md">No friends</span>
							)}
						</div>
					</div>
					<div className="flex w-full justify-around items-center gap-3 py-2">
						<div
							onClick={setShow}
							className="flex flex-col justify-center items-center w-full gap-2 text-lg hover:cursor-pointer hover:scale-110"
						>
							<span className=" font-black">{friendsAvatars.length}</span>
							<span className="">Matchs</span>
						</div>
						<div className="w-full flex justify-center px-2">
							{friendsAvatars.length !== 0 ? (
								<AvatarStack
									avatars={friendsAvatars}
									openModalFriends={setShow}
									show={show}
								/>
							) : (
								<span className="text-md">No Matchs</span>
							)}
						</div>
					</div>

					<ModalFriends
						setShow={setShow}
						show={show}
						friends={friendsAvatars}
					/>
				</div>
			</div>
			<div className=" rounded-lg xl:w-3/5 w-full bg-gray900 text-white">
				<OverYou profileId={userInformation._id} />
			</div>
			<Transition
				appear
				show={showEditProfile}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<ModalEditProfile show={showEditProfile} setShow={setShowEditProfile} />
			</Transition>
		</section>
	);
}

export default AboutProfile;
