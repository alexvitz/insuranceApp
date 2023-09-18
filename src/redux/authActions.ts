import { Dispatch } from 'redux';
import { addUser, loginWithIndexedDB } from '../utils/db';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const loggedUser = await loginWithIndexedDB(email, password);

      if (loggedUser) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: loggedUser,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'Log in failed.',
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
    }
  };
};

export const LOG_OUT = 'LOG_OUT';

export const logout = () => ({
  type: LOG_OUT,
});

export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';

export const createAccount = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: CREATE_ACCOUNT_REQUEST,
      });

      const userData = {
        email,
        password,
      };

      const savedData = await addUser(userData);

      if (savedData) {
        dispatch({
          type: CREATE_ACCOUNT_SUCCESS,
          payload: { id: savedData.userData.result },
        });
        alert(`Account created with email: ${email}`);
      } else {
        dispatch({
          type: CREATE_ACCOUNT_FAILURE,
          payload: 'Account creation failed.',
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_ACCOUNT_FAILURE,
        payload: error,
      });
    }
  };
};
