import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

function CreateServerFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='create-server-button' onClick={() => setShowModal(true)}>Log In</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>Create Server Form</div>
                </Modal>
            )}
        </>
    );
}

export default CreateServerFormModal;
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
