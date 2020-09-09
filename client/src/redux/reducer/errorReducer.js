import { RETURN_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: null,
  status: null,
  label: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RETURN_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}
