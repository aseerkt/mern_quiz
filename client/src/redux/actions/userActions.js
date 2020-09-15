import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from './types';
import { returnErrors } from './errorActions';

// REGISTER ACTION

export const registerUser = (name, email, password, confirm, history) => async (
  dispatch
) => {
  // config
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // request body
  const body = JSON.stringify({ name, email, password, confirm });
  // making post request to register user
  try {
    await axios.post('/api/users/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
    });
    history.push('/login');
  } catch (err) {
    dispatch(
      returnErrors(err.response.data.error, err.response.status, REGISTER_FAIL)
    );
    return dispatch({ type: REGISTER_FAIL });
  }
};

// LOGIN ACTION

export const loginUser = (email, password, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    await axios.post('/api/users/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
    });
    history.push('/');
  } catch (err) {
    dispatch(
      returnErrors(err.response.data.error, err.response.status, LOGIN_FAIL)
    );
    return dispatch({ type: LOGIN_FAIL });
  }
};

// LOAD USER ACTION

export const loadUser = () => async (dispatch) => {
  // Loading
  dispatch({
    type: USER_LOADING,
  });
  try {
    const res = await axios.get('/api/users/auth');
    console.log(res);
    // Loaded
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.error, err.response.status));
  }
};
