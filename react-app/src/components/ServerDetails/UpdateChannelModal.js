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
		<>
			<div className="form-container">
				<div className="form-card">
					<form id='form' onSubmit={submitUpdatedChannel}>

						<div className="text">
							<h2>Update Channel</h2>
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
							{!showConfirmButton &&
								<button className={changeColor + (showConfirmButton ? 'hide' : '')} type="submit">
									Update Channel
								</button>}
							<div className='delete-div'>
								<div className={'delete-channel-bttn' + (showConfirmButton ? 'visible' : 'hide')} onClick={() => confirmDelete(true)}>Delete Channel</div>
							</div>
							{showConfirmButton &&
								<div className='delete-div'>
									<div>
										<button className={"confirm-channel-bttn"} onClick={() => confirmDelete(false)}>Cancel Delete</button>
									</div>

									<div>

										<button className={"cancel-channel-bttn"} onClick={handleDeleteChannel}>Confirm Delete</button>
									</div>
								</div>

							}

						</div>

					</form>
				</div >
			</div >
		</>
	);
};
export default UpdateChannelModal;
