import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServer } from '../../store/servers';
// import { createMember } from '../../store/member';
import { Modal } from '../../context/Modal';
import MessageConfirmation from './confirmationModal';
import './userList.css'

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [newServer, setNewServer] = useState({})
  const [receiver, setReceiver] = useState()
  const dispatch = useDispatch()
  const currUser = useSelector(state => state.session.user)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  // console.log("++++++++++", users)

  const createDM = async (user) => {
    let newDmServer = await dispatch(createServer({
      name: `${currUser.username}-${user.username}`,
      preview_image: '2',
      private: true,
      server_description: 'New Dm',
      is_DM: true
    }
    ))
    setReceiver(user)
    // console.log('<<<<',user)
    setNewServer(newDmServer)
    console.log('new server', newDmServer)

  }






  return (users.map((user) => {
    return (
      // <div className='user-details'>
      <>
        <div className='user-card'>
          <div className='user-img-div2'>
            <img
              className='user-img2'
              src={user.profile_pic}
              alt='user.name' />
          </div>
          <div>{user.username}</div>
          <div onClick={() => (createDM(user), setShowConfirm(true))}>
            {/* <i className='fa-solid fa-message'/> */}
            <i className="fa-regular fa-message"></i>
          </div>
          {showConfirm && (
            <Modal on onClose={() => setShowConfirm(false)}>
              <MessageConfirmation user={receiver} serverId={newServer} setShowConfirm={setShowConfirm} />
            </Modal>
          )}
        </div>
      </>
      // </div>


    );
  }))


  // return (
  //   <>
  //     <h1>User List: </h1>
  //     <ul>{userComponents}</ul>
  //   </>
  // );
}

export default UsersList;
