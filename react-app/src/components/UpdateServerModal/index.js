
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
    const [error, setError] = useState({});
    const [renderErr, setRenderErr] = useState(false);
    const dispatch = useDispatch();

    const urlValidation = (str) => {
      return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    };

    useEffect(() => {
      let errors = {};
    if (!name) errors.nameError = 'You must give your server a name'
    
    else errors.nameError = ''
    if (!preview_image.length) errors.preview_imageError = 'You must provide image url'
    else if (!preview_image.length && urlValidation)
    errors.preview_imageError = 'You must provide a valid url link to an image'
    else errors.preview_imageError = ''
   
    setError(errors);
  }, [name,preview_image,description]);
   


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
       const data = await dispatch(updateServer(newServer))
       if (data.errors) {setError(data.errors)}
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

        <form onSubmit={handleSubmit}>
          {renderErr && error.nameError ? (
            <label className="text renderError" htmlFor="email">
              NAME: {error.nameError}
            </label>
          ) : (
            <label className="text noRenderError" htmlFor="name">
              Name
            </label>
          )}
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Server name"
            name="name"
          />

          {renderErr && error.preview_imageError ? (
            <label className="text renderError" htmlFor="email">
              SERVER IMAGE: {error.preview_imageError}
            </label>
          ) : (
            <label className="text noRenderError" htmlFor="img">
              Image
            </label>
          )}
          <input
            id="update-name"
            type="text"
            onChange={(e) => setPreview_image(e.target.value)}
            value={preview_image}
            placeholder="Choose your server image url"
            name="image"
          />
          <textarea
            id="update-text-area"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Please describe your server topics"
            name="description"
          ></textarea>

          <div id="server-conteiner">
            <label id="private-radio">
              <input
                id="checkmark-box"
                type="checkbox"
                onChange={(e) => setPrivateServer(e.target.value)}
                value={privateServer}
                checked={privateServer || null}
                name="boolean"
              />{" "}
              Private Server
            </label>
          </div>
          <div className="errors-div">
            {!!error.length && <div id="errors">{error[0]}</div>}
          </div>
          <button id="new-server-btn" type="submit"  disabled={!!error.nameError && !!error.preview_image && !!error[0]}>
            Update
          </button>
          <button
            id="new-server-btn-dlt"
            onClick={delServer}
           
          >
            Delete
          </button>
        </form>
      </div>
    );
}


export default UpdateServerForm;
