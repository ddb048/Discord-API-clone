import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrentUserServers } from '../../store/servers';
import { getAllMembers } from '../../store/member';
import { getChannelDetail } from '../../store/channel';
import LogoutButton from '../auth/LogoutButton';
import CreateServerFormModal from '../CreateServerModal';
// import { getAllMessages } from '../../store/message';
import { getServerDetails } from '../../store/servers';
import DM_button from '../../Images/q-cord-button.png';
import './Servers.css';
import CreateServerModal from '../CreateServerModal';



import { io } from 'socket.io-client'
let socket;

const Servers = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
	const [messages,setMessages]=useState([])
	const [chatInput,setChatInput]=useState('')

  const dispatch = useDispatch();
  // const history = useHistory();
  const { channelId } = useParams();
  // grabbing the state of servers in servers
  const servers = useSelector((state) => Object.values(state.servers.servers));
  // console.log('THIS IS SERVES USESELECTOR IN ARRAY', servers)
  const currentUser = useSelector((state) => state.session.user);
  // console.log('this is current user >>', currentUser)
  const isNotDm = servers.filter((dm) => dm.is_DM === false);
  const dmServersArr = servers.filter((dm) => dm.is_DM === true);
  // const userArr = userObj.find((dm) => dm.is_DM == true);
  console.log("USER ARRAY", dmServersArr);
  let memberArr = [];
  dmServersArr.forEach((server) => memberArr.push(...server.members));
  // console.log("------>", memberArr)
  let dmMessageArr = [];
  dmServersArr.forEach((server) => dmMessageArr.push(...server.messages));
  console.log("2222------>", dmMessageArr);


	useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

  useEffect(() => {
    dispatch(getAllCurrentUserServers());
    dispatch(getServerDetails(servers.id));
    dispatch(getChannelDetail(channelId));
    dispatch(getAllMembers(servers.id));
    // dispatch(getAllChannel());
  }, [dispatch, channelId, servers.id]);

  function redirectToServerModal() {
	if (showModal === true)
    return (
      <>
        <CreateServerModal />
      </>
    );
  }

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
        {isNotDm.map((server) => {
          return (
            <>
              <div className="servers-button-map" key={server.name}>
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
          <button className="servers-photo" onClick={()=>{setShowModal(true)}}>
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="servers-dms-container">
        <div className="servers-title-container">
          <div className="servers-title">DIRECT MESSAGES</div>
        </div>
        <div className="servers-dm-layout">
          {memberArr.map(
            (member) =>
              member.user_info.profile_pic && (
                <div>
                  <button onClick={() => setShowMsg(true)}>
                    <div>
                      <img
                        className="user-photo"
                        src={member.user_info.profile_pic}
                        alt=""
                      />
                    </div>
                    <div>{member.user_info.username} </div>
                  </button>
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
            dmMessageArr.length > 0 &&
            dmMessageArr.map((message) => {
              return (
                <div className="mess-box">
                  <img
                    className="user-photo"
                    src={message.owner_pic}
                    alt="userPhoto"
                  />
                  <div className="mess">
                    <div>
                      <h4>{message.owner_name}</h4>
                      {message.created_at}
                    </div>
                    <div>{message.message_body}</div>
                  </div>
                </div>
              );
            })}
        </div>
        {showMsg && (
          <div>
            <input placeholder="Message" />
          </div>
        )}
      </div>
      <div className="servers-active-container">
        <h1 className="test-name">active section</h1>
      </div>
    </div>
  );
};;
	

export default Servers;
