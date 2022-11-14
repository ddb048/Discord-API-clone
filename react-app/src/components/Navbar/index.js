import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
const NavBar = () => {
  return (
    <div className='splash-navbar-container'>
      <nav>
        <div className='splash-nav-box'>
          <div className='splash-logo-left'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Q-CORD
            </NavLink>
          </div>
          <div className='splash-mid-links'>
            <div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            <div>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
            <div>
              <NavLink to='/discover' exact={true} activeClassName='active'>
                Discover
              </NavLink>
            </div>
          </div>
          <div className='splash-logout-right'>
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}



export default NavBar;
