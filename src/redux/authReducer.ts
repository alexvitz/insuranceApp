import {
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from './authActions';

const initialState = {
  creatingAccount: false,
  accountCreated: false,
  error: '',
  loggedUserID: null,
  userEmail: '',
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return { ...state, creatingAccount: true, error: '' };

    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        creatingAccount: false,
        loggedUserID: action.payload.id,
        userEmail: action.payload.email,
        accountCreated: true,
        error: '',
      };

    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        creatingAccount: false,
        accountCreated: false,
        error: action.payload,
      };
    case LOGIN_REQUEST:
      return { ...state, error: '' };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedUserID: action.payload.id,
        userEmail: action.payload.email,
        error: '',
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOG_OUT:
      return {
        creatingAccount: false,
        accountCreated: false,
        error: '',
        loggedUserID: null,
      };
    default:
      return state;
  }
};

export default authReducer;
