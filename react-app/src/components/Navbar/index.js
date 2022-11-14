import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
const NavBar = () => {
	const history = useHistory();
	const login = () => {
		history.push('/login');
	};

	return (
		<div className="splash-navbar-container">
			<nav>
				<div className="splash-nav-box">
					<div className="splash-logo-left">
          <div className='link-button'>
						<NavLink className="link-text" to="/" exact={true} activeClassName="active">
							Q-CORD
						</NavLink>
          </div>
					</div>
					<div className="splash-mid-links">
						<div className='link-button'>
							<NavLink
								className="link-text"
								to="/discover"
								exact={true}
								activeClassName="active"
							>
								Discover
							</NavLink>
						</div>
						<div className='link-button'>
							<NavLink
								className="link-text"
								to="/safety"
								exact={true}
								activeClassName="active"
							>
								Safety
							</NavLink>
						</div>
						<div className='link-button'>
							<NavLink
								className="link-text"
								to="/support"
								exact={true}
								activeClassName="active"
							>
								Support
							</NavLink>
						</div>
					</div>
					<div className="splash-login-right">
						<button className="login-button" onClick={login}>
							Log in
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};


export default NavBar;
