import React, { useEffect, useState } from 'react';
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
import './index.css';

import { io } from 'socket.io-client';
import { createMessage, getAllMessages } from '../../store/message';

let socket;

const ServerDetail = () => {
	const { serverId, channelId } = useParams();
	const [showModal, setShowModal] = useState(false);

	const [updateModal, setUpdateModal] = useState(false)
	const [setModalData] = useState();

	// useState that sets channel id once
	const [currentChannelId, setCurrentChannelId] = useState();
	const [showMsg, setShowMsg] = useState(false);

	// useState for websocket listener
	const [messages, setMessages] = useState([]);

	// sets new chat input in channel messages
	const [chatInput, setChatInput] = useState('');
	const allMsgs = useSelector((state) =>
		Object.values(state.messages.messages)
	);
	const dispatch = useDispatch();
	const servers = useSelector((state) => Object.values(state.servers.servers));
	const members = useSelector((state) => state.members.members);
	// console.log('users', members);
	const channelsServersArr = servers.filter((dm) => dm.is_DM === false);

	const channelsArray = [];
	channelsServersArr.forEach((channel) =>
		channelsArray.push(...channel.channels)
	);
	// console.log('channels array.....>>>>>>>', channelsArray);
	// console.log('servers', servers)
	const allChannels = useSelector((state) =>
		Object.values(state.channels.channels)
	);

	// console.log('all channels', allChannels);
	const currentUser = useSelector((state) => state.session.user);

	const findOneServer = useSelector((state) => state.servers.oneServer);

	console.log('server details=======>', findOneServer);

	useEffect(() => {
		dispatch(getServerDetails(serverId));
		dispatch(getAllChannel(serverId));
		dispatch(getChannelDetail(channelId));
		dispatch(getAllMembers(serverId));
		dispatch(getAllMessages(currentChannelId));
	}, [dispatch, channelId, serverId, currentChannelId]);

	let currentChannel;
	// filters current channel id once current state and useEffect are populated
	if (channelsArray.length && currentChannelId) {
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
								<div className='servers-button-column' key={server.name}>
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
								</div>
							</>
						);
					})}
			</div>
			<div className='server-channels-container'>
				<div className='server-title-container'>
					<div className='server-title'>{}</div>
					<div
						className='add-channel-container'
						onClick={() => setShowModal(true)}
					>
						{' '}
						<i className='fa fa-plus' aria-hidden='true' />
					</div>
				</div>
				<div className='server-channel-layout'>
					<div className='channel-items'>
						{channelsArray.map((channel) => {
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

										<i className='fa fa-plus' aria-hidden='true' />
										<div
											className='gear-name'
											onClick={() =>
												grabChannelId(channel.id)
											}
										></div>

									</div>
								</div>
								</div>
							);
						})}
					</div>
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
				<div></div>
				<div className='test-name'>
					{showMsg &&
						currentChannel &&
						currentChannel.messages.map((msg) => {
							return (
								<div className='channel-messages-container'>
									<div className='user-container'>
										<img className='user-photo' src={msg.user_photo} />
										<div className='channel-message'>{msg.message_body}</div>
									</div>
								</div>
							);
						})}
					messages section
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
											<div>{chat.message_body}</div>
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
								/>
								<button onClick={submitChatMsg} type='submit'>
									Send
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
						setUpdateModal={setShowModal}
					/>
				</Modal>
			)}

		</div>
	);
};

export default ServerDetail;
