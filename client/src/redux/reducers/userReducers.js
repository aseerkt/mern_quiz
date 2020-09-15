import {
  USER_LOADED,
  USER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return { isLoading: false, isAuthenticated: true, user: action.payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return initialState;
    default:
      return state;
  }
}
