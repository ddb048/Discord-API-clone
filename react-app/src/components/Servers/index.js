import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrentUserServers } from '../../store/servers';
import { getAllMembers } from '../../store/member';
import { getAllChannel, getChannelDetail } from '../../store/channel';
import LogoutButton from '../auth/LogoutButton';
// import { getAllMessages } from '../../store/message';
import { getServerDetails } from '../../store/servers';
import DM_button from '../../Images/q-cord-button.png';
import './Servers.css';

const Servers = () => {
  const [recipient, setRecipient] = useState({})
	const dispatch = useDispatch();
	const history = useHistory();
	const { channelId } = useParams();
	// grabbing the state of servers in servers
	const servers = useSelector((state) => Object.values(state.servers.servers));
  // console.log('THIS IS SERVES USESELECTOR IN ARRAY', servers)
  const currentUser = useSelector((state) => state.session.user);
	// console.log('this is current user >>', currentUser)

  const dmServersArr = servers.filter((dm) => dm.is_DM == true);
  // const userArr = userObj.find((dm) => dm.is_DM == true);
  console.log('USER ARRAY',dmServersArr)
let memberArr=[]
dmServersArr.forEach(server=>memberArr.push(server.members))
console.log(memberArr)
//   const other= dmServersArr.filter(x.members)

  // const otherUser2 = userArr.filter(x => x.id != currentUser.id)
  // const otherUser2 = userArr.filter(x => x.id != currentUser.id)
  // console.log('OTHER USER 2>>>>', otherUser2)
  // console.log('USERS',recipient)
  // console.log('findDM1 >>>>>', DmIsTrue);
  // useEffect(() => {
  //   if (!currentUser.id) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${otherUser2.user_id}`);
  //     const user = await response.json();
  //     setRecipient(user);
  //   })();
  // }, [currentUser.id]);
	// console.log('members in dm>>>', DmIsTrue);

	useEffect(() => {
		dispatch(getAllCurrentUserServers());
		dispatch(getServerDetails(servers.id));
		dispatch(getChannelDetail(channelId));
		dispatch(getAllMembers(servers.id));
		// dispatch(getAllChannel());
	}, [dispatch]);



	if (!currentUser) {
		return <Redirect to="/" />;
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
						{/* {dmServersArr.map((server) =>

								server.map(member=>(
									member.profile_pic&&(
										<img src={member.profile_pic} />
									)
								)
								server.members.id && (
						<NavLink to={`/channels/${server.id}`}>
										<div className="servers-dm-name" key={server.id}>
											#{server.name}
										</div>
									</NavLink>
								))
						} */}
					</div>
				</div>
				<div className="servers-dm-footer">
					<div className="user-photo-container">
						<img className="user-photo" src={currentUser.profile_pic} />
					</div>
					<div className="servers-user test-name">{currentUser.username}</div>
					<LogoutButton />
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
