import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../../store/servers";
import './server-form.css'

const CreateServerForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isDM, setIsDM] = useState(false);
  const [privateServer, setPrivateServer] = useState()
  const [error, setError] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createServer());
  }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (!name) errors.push("You must give your server a name");
    setError(errors);
  }, [name]);

  
  const handleSubmit = async (e) => {
    let errors = [];
    e.preventDefault();
    const newServer = {
      name,
      previewImage,
      description,
      privateServer,
      isDM
      };
      return;
    }

  const reset = () => {
    setName("");
    setDescription("");
    setPreviewImage("");
    setPrivateServer("");
    setIsDM(false);
  };

  return (
    <div id="form" className="inputBox">
      <h1>Your New Server</h1>
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
          onChange={(e) => setPreviewImage(e.target.value)}
          value={previewImage}
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
            onChange={(e)=>setIsDM(e.target.value)} 
            value={isDM} 
            checked={isDM === true?true:false} 
            name='boolean' /> True
            </label>
            <label>
            <input 
            type='radio' 
            onChange={(e)=>setIsDM(e.target.value)} 
            value={isDM} 
            checked={isDM === false?false:true} 
            name='boolean' /> False
            </label>
        </div>

        <div id="server-conteiner">
          <label>
            <input 
            type='radio' 
            onChange={(e)=>setPrivateServer(e.target.value)} 
            value={privateServer} 
            checked={privateServer === true?true:false} 
            name='boolean' /> True
            </label>
            <label>
            <input 
            type='radio' 
            onChange={(e)=>setPrivateServer(e.target.value)} 
            value={privateServer} 
            checked={privateServer === false?false:true} 
            name='boolean' /> False
            </label>
        </div>
       
        <button id="new-server-btn" type="submit" disabled={!!error.length}>
          Submit
        </button>
      </form>
    </div>
  );}


export default CreateServerForm;
