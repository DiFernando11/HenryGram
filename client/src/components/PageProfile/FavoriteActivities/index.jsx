import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileAction } from '../../../redux/actions/index';
import AddModal from './AddModal/AddModal';
import { Transition } from '@headlessui/react';
function FavoriteActivities({ id }) {
	const dispatch = useDispatch();

	const profileTechnologies = useSelector(
		(state) => state.userProfileFriend?.technologies
	);
	const profilePreferences = useSelector(
		(state) => state.userProfileFriend?.preferences
	);
	const userInformation = useSelector((state) => state.userInformation);

	const [show, setShow] = useState(false);

	const handleAdd = (technologies, preferences) => {
		const data = {
			technologies: technologies,
			preferences: preferences,
			id: id,
		};
		dispatch(editProfileAction(data));
	};

	return (
		<section className="p-2 relative h-full flex md:flex-row flex-col justify-between md:gap-10">
			<div className="flex flex-col justify-start w-full  gap-5 ">
				<h2 className=''>Tecnologías</h2>
				<div className="flex flex-wrap items-center justify-start gap-1">
					{profileTechnologies && profileTechnologies.length > 0 ? (
						profileTechnologies.map((technology) => {
							return (
								<div className=" bg-blueTw h-fit w-fit px-2 py-1 rounded-full flex flex-row items-center">
									<p className=" text-sm">{technology}</p>
								</div>
							);
						})
					) : (
						<div className="">
							<p>No hay tecnologías</p>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col justify-start w-full gap-5">
				<h2 className='md:mt-0 mt-2'>Actividades Favoritas</h2>
				<div className="flex flex-wrap items-center justify-start gap-1">
					{profilePreferences && profilePreferences.length > 0 ? (
						profilePreferences.map((preference) => {
							return (
								<div className=" bg-blueTw h-fit w-fit px-2 py-1 rounded-full flex flex-row items-center">
									<p className=" text-sm">{preference}</p>
								</div>
							);
						})
					) : (
						<div className="">
							<p>No hay Actividades</p>
						</div>
					)}
				</div>
			</div>

			{show ? (
				<Transition
					appear
					show={show}
					enter="ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<AddModal
						technologies={profileTechnologies}
						favourites={profilePreferences}
						show={setShow}
						add={handleAdd}
					/>
				</Transition>
			) : null}

			{userInformation?._id === id ? (
				<button
					onClick={() => setShow(true)}
					className="bg-gray700 transition-all duration:100 hover:scale-125 text-white rounded-full h-8 w-8 flex items-center justify-center absolute bottom-3 m-auto inset-x-0"
				>
					<p className="text-md">+</p>
				</button>
			) : null}
		</section>
	);
}

export default FavoriteActivities;
