import React, { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrentUserServers } from '../../store/servers';
import { getServerDetails } from '../../store/servers';
import { getAllChannel } from '../../store/channel';
import { getAllMessages } from '../../store/message';
import './Servers.css';

const Servers = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	// grabbing the state of servers in servers
	const servers = useSelector((state) => Object.values(state.servers.servers));
	// grabbing the state of channels in channels
	const channels = useSelector((state) => state.channels.channels);
	console.log('channels useSelector >>>>', channels);
	const { serverId } = useParams();
	// dispatching to the current user's servers
	useEffect(() => {
		dispatch(getAllCurrentUserServers());
		dispatch(getAllChannel(10));
	}, [dispatch]);
	// I was servers so this was my workaround
	// let serverArr;
	// if (servers) {
	// 	serverArr = Object.values(servers);
	// }
	// if (!servers) return null;

	return (
		<div className="servers-page-container">
			<div className="servers-column-container">
				<h1 className="test-name">servers</h1>
				{servers.map((server) => {
					return (
						<div className="servers-button-map" key={server.name}>
							<NavLink to={`servers/${server.id}`}>
								<div className="servers-photo-container">
									<div>
										<img
											className="servers-photo"
											src={server.preview_image}
											alt="server img"
										/>
									</div>
								</div>
							</NavLink>
						</div>
					);
				})}
			</div>
			<div className="servers-channels-container">
					<ul>
				{/* {channels.map((channel) => {
						return (
						<div>
							<li className='servers-channel-name' key={channel.id}>{channel.name}</li>
						</div>
						);
				})} */}
					</ul>;
				<h1 className="test-name">channels</h1>
			</div>
			<div className="servers-messages-container">
				<h1 className="test-name">messages section</h1>
			</div>
			<div className="servers-active-container">
				<h1 className="test-name">active section</h1>
			</div>
		</div>
	);
};

export default Servers;
