import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import qrCode from '../../Images/q-cord.png'
const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
		<Redirect to="/servers/@me" />;
	};
	const log = async (e) => {
		e.preventDefault()
		const data = await dispatch(login('lazaro@aa.io', 'password'))
		if (data) {
			setErrors(data);
		}
	}

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) { 
	return <Redirect to="/servers/@me" />
	}

	return (
		<>
			<div className="form-container">
				<div className="form-card">
					<form id='form' onSubmit={onLogin}>

						<div id='welcome'>
							<div id='welcome-text'>
								<div className='text'>
									<h2>Welcome back!</h2>
								</div>
								<div className='text'>
									<p>We're so excited to see you again!</p>
								</div>
							</div>
						</div>
						<div>
							{errors.map((error, ind) => (
								<div key={ind}>{error}</div>
							))}
						</div>
						<div>
							<div>
								<label className='text' htmlFor="email">Email</label>
							</div>
							<input

								name="email"
								type="text"
								// placeholder="Email"
								value={email}
								onChange={updateEmail}
								className='inp'
							/>
						</div>
						<div>
							<div>
								<label className='text' htmlFor="password">Password</label>
							</div>
							<input
								name="password"
								type="password"
								// placeholder="Password"
								value={password}
								onChange={updatePassword}
								className='inp'
							/>
						</div>
						<div>
							<button className='subButton' type="submit">Login</button>
						</div>
						<div id='to-signup'>
							Need an account? <Link to={'/sign-up'}>Register</Link>
						</div>
						<div>
							<button
								onClick={log}
								className='subButton'>Demo User</button>
						</div>
					</form>
					<div className='qCode-container'>
						<img className='qCode' src={qrCode} alt="" />
						<h3 className='text'>Scan this QR Code to check out our GitHub</h3>

					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
