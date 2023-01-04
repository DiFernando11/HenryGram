import React, { useState } from 'react';
import ActionsPosts from '../ActionsPost';
import { useDispatch, useSelector } from 'react-redux';
import { invitationSendGroupAction } from '../../../redux/actions';
import Swal from 'sweetalert2';
import logoMatch from '../../../assets/coheteHenry.png';
function CardRecommendedMatch({ id, image, name }) {
	const dispatch = useDispatch();
	const [responseFront, setResponseFront] = useState('');
	const userInformation = useSelector((state) => state.userInformation);

	const handleSendInvitationGroup = () => {
		if (!responseFront.length) {
			dispatch(
				invitationSendGroupAction({
					groupId: id,
					userId: userInformation?._id,
				})
			).then((res) => {
				handleAlertInvitationGroup(res.payload.msg);
				setResponseFront(res.payload.msg);
			});
		} else {
			handleAlertInvitationGroup(responseFront);
		}
	};
	const handleAlertInvitationGroup = (title) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			iconColor: 'white',
			// showClass: {
			//   popup: "animate__animated animate__fadeInDown",
			// },
			// hideClass: {
			//   popup: "animate__animated animate__fadeOutUp",
			// },
			// customClass: {
			//   popup: styles.coloredSuccede,
			//   title: styles.titles,
			// },
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		});
		Toast.fire({
			icon: 'success',
			title,
		});
	};
	return (
		<div className="flex items-center gap-10 text-white w-full">
			<img src={image} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
			<h1>{name}</h1>
			<img
				onClick={handleSendInvitationGroup}
				src={logoMatch}
				alt="match"
				className={`w-8 h-8 cursor-pointer justify-self-stretch`} 
			/>
		</div>
	);
}

export default CardRecommendedMatch;
