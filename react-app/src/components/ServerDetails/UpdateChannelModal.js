import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateChannel, deleteChannel } from '../../store/channel';
import { getServerDetails } from '../../store/servers';
import '../../context/Modal.css';
import './UpdateChannelModal.css'

const UpdateChannelModal = ({ serverId, setUpdateModal, channelId }) => {
	serverId = +serverId;
	console.log('channel id ', channelId)

	const dispatch = useDispatch();
	const [name, setName] = useState('');

	const is_voice = false
	const [description, setDescription] = useState('');
	const [error, setError] = useState({});
	const [frontEndErrors, setFrontEndErrors] = useState([]);
	const [changeColor, setChangeColor] = useState('dark-create-channel-btn');
	const [showConfirmButton, setShowConfirmButton] = useState(false)

	const confirmDelete = (confirm) => {
		setShowConfirmButton(confirm)
	}
	useEffect(() => {
		const errors = {};
		if (name.length) {
			setChangeColor('light-create-channel-btn');
		} else {
			setChangeColor('dark-create-channel-btn');
		}


		if (name.length > 32) {
			errors.nameError = 'Please provide a channel name less than 32 characters';
			setError(errors);
		}
	}, [name]);

	const submitUpdatedChannel = async (e) => {
		e.preventDefault();


		const updateChannelForm = {
			name,
			is_voice,
			description,
		};

		const data = await dispatch(updateChannel(channelId, updateChannelForm))

		if (data.errors) {
			setError(data.errors);

		} else {
			dispatch(getServerDetails(serverId))
			setUpdateModal(false);
		}

	};

	const handleDeleteChannel = (e) => {
		e.preventDefault();

		dispatch(deleteChannel(channelId))
		dispatch(getServerDetails(serverId))
		setUpdateModal(false);

	}

	return (
		<div className="modal">

			<form className="new-channel-modal-form" onSubmit={submitUpdatedChannel}>
				<div className="modal-title">Update Channel</div>
				<div className="modal-input-form">
					<label className="modal-input-label">CHANNEL NAME</label>
					<div className='new-channel-hash-container'>
						<div className='hashtag'>#</div>
						<input
							className="modal-input-textbox"
							type="text"
							placeholder="new-channel"
							value={name}
							onChange={(e) => setName(e.target.value)}

						/>
					</div>
					<label id="modal-DESCRIPTION-label">DESCRIPTION</label>
					<input
						className="modal-input-textbox"
						type="text"
						placeholder="channel-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div id='grey-footer'>

					<div className="create-channel-submit-btn-container">
						{!showConfirmButton && <button className={changeColor + (showConfirmButton ? 'hide' : '')} type="submit">
							Update Channel
						</button>}
						<div>
							<div className={'delete-channel-bttn' + (showConfirmButton ? 'visible' : 'hide')} onClick={() => confirmDelete(true)}>Delete Channel</div>
						</div>
						{showConfirmButton && (
							<>
								<button className={"confirm-channel-bttn"} onClick={() => confirmDelete(false)}>Cancel Delete</button>
								<button className={"cancel-channel-bttn"} onClick={handleDeleteChannel}>Confirm Delete</button>
							</>
						)
						}

					</div>
				</div>
			</form>
		</div>
	);
};
export default UpdateChannelModal;
