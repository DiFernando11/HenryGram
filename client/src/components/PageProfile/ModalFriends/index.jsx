import { Button, Modal } from "flowbite-react";
import React from "react";
import CardFriends from "../../PageHome/CardFriends";

function ModalFriends({ show, setShow }) {
  return (
    <React.Fragment>
      <Modal show={show} onClose={() => setShow(!show)}  size="md">
        <Modal.Header className="bg-black text-white">Friends</Modal.Header>
        <Modal.Body  className="bg-black">
          <div className="calcViewModalFriends">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(() => <CardFriends/>)}
          </div>
        </Modal.Body>
    
      </Modal>
    </React.Fragment>
  );
}

export default ModalFriends;
