import React, { useEffect } from 'react';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrentUserServers } from '../../store/servers';
import { getAllChannel } from '../../store/channel';
import LogoutButton from '../auth/LogoutButton';
// import { getAllMessages } from '../../store/message';
import DM_button from '../../Images/q-cord-button.png';
import './Servers.css';

const Servers = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { channelId } = useParams();
	const user = useSelector((state) => state.session.user);
  // console.log('users useSelector >>>>>>>>>', user)
	// grabbing the state of servers in servers
	const servers = useSelector((state) => Object.values(state.servers.servers));
	// grabbing the state of channels in channels
	const channels = useSelector((state) =>
		Object.values(state.channels.channels)
	);
	// console.log('channels useSelector >>>>', channels);
	// const { serverId } = useParams();
	// dispatching to the current user's servers

	useEffect(() => {
		dispatch(getAllCurrentUserServers());
		// dispatch(getAllChannel());
	}, [dispatch]);

	// const logout = () => {
  //   console.log('logout hit')
  //   history.push('/');
  //   // return <Redirect to='/'/>
	// };
  if(!user){
    return <Redirect to='/'/>
  }
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
				{servers.map((server) => {
					return (
						<>
							<div className="servers-button-map" key={server.name}>
								<NavLink to={`servers/${server.id}`}>
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
				<div className="servers-photo-container">
					<div className="servers-photo">CRG</div>
				</div>
			</div>
			<div className="servers-dms-container">
				<div className="servers-title-container">
					<div className="servers-title">DIRECT MESSAGES</div>
				</div>
				<div className="servers-dm-layout">
					<div>
						{servers.map(
							(server) =>
								server.is_DM && (

										<div className="servers-dm-name" key={server.id}>
											#{server.name}
										</div>

								)
						)}
					</div>
				</div>
				<div className="servers-dm-footer">
        <div className='user-photo-container'>
        <img className='user-photo' src={user.profile_pic}/>
        </div>
					<div className="servers-user test-name">{user.username}</div>
          <LogoutButton/>
				</div>
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
