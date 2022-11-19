import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createServer, getAllCurrentUserServers } from '../../store/servers';
import '../../context/Modal.css';

const CreateServerForm = ({ setShowModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview_image, setPreview_image] = useState('');
  const [isDM] = useState(false);
  const [privateServer, setPrivateServer] = useState();
  const [error, setError] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(createServer());
  // }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (!name) errors.push('You must give your server a name');
    setError(errors);
  }, [name]);

  const handleSubmit = async (e) => {
    // let errors = [];
    e.preventDefault();
    const newServer = {
      name,
      preview_image,
      server_description: description,
      privateServer,
      isDM,
    };
    dispatch(createServer(newServer));
    setShowModal(false);
  };

  // const reset = () => {
  //   setName("");
  //   setDescription("");
  //   setPreview_image("");
  //   setPrivateServer("");
  //   setIsDM(false);
  // };

  return (
    <div className='modal'>
      {error &&
        error.map((error) => {
          return (
            <li id='errors' key={error}>
              {error}
            </li>
          );
        })}

      <form className='new-server-modal-form' onSubmit={handleSubmit}>
        <div className='modal-title'>Your New Server</div>
        <div className="modal-input-form">
          <label className="modal-input-label">SERVER NAME</label>
          <input
            type='text'
            className="modal-input-textbox"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='Server name'
            name='name'
            required
          />
          <label className="modal-input-label"> ADD AN IMAGE</label>
          <input
            type='text'
            className="modal-input-textbox"
            onChange={(e) => setPreview_image(e.target.value)}
            value={preview_image}
            placeholder='Choose your server image url'
            name='image'
            required
          />
          <textarea
            id="modal-input-textarea"
            type='text'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder='Please describe your server topics'
            name='description'
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

        <button id='create-channel-channel-btn' type='submit' disabled={!!error.length}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateServerForm;
