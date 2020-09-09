import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return state;
    case REGISTER_FAIL:
      return initialState;
    default:
      return state;
  }
}
