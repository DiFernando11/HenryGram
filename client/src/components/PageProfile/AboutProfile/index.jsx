import { Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import {
	addChatBackAction,
	confirmedRequestFriendAction,
	getChatsBackAction,
	sendRequestFriendAction,
	getFriendsAvatarAndName
} from '../../../redux/actions'
import DropDownSelect from '../../DropDownSelect'
import AvatarStack from '../../PageChats/AvatarStack'
import FavoriteActivities from '../FavoriteActivities'
import ModalEditProfile from '../ModalEditProfile'
import ModalFriends from '../ModalFriends'
import OverYou from '../OverYou'
import axios from 'axios'

function AboutProfile({ userInformation }) {

	//useInformation: Profile information
	const dispatch = useDispatch()
	const [statusFriend, setStatusFriend] = useState('seguir')
	const [show, setShow] = useState(false)
	const [showEditProfile, setShowEditProfile] = useState(false)
	const chatUsers = useSelector((state) => state.chatUsers)
	const chatPrevent = useSelector((state) => state.chatPrevent)
	const friendsByUser = useSelector((state) => state.friendsByUser)
	const userID = useSelector((state) => state.userInformation?._id)
	const navigate = useNavigate()
	const { id } = useParams()
	const applicationStatus = friendsByUser.find(
		(friend) => friend.recipient == id || friend.requester == id
	)

	const [friendsAvatars, setFriendsAvatars] = useState([])
	
	useEffect(() => {
		const findFriends = async(id) =>{
			console.log('useEffect', id)
			await axios.get( `http://localhost:3000/api/users/nameAndAvatar/${id}` )
			.then( res => {
				console.log(res.data)
				setFriendsAvatars(res.data)
			})
		}
		findFriends(userInformation._id)
	}, [userInformation])

	const handleStatusFriend = () => {
		if (applicationStatus) {
			if (Number(applicationStatus.status) === 1) setStatusFriend('Enviada')
			else if (Number(applicationStatus.status) === 2)
				setStatusFriend('Recibido')
			else if (Number(applicationStatus.status) === 3)
				setStatusFriend('Amigos')
		} else setStatusFriend('Seguir')
	}


	useEffect(() => {
		handleStatusFriend()
	}, [friendsByUser, id])

	useEffect(() => {
		if (userID && !chatUsers?.length) {
			dispatch(getChatsBackAction(userID))
		}
	}, [userID])

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
			)
		}
		navigate(`/message/chat/${userInformation?._id}`)
	}

	const handleSendRequestFriend = () => {
		dispatch(sendRequestFriendAction({ UserA: userID, UserB: id }))
		setStatusFriend('Enviada')
	}
	const handleConfirmedReuqestFriend = () => {
		dispatch(
			confirmedRequestFriendAction({ UserA: userID, UserB: id, resp: true })
		)
		setStatusFriend('Amigos')
	}
	const handleRejectReuqestFriend = () => {
		dispatch(
			confirmedRequestFriendAction({
				UserA: userID,
				UserB: id,
				resp: false,
			})
		)
		setStatusFriend('Seguir')
	}

	const handleCloseModals = () => {
		if (show) setShow(false)
		if (showEditProfile) setShowEditProfile(false)
	}

	return (
		<section className="xl:w-2/5 border-r  border-zinc-700 p-4  xl:h-[calc(100vh-9rem)] xl:overflow-y-scroll" onClick={ handleCloseModals }>
			<div className="flex items-center mb-8 ml-2 justify-between ">
				<div className="flex gap-2 items-center">
					<h1 className="text-white text-2xl font-black">
						{userInformation?.firstName} {userInformation?.lastName}
					</h1>
					{userInformation?.gender === 'male' ? (
						<i className="bi bi-gender-male text-blue-500"></i>
					) : (
						<i className="bi bi-gender-female text-pink-500"></i>
					)}
				</div>
				<div className='fit flex justify-between gap-6'>
					{(userInformation._id !== userID)&& (
						<div className="flex gap-8 items-center">
							<i
								onClick={handleRedirectChatUser}
								className="bi bi-chat-dots-fill text-yellow text-2xl"
								title="Send message"
							></i>
						</div>
					)}
					{(userInformation._id !== userID)&& (
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
					{(userInformation._id === userID) && (
						<>
							<i
								className="bi bi-gear-fill text-xl text-yellow"
								onClick={() => setShowEditProfile(!showEditProfile)}
							></i>
						</>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<div className='flex w-fit justify center items-center flex-col gap-3'>
					<span className="text-md hover:cursor-pointer hover:scale-125" onClick={setShow}>Friends</span>
					{
						(friendsAvatars.length !== 0) ?( <AvatarStack avatars={friendsAvatars} openModalFriends={setShow} show={show}/>)
						: (<span className="text-md">No friends</span>)
					}

				</div>
				<div className='flex w-fit justify center items-center flex-col gap-3'>
					<span className="text-md" >Matchs</span>

					{
						(friendsAvatars.length !== 0) ?( <AvatarStack avatars={friendsAvatars} openModalFriends={setShow} show={show}/>)
						: (<span className="text-md">No matchs</span>)
					}
				</div>

				<ModalFriends setShow={setShow} show={show} friends = { friendsAvatars } />
			</div>
			<div>
				<h2 className="text-white text-center text-xl  mt-5 mb-3">About Me</h2>
				<OverYou profileId={ userInformation._id } />
				<h4 className="text-white text-center text-xl  mt-5 mb-4">Preferences</h4>
				<FavoriteActivities />
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
	)
}

export default AboutProfile
