import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/channel';
import { Modal } from '../../context/Modal';

const ChanelModal = ({ serverId, setShowModal }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [is_voice, setIs_voice] = useState(false);
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState([]);
	const [frontEndErrors, setFrontEndErrors] = useState([]);
	useEffect(() => {
		const errors = [];
		if (name.length > 32)
			errors.push('Please provide a channel name less than 32 characters.');
		setFrontEndErrors(errors);
	}, [name]);
	// NOTE need to add error validations
	const submitNewChannel = (e) => {
		e.preventDefault();
		setErrors([]);
		if (name.length > 32)
			errors.push('Please provide a channel name less than 32 characters.');
		setErrors(errors);

		const newChannel = {
			name,
			is_voice,
			description,
		};
		if (!frontEndErrors.length) {
			dispatch(createChannel(serverId, newChannel));
			setShowModal(false);
		}
	};
	return (
		<div className="modal">
			<form className="new-channel-modal-form" onSubmit={submitNewChannel}>
				<div>
					<label>Create New Channel</label>
				</div>
				<div>
					<label>
						Name
						<input
							type="text"
							placeholder="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</label>
					<div>
						<label>
							Description{' '}
							<textarea
								type="text"
								placeholder="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
					</div>
					<div>
						{' '}
						<button type="submit">Create Channel</button>
					</div>
				</div>
				<div className="channel-errors"></div>
			</form>
		</div>
	);
};
export default ChanelModal;
