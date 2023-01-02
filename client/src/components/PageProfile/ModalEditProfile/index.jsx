import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Transition } from '@headlessui/react';
import { editProfileAction, refreshUpdateProfile } from '../../../redux/actions/index';

function ModalEditProfile({ show, setShow }) {

	const dispatch = useDispatch();
	const user = useSelector((state) => state.userInformation);
	
	const [edit, setEdit] = useState({
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		gender: user.gender,
	});
	const handleChangeUpdateInformation = (e) => {
		setEdit({ ...edit, [e.target.name]: e.target.value });
	};
	const handleChangeGenderUpdate = (update) => {
		setEdit({ ...edit, gender: update });
	};

	const handleUpdateInformation = () => {
		dispatch(editProfileAction(edit));
		setShow(!show);
		setTimeout(() => dispatch(refreshUpdateProfile()), 500);
	};

	return (
		<React.Fragment>
			<Transition
				appear
				show={show}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Modal
					show={show}
					size="lg"
					popup={true}
					onClose={() => setShow(!show)}
					className="bg-black"
				>
					<div className="bg-black">
						<Transition.Child
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Modal.Header className="bg-black text-white" />
						</Transition.Child>
						<Transition.Child
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Modal.Body className="bg-black">
								<div className="px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
									<h3 className="text-xl font-medium text-white mb-10 ">
										Edit Profile 📝
									</h3>
									<div className="flex gap-2">
										<div>
											<div className="mb-2 block text-white ">
												<Label htmlFor="name" value="Name" />
											</div>
											<div className="flex items-center gap-2 text-yellow">
												<input
													type="text"
													name="firstName"
													className="w-full rounded-md bg-zinc-800 text-white"
													value={edit.firstName}
													onChange={handleChangeUpdateInformation}
												/>
												<i className="bi bi-pencil-fill"></i>
											</div>
										</div>

										<div>
											<div className="mb-2 block text-white">
												<Label htmlFor="lastName" value="LastName" />
											</div>
											<div className="flex items-center gap-2 text-yellow">
												<input
													id="password"
													type="text"
													name="lastName"
													required={true}
													className="w-full rounded-md bg-zinc-800 text-white"
													value={edit.lastName}
													onChange={handleChangeUpdateInformation}
												/>
												<i className="bi bi-pencil-fill"></i>
											</div>
										</div>

										<div>
											<div className="mb-2 block text-white text-center mr-5">
												<Label htmlFor="gender" value="Gender" />
											</div>
											<div className="flex rounded-md shadow-sm items-center">
												<button
													type="button"
													className={`inline-flex ${
														edit.gender === 'male'
															? 'bg-yellow'
															: 'bg-transparent hover:bg-yellower'
													}  items-center py-2 px-4 text-sm font-medium text-gray-900 rounded-l-md border border-gray-200 `}
													name={'gender'}
													value={edit.gender}
													onClick={() => handleChangeGenderUpdate('male')}
												>
													<i className="bi bi-gender-male text-sky-500"></i>
												</button>

												<button
													type="button"
													className={`inline-flex ${
														edit.gender === 'female'
															? 'bg-yellow'
															: 'bg-transparent hover:bg-yellower'
													}  items-center py-2 px-4 text-sm font-medium text-gray-900 rounded-r-md border border-gray-200 `}
													onClick={() => handleChangeGenderUpdate('female')}
												>
													<i className="bi bi-gender-female text-pink-500 font-bold"></i>
												</button>
												<i className="bi bi-pencil-fill text-yellow ml-2"></i>
											</div>
										</div>
									</div>
									<span className="block text-[10px] mt-10 ml-5 cursor-pointer ">
										CHANGE PASSWORD ?
									</span>

									{/* <div>
              <div className="mb-2 block text-white">
                <Label htmlFor="Password" value="Password" />
              </div>
              <div className="flex items-center gap-2 text-yellow">
                <input
                  id="password"
                  type="text"
                  required={true}
                  value={edit.sex}
                  className="w-full rounded-md bg-zinc-800 text-white"
                />
                <i className="bi bi-pencil-fill"></i>
              </div>
            </div>
             */}
									{/* <div>
              <div className="mb-2 block text-white">
                <Label
                  htmlFor="confirmedPassword"
                  value="Confirmed p assword"
                />
              </div>

              <input
                id="confirmedPassword"
                type="text"
                required={true}
                value={edit.sex}
                className="w-full rounded-md bg-zinc-800 text-white"
              />
            </div> */}

									<div className="w-full">
										<Button
											type="submit"
											onClick={handleUpdateInformation}
										>Update Information</Button>
									</div>
								</div>
							</Modal.Body>
						</Transition.Child>
					</div>
				</Modal>
			</Transition>
		</React.Fragment>
	);
}

export default ModalEditProfile;
