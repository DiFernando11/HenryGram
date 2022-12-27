import { Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import {
	addChatBackAction,
	confirmedRequestFriendAction,
	getChatsBackAction,
	sendRequestFriendAction,
} from '../../../redux/actions'
import DropDownSelect from '../../DropDownSelect'
import AvatarStack from '../../PageChats/AvatarStack'
import FavoriteActivities from '../FavoriteActivities'
import ModalEditProfile from '../ModalEditProfile'
import ModalFriends from '../ModalFriends'
import OverYou from '../OverYou'

function AboutProfile({ userInformation, isFriend }) {

	//useInformation: Profile information
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


	const handleStatusFriend = () => {
		if (applicationStatus) {
			if (Number(applicationStatus.status) === 1) setStatusFriend('Enviada')
			else if (Number(applicationStatus.status) === 2)
				setStatusFriend('Recibido')
			else if (Number(applicationStatus.status) === 3)
				setStatusFriend('Amigos')
		} else setStatusFriend('Seguir')
	}

	const dispatch = useDispatch()
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

	return (
		<section className="xl:w-2/5 border-r  border-zinc-700 p-4  xl:h-[calc(100vh-9rem)] xl:overflow-y-scroll">
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

			<div className="flex justify-between mb-3">
				<span className="text-sm">Friends</span>
				<span className="text-sm">Matchs</span>
			</div>
			<div className="flex justify-between ">
				<AvatarStack avatars={avatars} openModalFriends={setShow} show={show} />
				<AvatarStack avatars={avatars} />
				<ModalFriends setShow={setShow} show={show} />
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
const avatars = [
	'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]

export default AboutProfile
