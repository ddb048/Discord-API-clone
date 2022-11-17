import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateServerForm from "../CreateServerForm";

function CreateServerModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="servers-photo" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus" aria-hidden="true" />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateServerForm />
                </Modal>
            )}
        </div>
    );
}

export default CreateServerModal;
