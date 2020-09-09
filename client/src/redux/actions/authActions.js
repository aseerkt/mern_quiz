import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import { returnErrors } from './errorActions';

export const registerUser = (name, email, password) => (dispatch) => {
  const data = { name, email, password };

  axios
    .post('/users/register', data)
    .then((res) => {
      // registration success
      return {
        type: REGISTER_SUCCESS,
      };
    })
    .catch((err) => {
      // registration fails
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, REGISTER_FAIL)
      );
      return {
        type: REGISTER_FAIL,
      };
    });
};
