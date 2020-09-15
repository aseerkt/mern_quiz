import React, { useEffect } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { loadUser } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='App'>
      <AppNavbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
