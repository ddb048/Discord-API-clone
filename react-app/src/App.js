import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import Splash from './components/Splash'
import Discover from './components/Discover';
import OnePageServer from './components/OnePageServer'
import Servers from './components/Servers';
import ServerDetail from './components/ServerDetails';
import { authenticate } from './store/session';
import Safety from './components/SaftyPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route exact path='/'>
        {session.user && <Redirect to='/servers/@me' />}
        <NavBar />

      </Route>

      <Switch>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path = '/discover/servers/:serverId' exact={true}>
          <OnePageServer />
        </Route>
        <Route path='/discover' exact={true} >
          <Discover />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/servers/@me'>
          <Servers />
        </Route>
        <ProtectedRoute path='/servers/:serverId' exact={true}>
          <Servers />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:channelId' exact={true}>
          <ServerDetail/>
        </ProtectedRoute>
        <Route path='/safety'>
          <Safety />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
