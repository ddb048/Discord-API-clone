import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import '../Navbar/NavBar.css'
const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onLogout =  (e) => {
    e.preventDefault()
    dispatch(logout());
    history.push('/discover')

  };

  return <button className='splash-logout-button' onClick={onLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i></button>;
};

export default LogoutButton;
