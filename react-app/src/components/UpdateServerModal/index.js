
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteServer,
    getAllCurrentUserServers,
    updateServer
} from "../../store/servers";

const UpdateServerForm = ({ setUpdateShowModal, server }) => {
    const [name, setName] = useState(server.name);
    const [description, setDescription] = useState(server.Server_description);
    const [preview_image, setPreview_image] = useState(server.preview_image);
    const [isDM] = useState(false);
    const [privateServer, setPrivateServer] = useState(false)
    const [error, setError] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        let errors = [];
        if (!name) errors.push("You must give your server a name");
        setError(errors);
    }, [name]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newServer = {
            id: server.id,
            name,
            preview_image,
            server_description: description,
            privateServer,
            is_DM: isDM
        };
        await dispatch(updateServer(newServer))
        dispatch(getAllCurrentUserServers())
        setUpdateShowModal(false)
    }

    const delServer = async (e) => {
        e.preventDefault();
        await dispatch(deleteServer(server))
        dispatch(getAllCurrentUserServers())
        setUpdateShowModal(false)
    }


    return (
        <div className='modal'>
            {error &&
                error.map((error) => {
                    return (
                        <li id="errors" key={error}>
                            {error}
                        </li>
                    );
                })}
            <form className='new-server-modal-form' onSubmit={handleSubmit}>
                <div className='modal-title'>Update your Server</div>
                <div className="modal-input-form">
                    <input
                        className="modal-input-textbox"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Server name"
                        name="name"
                        required
                    />
                    <input
                        className="modal-input-textbox"
                        type="text"
                        onChange={(e) => setPreview_image(e.target.value)}
                        value={preview_image}
                        placeholder="Choose your server image url"
                        name="image"
                        required
                    />
                    <textarea
                        id="modal-input-textarea"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Please describe your server topics"
                        name="description"
                        required
                    ></textarea>

                    <div id='checkmark-container'>

                        <label id="checkmark-label">Private Server
                        </label>
                        <input
                            id='checkmark-box'
                            type='checkbox'
                            onChange={(e) => setPrivateServer(e.target.value)}
                            value={privateServer}
                            checked={privateServer || null}
                        />
                    </div>
                </div>
                <button id='create-channel-channel-btn' type="submit" disabled={!!error.length}>
                    Update
                </button>

                <button id='create-channel-channel-btn' onClick={delServer} disabled={!!error.length}>Delete</button>
            </form>
        </div>
    );
}


export default UpdateServerForm;
