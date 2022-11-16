import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServerDetails } from '../../store/servers';
import { getAllChannel, getChannelDetail } from '../../store/channel';
import DM_button from '../../Images/q-cord-button.png';
import LogoutButton from '../auth/LogoutButton';
import './index.css';
const ServerDetail = () => {
	const { serverId, channelId } = useParams();
	const [currentChannelId, setCurrentChannelId] = useState();
	const [showMsg, setShowMsg] = useState(false);
	const dispatch = useDispatch();
	const servers = useSelector((state) => Object.values(state.servers.servers));
	// console.log('server', servers)
	const channelsServersArr = servers.filter((dm) => dm.is_DM === false);
	// console.log(' no dms ', channelsServersArr)
	const channelsArray = [];
	channelsServersArr.forEach((channel) =>
		channelsArray.push(...channel.channels)
	);
	// console.log('channels array', channelsArray)
	// console.log('servers', servers)
	const allChannels = useSelector((state) =>
		Object.values(state.channels.channels)
	);

	console.log('all channels', allChannels);
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(getServerDetails(serverId));
		dispatch(getAllChannel(serverId));
		dispatch(getChannelDetail(channelId));
	}, [dispatch]);

	let currentChannel;
	if (channelsArray.length && currentChannelId) {
		currentChannel = channelsArray.find(
			(channel) => channel.id == currentChannelId
		);
	}
	const showmsg = (x) => {
		setCurrentChannelId(x);

		setShowMsg(true);
	};
	console.log('are you channnelll', currentChannelId);
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
				</div>
				<div className="server-channel-layout">
					<div>
						{channelsArray.map((channel) => {
							return (
								<button
									onClick={() => showmsg(channel.id)}
									className="server-channel-name"
								>
									{channel.name}
								</button>
							);
						})}
					</div>
				</div>
				<div className="servers-dm-footer">
					<div className="user-photo-container">
						<img className="user-photo" src={currentUser.profile_pic} />
					</div>
					<div className="servers-user">{currentUser.username}</div>
					<LogoutButton />
				</div>
			</div>
			<div className="server-messages-container">
				<h1 className="test-name">
					{showMsg &&
						currentChannel &&
						currentChannel.messages.map((msg) => {
							return (
								<div>
									<div> {msg.created_at}</div>
									<div>{msg.message_body}</div>
								</div>
							);
						})}
					messages section
				</h1>
			</div>
			<div className="server-active-container">
				<h1 className="test-name">active section</h1>
			</div>
		</div>
	);
};

export default ServerDetail;
