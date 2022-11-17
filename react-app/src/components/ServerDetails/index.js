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

const ServerDetail = () => {
	const { serverId, channelId } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	// how to make this work with object
	const [modalData, setModalData] = useState();
	// useState that sets channel id once
	const [currentChannelId, setCurrentChannelId] = useState();
	const [showMsg, setShowMsg] = useState(false);
	// const [getChannelId,setGetChannelId]=useState()
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
	// const allChannels = useSelector((state) =>
	// 	Object.values(state.channels.channels)
	// );

	// console.log('all channels', allChannels);
	const currentUser = useSelector((state) => state.session.user);

	const onServer = useSelector((state) => (state.servers.oneServer));

	// console.log('server details=======>', onServer)

	useEffect(() => {
		dispatch(getServerDetails(+serverId));
		dispatch(getAllChannel(serverId));
		dispatch(getChannelDetail(channelId));
		dispatch(getAllMembers(serverId));
	}, [dispatch, channelId, serverId]);

	let currentChannel;
	// filters current channel id once current state and useEffect are populated
	if (channelsArray.length && currentChannelId) {
		currentChannel = channelsArray.find(
			(channel) => channel.id === currentChannelId
		);
	}

	// appends profile_pic to currentChannel
	if (currentChannel && members) {
		currentChannel.messages.forEach((msg) => {
			const msgUser = members[+msg.owner_id];

			if (msgUser) {
				msg.user_photo = msgUser.profile_pic;
			}
		});
	}
	const showmsg = (x) => {
		setCurrentChannelId(x);
		setShowMsg(true);
	};

	const grabChannelId = (a) => {
		if (a) {
			setModalData(a);
			setUpdateModal(true);
		}
	};
	return (
		<div className="servers-page-container">
			<div className="servers-column-container">
				<div className="dm-button-container">
					<div>
						<NavLink to="">
							<img className="dm-button" src={DM_button} alt="" />
						</NavLink>
					</div>
				</div>
				{channelsServersArr.length > 0 &&
					channelsServersArr.map((server) => {
						return (
							<>
								<div className="servers-button-column" key={server.name}>
									<NavLink to={`/servers/${server.id}`}>
										<div className="servers-photo-container">
											<div>
												{' '}
												{server.preview_image ? (
													<img
														className="servers-photo"
														src={server.preview_image}
														alt="server img"
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
			<div className="server-channels-container">
				<div className="server-title-container">
					<div className="server-title">CHANNELS</div>
					<div
						className="add-channel-container"
						onClick={() => setShowModal(true)}
					>
						{' '}
						<i className="fa fa-plus" aria-hidden="true" />
					</div>
				</div>
				<div className="server-channel-layout">
					<div>
						{channelsArray.map((channel) => {
							return (
								<div
									className="server-channel-name"
									onClick={() => showmsg(channel.id)}
								>
									{channel.name}

									<div
										className="update-channel-container"
										onClick={() => setUpdateModal(true)}
									>
										<i
											className="fa fa-plus"
											aria-hidden="true"
											onClick={() => grabChannelId(channel.id)}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="servers-dm-footer">
					<div className="user-photo-container">
						<img className="user-photo" src={currentUser.profile_pic} alt="" />
					</div>
					<div className="servers-user">{currentUser.username}</div>
					<LogoutButton />
				</div>
			</div>
			<div className="channel-messages-container">
				<div></div>
				<div className="test-name">
					{showMsg &&
						currentChannel &&
						currentChannel.messages.map((msg) => {
							return (
								<div className="channel-messages-container">
									<div className="channel-message-date"> {msg.created_at}</div>
									<div className="user-container">
										<img className="user-photo" src={msg.user_photo} alt="" />
										<div className="channel-message">{msg.message_body}</div>
									</div>
								</div>
							);
						})}
					messages section
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
						channelId={modalData[0]}
						setUpdateModal={setShowModal}
					/>
				</Modal>
			)}
			<div className="server-active-container">
				<div className="test-name">active section</div>
			</div>
		</div>
	);
};

export default ServerDetail;
