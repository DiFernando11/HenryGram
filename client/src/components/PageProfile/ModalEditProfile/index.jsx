import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React from "react";

function ModalEditProfile({ show, setShow }) {
  return (
    <React.Fragment>
      <Modal
        show={show}
        size="md"
        popup={true}
        onClose={() => setShow(!show)}
        className="bg-black"
      >
        <Modal.Header className="bg-black" />
        <Modal.Body className="bg-black">
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-white ">Edit Profile</h3>
            <div>
              <div className="mb-2 block text-white ">
                <Label htmlFor="email" value="Your email" />
              </div>
              <input type="text" className="w-full" />
            </div>
            <div>
              <div className="mb-2 block text-white">
                <Label htmlFor="password" value="Your password" />
              </div>

              <input
                id="password"
                type="text"
                required={true}
                className="w-full"
              />
            </div>
            <div>
              <div className="mb-2 block text-white">
                <Label htmlFor="password" value="Your password" />
              </div>

              <input
                id="password"
                type="text"
                required={true}
                className="w-full"
              />
            </div>

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
