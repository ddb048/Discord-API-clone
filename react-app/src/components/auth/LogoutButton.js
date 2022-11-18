import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import '../Navbar/NavBar.css'
const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout());
    history.push('/')
  };

  return <button className='splash-logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
