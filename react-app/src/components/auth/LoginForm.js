import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
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
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<div className="form-container">
				{/* <div className="background" /> */}
				<form className='form-card' onSubmit={onLogin}>
					<div>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<div>
						<div>
							<label htmlFor="email">Email</label>
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
							<label htmlFor="password">Password</label>
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
						<button id='subButton' type="submit">Login</button>
					</div>
					<div>
						need an account?
						<Link to={'/sign-up'}>Register</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginForm;
