import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/channel';
import { getServerDetails } from '../../store/servers';
import '../../context/Modal.css';
const ChannelModal = ({ serverId, setShowModal }) => {
	serverId = +serverId;

	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const is_voice = false;
	const [description, setDescription] = useState('');
	const [error, setError] = useState({});
	// const [frontEndErrors, setFrontEndErrors] = useState([]);
	const [changeColor, setChangeColor] = useState('dark-create-channel-btn');

	useEffect(() => {
		let errors = {};
		if (name.length) {
			setChangeColor('light-create-channel-btn');
		} else {
			setChangeColor('dark-create-channel-btn');
		}
		// console.log('this is change color', changeColor);

		if (name.length > 32) {
			errors.nameError = 'Please provide a channel name less than 32 characters';
			setError(errors);
		}
	}, [name]);

	const submitNewChannel = async (e) => {
		e.preventDefault();

		const newChannel = {
			name,
			is_voice,
			description,
		};

		const data = await dispatch(createChannel(serverId, newChannel))

		if (data.errors) {
			setError(data.errors)
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


						<label className="text noRenderError">Channel Name</label>
						<input
							className="inp"
							type="text"
							placeholder="new-channel"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

					</div>
					<div>
						<label className="text noRenderError">Description</label>
						<input
							className="inp"
							type="text"
							placeholder="channel-description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="create-channel-submit-btn-container">
						<button className={changeColor} type="submit">
							Create Channel
						</button>
					</div>

				</form>
			</div >

		</div >
	);
};
export default ChannelModal;
