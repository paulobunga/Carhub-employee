import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from '../constants/user';

const INITIAL_STATE = {
  username: '',
  token: '',
  role: '',
  isActive: false,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case SIGN_IN_FAILURE:
      return { ...state, loading: false };
    case SIGN_OUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
