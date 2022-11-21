import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
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

  const servers = useSelector(state => state.servers.servers)


  const serversNames = Object.values(servers)

  const compName = serversNames.find(server => server.name === name)

  console.log("this is servers from createServerform", servers)

  useEffect(() => {
    let errors = {};
    if (!name) {
      errors.nameError = 'You must give your server a name';
    } else if (compName) {
      errors.nameError = 'Server with this name already exists'
    }

    else errors.nameError = ''
    if (!preview_image.length) errors.preview_imageError = 'You must provide image url'
    else if (!preview_image.length && urlValidation)
      errors.preview_imageError = 'You must provide a valid url link to an image'
    else errors.preview_imageError = ''

    setError(errors);
  }, [name, preview_image, description]);


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
    <>

      <div className="form-container">
        <div className="form-card">
          <form id="form" onSubmit={handleSubmit}>

            <div className="text">
              <h2>Your New Server</h2>
            </div>

            <div>
              {renderErr && error.nameError ?
                <label className="text renderError" htmlFor="name">
                  Server Name: {error.nameError}
                </label>
                :
                <label className="text noRenderError" htmlFor="name">
                  Server Name
                </label>
              }
              <input
                type="text"
                className="inp"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder={"Server name"}
                name="name"
              />
            </div>
            <div>
              <div>
                {renderErr && error.preview_imageError ?
                  <label className="text renderError" htmlFor="img">
                    Server Image: {error.preview_imageError}
                  </label>
                  :
                  <label className="text noRenderError" htmlFor="img">
                    Server Image
                  </label>
                }
              </div>
              <input
                type="text"
                className="inp"
                onChange={(e) => setPreview_image(e.target.value)}
                value={preview_image}
                placeholder="Choose your server image url"
                name="image"
              />
            </div>
            <div>
              <label className="text noRenderError" htmlFor="text">
                Server Topics
              </label>
              <input
                className="inp"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Please describe your server topics"
                name="description"
              ></input>
            </div>
            <div className='private-container'>

              <input
                id="inp"
                type="checkbox"
                onChange={(e) => setPrivateServer(e.target.value)}
                value={privateServer}
                checked={privateServer || null}
              />
              <label className='text noRenderError'>Check If Private</label>
            </div>

            <div className="errors-div">
              {!!error.length && <div id="errors">{error[0]}</div>}
            </div>
            <div >
              <button
                className='subButton'
                // id="create-channel-channel-btn"
                disabled={
                  !!error.nameError && !!error.preview_image && !!error[0]
                }
                type="submit"
              >
                Submit
              </button>
            </div>

          </form>
        </div >
      </div >
    </>
  );
};

export default CreateServerForm;
