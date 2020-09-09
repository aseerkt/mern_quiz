import { RETURN_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (msg, status, label = null) => (dispatch) => {
  dispatch({
    type: RETURN_ERRORS,
    payload: { msg, status, label },
  });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
