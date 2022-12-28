import { Button, Modal } from "flowbite-react";
import React from "react";
import CardFriends from "../../PageHome/CardFriends";

function ModalFriends({ show, setShow, friends }) {
  return (
    <React.Fragment>
      <Modal show={show} onClose={() => setShow(!show)} size="md">
        <Modal.Header className="bg-black text-white">Friends</Modal.Header>
        <Modal.Body className="bg-black">
          <div className="calcViewModalFriends">
            {friends.map((friend, index) => (
              <CardFriends key={index} friend = { friend }/>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default ModalFriends;
