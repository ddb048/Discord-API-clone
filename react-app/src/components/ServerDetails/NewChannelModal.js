import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/channel';
import { getServerDetails } from '../../store/servers';
import '../../context/Modal.css';
const ChannelModal = ({ serverId, setShowModal }) => {
	serverId = +serverId;

	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [is_voice] = useState(false);
	const [description, setDescription] = useState('');
	const [error, setError] = useState({});
	const [renderErr, setRenderErr] = useState(false)

	// const [frontEndErrors, setFrontEndErrors] = useState([]);
	const [changeColor, setChangeColor] = useState('dark-create-channel-btn');

	useEffect(() => {
		let errors = {};
		if (name) {
			setChangeColor('light-create-channel-btn');
		} else {
			setChangeColor('dark-create-channel-btn');
		}


		if (!name) {
			errors.nameError = 'Please provide a channel name less than 10 characters';
			setError(errors);
		} else if (name.length >10){
			errors.nameError = 'Channel name must be at most 10 characters'
			setError(errors);
		}
	}, [name]);
// console.log('errrors', error)
	const submitNewChannel = async (e) => {
		e.preventDefault();
    setRenderErr(true)

		const newChannel = {
			name,
			is_voice,
			description,
		};

		const data = await dispatch(createChannel(serverId, newChannel))

		if (data.errors) {
			setError(data.errors);

		} else {
			dispatch(getServerDetails(serverId))
			setShowModal(false);
		}

	}

	return (
		<div className="form-container">
			<div className='form-card'>
				<form id="form" onSubmit={submitNewChannel}>

					<div className="text">
						<h2>Create New Channel</h2>
					</div>

					<div className="errors-div">
						{!!error.length && <div id="errors">{error[0]}</div>}
					</div>

					<div>


						<label className="text noRenderError" htmlFor="name">
						Channel Name
              </label>

						<input
							className="inp"
							type="text"
							placeholder={"new-channel"}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

					</div>
					<div>

						<label className="text noRenderError" htmlFor="name">
						Description
              </label>
							
						<input
							className="inp"
							type="text"
							placeholder="channel-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="create-channel-submit-btn-container">
						<button className={changeColor}
						type="submit">
							Create Channel
						</button>
					</div>

				</form>
			</div >

		</div >
	);
};
export default ChannelModal;
