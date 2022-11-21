import React, { useEffect, useState} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServerDetails } from '../../store/servers';
import { getAllChannel, getChannelDetail } from '../../store/channel';
import { getAllMembers } from '../../store/member';
import DM_button from '../../Images/q-cord-button.png';
import LogoutButton from '../auth/LogoutButton';
import { Modal } from '../../context/Modal';
import ChannelModal from './NewChannelModal';
import UpdateChannelModal from './UpdateChannelModal';
import UpdateServerForm from '../UpdateServerModal';
import CreateServerForm from '../CreateServerForm';
import './index.css';

import { io } from 'socket.io-client';
import { createMessage, getAllMessages } from '../../store/message';

let socket;

const ServerDetail = () => {
	let { serverId, channelId } = useParams();
	serverId = parseInt(serverId)
	const [showModal, setShowModal] = useState(false);
	const [showModalServers, setShowModalServers] = useState(false)

	const [updateModal, setUpdateModal] = useState(false)
	const [modalData, setModalData] = useState();

	// useState for update server Modal
	const [showUpdateModal, setUpdateShowModal] = useState(false);

	// useState for saving server to be updated
	const [toUpdate, setToUpdate] = useState({})

	// useState that sets channel id once
	const [currentChannelId, setCurrentChannelId] = useState();
	const [showMsg, setShowMsg] = useState(false);

	// useState for websocket listener
	const [messages, setMessages] = useState([]);

	// sets new chat input in channel messages
	const [chatInput, setChatInput] = useState('');

	// const [isLoaded, setIsLoaded] = useState(false);
	// const allMsgs = useSelector((state) =>
	// 	Object.values(state.messages.messages)
	// );
	const dispatch = useDispatch();
	const servers = useSelector((state) => Object.values(state.servers.servers));

	const members = useSelector((state) => state.members.members);

	// filters out any private dm channels or servers (not sure)
	const channelsServersArr = servers.filter((dm) => dm.is_DM === false);
	// an object finds the server by its id
	const currentServerChannels = channelsServersArr.find(server => server.id === serverId)
	// console.log('CURRENT SERVER CHANNEL', currentServerChannels.name)
	// array of object that holds the current channels of the server
	// i added ? to stop it from erroring out
	const channelsArray = currentServerChannels?.channels;
	// console.log('CHANNEL ARRAY', channelsArray)
	// console.log('all channels', allChannels);
	const currentUser = useSelector((state) => state.session.user);

	const findOneServer = useSelector((state) => state.servers.oneServer);

	// console.log('server details=======>', findOneServer);

	useEffect(() => {

		dispatch(getServerDetails(serverId));
		dispatch(getAllChannel(serverId));
		dispatch(getChannelDetail(channelId));
		dispatch(getAllMembers(serverId));
		dispatch(getAllMessages(currentChannelId));



	}, [dispatch, channelId, serverId, currentChannelId]);

	let currentChannel;
	// filters current channel id once current state and useEffect are populated
	if (channelsArray?.length && currentChannelId) {
		currentChannel = channelsArray.find(
			(channel) => channel.id === currentChannelId
		);
	}

	// appends profile_pic to currentChannel
	// NOTE off by 1 error will be corrected later(changing seed files)
	if (currentChannel && members) {
		currentChannel.messages.forEach((msg) => {
			// console.log('current channellllssss', currentChannel);
			const msgUser = members[+msg.owner_id];
			// console.log('how is this working', members[1])
			// console.log('msgUser bugatti', msgUser)
			// console.log('this is messsssaggggeeeee', msg)
			if (msgUser) {
				msg.user_photo = msgUser.profile_pic;
			}
			// else{
			// 	msg.user_photo = 'https://www.nicepng.com/png/detail/970-9704826_tom-brady-face.png'
			// }
		});
	}
	// used for create a channel?
	const showmsg = (x) => {
		setCurrentChannelId(x);

		setShowMsg(true);
	};
	// used for update a channel
	const grabChannelId = (a) => {
		if (a) {
			setModalData(a);
			setUpdateModal(true);
		}
	};


	useEffect(() => {
		setMessages([])
	}, [currentChannelId])

	// websocket listener
	useEffect(() => {
		// open socket connection
		// create websocket
		socket = io();
		socket.on('channelMsgs', (chat) => {
			// console.log('chat input>>>>>333', chat)
			setMessages((messages) => [...messages, chat]);
			// console.log('data from DM=======>', messages)
		});
		// when component unmounts, disconnect
		return () => {
			socket.disconnect();
		};
	}, []);
	// handle chat message submit for websocket
	const submitChatMsg = async (e) => {
		e.preventDefault();
		const payload = {
			serverId: findOneServer.id,
			channelId: currentChannelId,
			message_body: chatInput,
		};
		dispatch(createMessage(payload));
		if (socket) {
			socket.emit('channelMsgs', {
				owner_name: currentUser.username,
				owner_pic: currentUser.profile_pic,
				message_body: chatInput,
			});
		}
		setChatInput('');
	};
	// this code was duplicating the messages ==> not sure if we will need it again, please do not delete
	// {showMsg &&
	// 	currentChannel &&
	// 	currentChannel.messages.map((msg) => {
	// 		return (
	// 			<div className='channel-messages-container'>
	// 				<div className='user-container'>
	// 					{/* <img className='user-photo' src={msg.user_photo} alt="" /> */}
	// 					<div className='channel-message'>{msg.message_body}</div>
	// 				</div>
	// 			</div>
	// 		);
	// 	})}
	// console.log('CURRENT SERVER CHANNELS?',currentChannel)


	return (
		<div className='servers-page-container'>
			<div className='servers-column-container'>
				<div className='dm-button-container'>
					<div>
						<NavLink to=''>
							<img className='dm-button' src={DM_button} alt='' />
						</NavLink>
					</div>
				</div>
				{channelsServersArr.length > 0 &&
					channelsServersArr.map((server) => {
						return (
							<>
								<div className='servers-button-map' key={server.name}>
									<div className='server-cog-grouper'>
										<NavLink to={`/servers/${server.id}`}>
											<div className='servers-photo-container'>
												<div>
													{' '}
													{server.preview_image ? (
														<img
															className='servers-photo'
															src={server.preview_image}
															alt='server img'
														/>
													) : (
														server.name.slice(0, 2)
													)}
												</div>
											</div>
										</NavLink>
										<div className='cog' onClick={() => (setUpdateShowModal(true), setToUpdate(server))}>
											<i className="fa fa-cog" aria-hidden="true" />
										</div>
										{showUpdateModal && (
											<Modal onClose={() => setUpdateShowModal(false)}>
												<UpdateServerForm setUpdateShowModal={setUpdateShowModal} server={toUpdate} />
											</Modal>)}
									</div>
								</div>
							</>
						);
					})}
				<div className="servers-photo-container">
					<div className="servers-photo" onClick={() => setShowModalServers(true)}>
						<i className="fa fa-plus" aria-hidden="true" />
					</div>
					{showModalServers && (
						<Modal onClose={() => setShowModalServers(false)}>
							<CreateServerForm setShowModal={setShowModalServers} />
						</Modal>
					)}
				</div>
			</div>
			<div className='server-channels-container'>
				<div className='server-title-container'>
					<div className='server-title'>{currentServerChannels?.name}</div>
					<div
						className='add-channel-container'
						onClick={() => setShowModal(true)}
					><i className='fa fa-plus' aria-hidden='true' />
					</div>
				</div>
				<div className='server-channel-layout'>
					{channelsArray?.map((channel) => {
						return (
							<div id='some-name'>
								<div
									className='server-channel-name'
									onClick={() => showmsg(channel.id)}
								>
									{channel.name}

									<div
										className='update-channel-container'
										onClick={() => setUpdateModal(true)}
									>
										<i className='fa fa-cog' aria-hidden='true' onClick={() =>
											grabChannelId(channel.id)
										} />
										<div
											className='gear-name'

										></div>

									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className='servers-dm-footer'>
					<div className='user-photo-container'>
						<img className='user-photo' src={currentUser.profile_pic} alt='' />
					</div>
					<div className='servers-user'>{currentUser.username}</div>
					<LogoutButton />
				</div>
			</div>
			<div className='channel-messages-container'>
				<div className='servers-title-container'>
					<div className='servers-title'>MESSAGES FOR CHANNEL {currentChannel ? ": " + currentChannel.name : null}</div>
				</div>
				<div className='test-name'>
					{showMsg &&
						currentChannel &&
						currentChannel.messages.map((msg) => {
							return (
								<div className='mess-box'>
									<div className='user-container'>
										<img className='user-photo' src={msg.user_photo} alt='' />
										<div className='mess'>
											<div><h4>{msg.owner_name}</h4></div>
											<div className='channel-message'>{msg.message_body}</div>
										</div>
									</div>
								</div>
							);
						})}
					<div>
						{showMsg &&
							messages.length > 0 &&
							messages.map((chat) => {
								return (
									<div className='mess-box'>
										<img
											className='user-photo'
											src={chat.owner_pic}
											alt='userPhoto'
										/>
										<div className='mess'>
											<div>
												<h4>{chat.owner_name}</h4>
											</div>
											<div className='channel-message'>{chat.message_body}</div>
										</div>
									</div>
								);
							})}
					</div>
					<div className='channel-input-textbox-container'>
						{showMsg && (
							<form onSubmit={submitChatMsg} className='channel-message-form'>
								<input
									value={chatInput}
									onChange={(e) => setChatInput(e.target.value)}
									placeholder='Message'
									className='channel-message-input'
								/>
								<button className='channel-send-msg' onClick={submitChatMsg} type='submit'>

								<i class="fa-regular fa-paper-plane"></i>
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ChannelModal serverId={serverId} setShowModal={setShowModal} />
				</Modal>
			)}

			{updateModal && (
				<Modal onClose={() => setUpdateModal(false)}>
					<UpdateChannelModal
						serverId={serverId}
						channelId={modalData}
						setUpdateModal={setUpdateModal}
					/>
				</Modal>
			)}

		</div>
	);
};

export default ServerDetail;
