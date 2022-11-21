import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import { clearServer } from '../../store/servers';
import qrCode from '../../Images/q-cord.png'
const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [renderErr, setRenderErr] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();


	/********************Helper Function***************** */

	const validateEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const onLogin = async (e) => {
		e.preventDefault();
		setRenderErr(true)

		if (!emailErr &&
			!passwordErr) {

			const data = await dispatch(login(email, password));
			if (data) {
				setErrors(data);
			} else {
				setTimeout(() => { dispatch(clearServer()).then(< Redirect to="/servers/@me" />) }, 1000)
			}

		}
	};

	useEffect(() => {
		//email error handling
		if (email.length && !validateEmail(email)) {
			setEmailErr('invalid email')
		} else if (!email.length) {
			setEmailErr('email is required')
		} else {
			setEmailErr("")
		}
		//password error handling
		if (!password.length) {
			setPasswordErr('password is required')
		} else if (password.length && password.length < 6) {
			setPasswordErr('password must be greater than 6 characters')
		} else {
			setPasswordErr("")
		}
	}, [email, password])

	const log = async (e) => {
		e.preventDefault()
		const data = await dispatch(login('lazaro@aa.io', 'password'))
		if (data) {
			setErrors(data);
		} else {
			dispatch(clearServer());
			setTimeout(() => { < Redirect to="/servers/@me" />; }, 2000)
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

					<div className='errors-div'>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<div>
						<div>{renderErr && emailErr ?
							<label className='text renderError' htmlFor="email">
								Email: {emailErr}</label>
							:
							<label className='text noRenderError' htmlFor="email">
								Email
							</label>
						}
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
							{renderErr && passwordErr ?
								<label className='text renderError' htmlFor="password">
									Password: {passwordErr}</label>
								:
								<label className='text noRenderError' htmlFor="password">
									Password
								</label>
							}
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

	);
};

export default LoginForm;
