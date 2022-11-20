import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { getAllCurrentUserServers } from '../../store/servers';
import { getAllMembers } from '../../store/member';
import { getChannelDetail } from '../../store/channel';
import LogoutButton from '../auth/LogoutButton';
import CreateServerForm from '../CreateServerForm';

import { getServerDetails } from '../../store/servers';
import DM_button from '../../Images/q-cord-button.png';
import './Servers.css';



import { io } from 'socket.io-client'
import { createMessage, getAllMessages } from '../../store/message';
import UpdateServerForm from '../UpdateServerModal';
import UsersList from '../UserList/UsersList';

let socket;

const Servers = () => {
	const [showModal, setShowModal] = useState(false);
	const [showUpdateModal, setUpdateShowModal] = useState(false);
	const [showMsg, setShowMsg] = useState(false);
	const [messages, setMessages] = useState([])
	const [chatInput, setChatInput] = useState('')
	const [currentServer, setCurrentServer] = useState([])
	const [activeMember, setActiveMember] = useState({})
	console.log("SHOW ME ACTIVE USER", activeMember)	const [toUpdate, setToUpdate]=useState({})



	const dispatch = useDispatch();
	// const history = useHistory();
	// const { channelId } = useParams();
	// const member=useSelector(state =>Object.values(state.members.members))
	const state = useSelector(state => state)
	const dm = Object.values(state.messages.messages);
	const servers = Object.values(state.servers.servers);
	const currentUser = state.session.user
	// grabbing the state of servers in servers
	// const servers = useSelector((state) => Object.values(state.servers.servers));
	// console.log('THIS IS SERVES USESELECTOR IN ARRAY', servers)
	// const currentUser = useSelector((state) => state.session.user);
	// console.log('this is current user >>', currentUser)
	let isNotDm = servers.filter((dm) => dm.is_DM === false);
	let dmServersArr = servers.filter((dm) => dm.is_DM === true);
	// const userArr = userObj.find((dm) => dm.is_DM == true);
	console.log('USER ARRAY', dmServersArr)
	let memberArr = []
	dmServersArr.forEach(server => memberArr.push(...server.members))
	// console.log("------>", memberArr)
	let otherMember = memberArr.filter(member => member.user_id !== currentUser.id)
	let dmMessageArr = []
	dmServersArr.forEach(server => dmMessageArr.push(...server.messages))
	// console.log("2222------>", dm)
	let tes = []
	dmServersArr.forEach(server => tes.push(...server.messages))
	// console.log("testtt=====>", tes)



	useEffect(() => {
		dispatch(getAllCurrentUserServers());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getServerDetails(currentServer[0]));
		dispatch(getChannelDetail(currentServer[1]));
		dispatch(getAllMembers(currentServer[0]));
		dispatch(getAllMessages(currentServer[1]));

	}, [currentServer, dispatch, setUpdateShowModal]);


	useEffect(() => {
		// open socket connection
		// create websocket
		socket = io();
		socket.on("DM", (chat) => {
			// console.log('chat input>>>>>333', chat)
			setMessages(messages => [...messages, chat])
			// console.log('data from DM=======>', messages)
		})
		// when component unmounts, disconnect
		return (() => {
			socket.disconnect()
		})
	}, [])


	// console.log('chat input>>>>>', chatInput)
	const submit = async (e) => {
		e.preventDefault()
		const payload = {
			serverId: currentServer[0],
			channelId: currentServer[1],
			message_body: chatInput
		}
		dispatch(createMessage(payload))
		if (socket) {
			socket.emit("DM", { owner_name: currentUser.username, owner_pic: currentUser.profile_pic, message_body: chatInput });
		}
		setChatInput("")
	}


	function userDm(id) {
		setShowMsg(true)
		const server = servers.find(server => server.id === id)
		const chanId = server.channels[0].id
		setCurrentServer([id, chanId])
	}

	return (
    <div className="servers-page-container">
      <div className="servers-column-container">
        <div className="dm-button-container">
          <div>
            <NavLink to="/servers/@me">
              <img onClick={showMsg} className="dm-button" src={DM_button} alt="" />
            </NavLink>
          </div>
        </div>
        {isNotDm.map((server) => {
          return (
            <>
              <div className="servers-button-map" key={server.name}>
                <div className="server-cog-grouper">
                  <NavLink to={`/servers/${server.id}`}>
                    <div className="servers-photo-container">
                      <div>
                        {" "}
                        {server.preview_image ? (
                          <img
                            className="servers-photo"
                            src={server.preview_image}
                            alt="server img"
                          />
                        ) : (
                          server.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                    </div>
                  </NavLink>
                  <div className="cog" onClick={() => (setUpdateShowModal(true), setToUpdate(server))}>
                    <i className="fa fa-cog" aria-hidden="true" />
                  </div>
                  {showUpdateModal && (
                    <Modal onClose={() => setUpdateShowModal(false)}>
                      <UpdateServerForm
                        setUpdateShowModal={setUpdateShowModal}
                        server={toUpdate}
                      />
                    </Modal>
                  )}
                </div>
              </div>
            </>
          );
        })}
        <div className="servers-photo-container">
          <div className="servers-photo" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus" aria-hidden="true" />
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <CreateServerForm setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
      </div>
      <div className="servers-dms-container">
        <div className="servers-title-container">
          <div className="servers-title">DIRECT MESSAGES</div>
        </div>
        <div className="servers-dm-layout">
          {otherMember.map(
            (member) =>
              member.user_info.profile_pic && (
                <div key={member.id}>
                  <div onClick={() => (userDm(member.server_id), setActiveMember(member))}>
                    <div>
                      <img
                        className="user-photo"
                        src={member.user_info.profile_pic}
                        alt=""
                        
                      />
                    </div>
                    <div>{member.user_info.username} </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="servers-dm-footer">
          <div className="user-photo-container">
            <img className="user-photo" src={currentUser.profile_pic} alt="" />
          </div>
          <div className="servers-user test-name">{currentUser.username}</div>
          <LogoutButton />
        </div>
      </div>
      <div className="servers-messages-container">
        <div>
          <h1 className="test-name">messages section</h1>
          {showMsg &&
            dm.length > 0 &&
            dm.map((message) => {
              return (
                <div className="mess-box" key={message.owner_name}>
                  <img
                    className="user-photo"
                    src={message.owner_pic}
                    alt="userPhoto"
                  />
                  <div className="mess">
                    <div>
                      <h4>{message.owner_name}</h4>
                      {/* {message.created_at} */}
                    </div>
                    <div>{message.message_body}</div>
                  </div>
                </div>
              );
            })}
        </div>

        <div>
          {showMsg &&
            messages.length > 0 &&
            messages.map((x) => {
              return (
                <div className="mess-box" key={x.owner_name}>
                  <img
                    className="user-photo"
                    src={x.owner_pic}
                    alt="userPhoto"
                  />
                  <div className="mess">
                    <div>
                      <h4>{x.owner_name}</h4>
                      {/* {message.created_at} */}
                    </div>
                    <div>{x.message_body}</div>
                  </div>
                </div>
              );
            })}
        </div>
        {showMsg && (
          <form onSubmit={submit} className="message-form">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message"
            />
            <button onClick={submit} type="submit">
              Send
            </button>
          </form>
        )}
      </div>
      <div className="servers-active-container">
        {showMsg && (
          <>
            <div className="active-user-con">
              <div className="user-img-header">
                <div className="user-img-div">
                  <img
                    className="user-img"
                    src={activeMember.user_info.profile_pic}
                    alt=""
                  />
                </div>
              </div>
              <div className="user-details">
                <div className="user-name-id">
                  {activeMember.user_info.first_name}{" "}
                  {activeMember.user_info.last_name}#
                  {activeMember.user_info.id}
                </div>

                <div className="user-name-id-joined">
                  <div className="joined">Q-core member since </div>
                  <div className="joind-date">
                    {activeMember.joined.slice(0, 17)}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
					{!showMsg && (
					<UsersList />
				)}
      </div>
    </div>
  );
};;


export default Servers;
