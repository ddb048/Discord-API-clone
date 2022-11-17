import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateServerForm from "../CreateServerForm";

function CreateServerModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Submit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateServerForm />
        </Modal>
      )}
    </>
  );
}

export default CreateServerModal;
