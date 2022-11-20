import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createServer, getAllCurrentUserServers } from '../../store/servers';
import '../../context/Modal.css';

const CreateServerForm = ({ setShowModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview_image, setPreview_image] = useState('');
  const [isDM] = useState(false);
  const [privateServer, setPrivateServer] = useState();
  const [error, setError] = useState({});
  const [renderErr, setRenderErr] = useState(false)
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
    // let errors = [];
    e.preventDefault();
    setRenderErr(true)
    const newServer = {
      name,
      preview_image,
      server_description: description,
      privateServer,
      isDM,
    };
    const data = await dispatch(createServer(newServer));
      if (data.errors) {
      setError(data.errors);
    } else { setShowModal(false); }
  };


  return (
    <div className="modal">
      <form className="new-server-modal-form" onSubmit={handleSubmit}>
        <div className="modal-title">Your New Server</div>
        <div className="modal-input-form">
          <label className="modal-input-label">SERVER NAME</label>
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
            className="modal-input-textbox"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={"Server name"}
            name="name"
            
          />
          <div>
            <label className="modal-input-label"> ADD AN IMAGE</label>
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
              type="text"
              className="modal-input-textbox"
              onChange={(e) => setPreview_image(e.target.value)}
              value={preview_image}
              placeholder="Choose your server image url"
              name="image"
              
            />

            <textarea
              id="modal-input-textarea"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Please describe your server topics"
              name="description"
              
            ></textarea>

            <div id="checkmark-container">
              <label id="checkmark-label">Private Server</label>
              <input
                id="checkmark-box"
                type="checkbox"
                onChange={(e) => setPrivateServer(e.target.value)}
                value={privateServer}
                checked={privateServer || null}
              />
            </div>
          </div>
          <div className="errors-div">
            {!!error.length && <div id="errors">{error[0]}</div>}
          </div>
          <button
            id="create-channel-channel-btn"
            disabled={!!error.nameError && !!error.preview_image && !!error[0]}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServerForm;
