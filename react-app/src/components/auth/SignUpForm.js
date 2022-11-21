import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic, setProfile_pic] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //error handling useState
  const [urlErr, setUrlErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const [renderErr, setRenderErr] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setRenderErr(true)
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  /********************Helper Functions***************** */

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfile_pi = (e) => {
    setProfile_pic(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const urlValidation = str => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  }





  /********************Use Effect******************* */

  useEffect(() => {
    //email error handling
    if (email.length && !validateEmail(email)) {
      setEmailErr('invalid email')
    } else if (!email.length) {
      setEmailErr('email is required')
    } else {
      setEmailErr("")
    }

    //username error handling
    if (username.length < 4) {
      setUsernameErr('username must be at least 4 characters')
    } else if (username.length > 10){
      setUsernameErr('username must be less than 10 characters ')
    }

    else {
      setUsernameErr("")
    }


    //password error handling
    if (!password.length) {
      setPasswordErr('password is required')
    } else if (password.length && password.length < 6) {
      setPasswordErr('password must be greater than 6 characters')
    } else {
      setPasswordErr("")
    }

    //confirm password error handling
    if (confirmPassword.length && confirmPassword !== password) {
      setConfirmPasswordErr('please confirm passwords match')
    } else {
      setConfirmPasswordErr("");
    }

    //imgUrl error handling
    if (!profile_pic.length) {
      setUrlErr('image URL is required')

    } else if (profile_pic.length && !urlValidation(profile_pic)) {
      setUrlErr('invalid image URL')
    } else {
      setUrlErr('')
    }


  }, [username, email, password, profile_pic, confirmPassword])

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="form-container">
      <div className="form-card-1">
        <form id="form" onSubmit={onSignUp}>
          <div id="welcome-text">
            <h2 className="text">Create an account</h2>
          </div>

          <div>
            <div>
              {renderErr && usernameErr ? (
                <label className="text renderError" htmlFor="username">
                  Username: {usernameErr}
                </label>
              ) : (
                <label className="text noRenderError" htmlFor="username">
                  Username
                </label>
              )}
            </div>
            <input
              className="inp2"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              placeholder="Your username"
            ></input>
          </div>
          <div>
            <div>
              {renderErr && emailErr ? (
                <label className="text renderError" htmlFor="email">
                  Email: {emailErr}
                </label>
              ) : (
                <label className="text noRenderError" htmlFor="email">
                  Email
                </label>
              )}
            </div>
            <input
              className="inp2"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder="Your email"
            ></input>
          </div>
          <div>
            <div>
              {renderErr && urlErr ? (
                <label className="text renderError" htmlFor="pic">
                  Profile picture: {urlErr}
                </label>
              ) : (
                <label className="text noRenderError" htmlFor="pic">
                  Profile picture
                </label>
              )}
            </div>
            <input
              className="inp2"
              type="text"
              name="profilePicture"
              onChange={updateProfile_pi}
              value={profile_pic}
              placeholder="Upload a png or jpeg image of yourself"
            ></input>
          </div>
          <div>
            <div>
              {renderErr && passwordErr ? (
                <label className="text renderError" htmlFor="pic">
                  Password: {passwordErr}
                </label>
              ) : (
                <label className="text noRenderError" htmlFor="pic">
                  Password
                </label>
              )}
            </div>
            <input
              className="inp2"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Your Password"
            ></input>
          </div>
          <div>
            {renderErr && confirmPasswordErr ? (
              <label className="text renderError" htmlFor="pic">
                Confirm Password: {confirmPasswordErr}
              </label>
            ) : (
              <label className="text noRenderError" htmlFor="pic">
                Confirm Password
              </label>
            )}
            <input
              className="inp2"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={confirmPassword}
              placeholder="Your password"
            ></input>
          </div>
          {/* <div className="errors-div">
            {!!errors.length && <div id="errors">{errors[0]}</div>}
          </div> */}
          <button id="subButton2" type="submit">
            Sign Up
          </button>
          <div>
            <Link id="to-signup2" to={"/login"}>
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
