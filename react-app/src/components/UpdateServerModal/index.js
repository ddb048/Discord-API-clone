
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    createServer,
    deleteServer,
    getAllCurrentUserServers,
    updateServer
} from "../../store/servers";
// import './server-form.css'

const UpdateServerForm = ({ setUpdateShowModal, server }) => {
    const [name, setName] = useState(server.name);
    const [description, setDescription] = useState(server.Server_description);
    const [preview_image, setPreview_image] = useState(server.preview_image);
    const [isDM] = useState(false);
    const [privateServer, setPrivateServer] = useState(false)
    const [error, setError] = useState([]);
    const dispatch = useDispatch();


    console.log('server in update modal', server)
    useEffect(() => {
        dispatch(createServer());
    }, [dispatch]);

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
        <div id="form" className="inputBox">
            <h1>Update Server</h1>
            {error &&
                error.map((error) => {
                    return (
                        <li id="errors" key={error}>
                            {error}
                        </li>
                    );
                })}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Server name"
                    name="name"
                    required
                />
                <input
                    type="text"
                    onChange={(e) => setPreview_image(e.target.value)}
                    value={preview_image}
                    placeholder="Choose your server image url"
                    name="image"
                    required
                />
                <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Please describe your server topics"
                    name="description"
                    required
                ></textarea>

                <div id="server-conteiner">
                    <label>
                        <input
                            type='radio'
                            onChange={(e) => setPrivateServer(e.target.value)}
                            value={privateServer}
                            checked={privateServer === true ? true : false}
                            name='boolean' /> Private Server
                    </label>

                </div>

                <button id="new-server-btn" type="submit" disabled={!!error.length}>
                    Update
                </button>
                <button id="new-server-btn" onClick={delServer} disabled={!!error.length}>Delete</button>
            </form>
        </div>
    );
}


export default UpdateServerForm;
