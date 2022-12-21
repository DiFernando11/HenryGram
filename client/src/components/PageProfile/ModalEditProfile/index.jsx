import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";

function ModalEditProfile({ show, setShow }) {
  const [edit, setEdit] = useState({
    name: "Diego",
    lastName: "Apolo",
    sex: "female",
  });
  const handleChangeUpdateInformation = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };
  const handleChangeSexUpdate = (update) => {
    setEdit({ ...edit, sex: update });
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        size="lg"
        popup={true}
        onClose={() => setShow(!show)}
        className="bg-black"
      >
        <Modal.Header className="bg-black" />
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
                    name="name"
                    className="w-full rounded-md bg-zinc-800 text-white"
                    value={edit.name}
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
                    <Label htmlFor="Sex" value="Sex" />
                  </div>
                  <div className="flex rounded-md shadow-sm items-center">
                    <button
                      type="button"
                      className={`inline-flex ${
                        edit.sex === "male"
                          ? "bg-amber-300 text-base font-semibold"
                          : "bg-transparent text-sm font-medium"
                      }  items-center py-2 px-4  rounded-l-lg border border-gray-200`}
                      name={"sex"}
                      value={edit.sex}
                      onClick={() => handleChangeSexUpdate("male")}
                    >
                      <i className="bi bi-gender-male text-sky-500"></i>
                    </button>

                    <button
                      type="button"
                      className={`inline-flex ${
                        edit.sex === "female"
                          ? "bg-amber-300 text-base font-semibold"
                          : "bg-transparent text-sm font-medium"
                      }  items-center py-2 px-4 text-sm font-medium text-gray-900  rounded-r-md border border-gray-200 `}
                      onClick={() => handleChangeSexUpdate("female")}
                    >
                      <i className="bi bi-gender-female text-pink-500"></i>
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
              <Button>Update Information</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default ModalEditProfile;
