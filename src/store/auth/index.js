import { createAction, createReducer } from '@reduxjs/toolkit';

export const SIGN_IN_REQUEST = createAction('auth/SIGN_IN_REQUEST');
export const SIGN_IN_SUCCESS = createAction('auth/SIGN_IN_SUCCESS');
export const SIGN_IN_FAILURE = createAction('auth/SIGN_IN_FAILURE');

export const SIGN_OUT_REQUEST = createAction('auth/SIGN_OUT_REQUEST');
export const SIGN_OUT_SUCCESS = createAction('auth/SIGN_OUT_SUCCESS');
export const SIGN_OUT_FAILURE = createAction('auth/SIGN_OUT_FAILURE');

export const updateCredentialsRequest = createAction(
  'auth: UPDATE_CREDENTIALS_REQUEST',
);
export const updateCredentialsSuccess = createAction(
  'auth: UPDATE_CREDENTIALS_SUCCESS',
);
export const updateCredentialsFailure = createAction(
  'auth: UPDATE_CREDENTIALS_FAILURE',
);

export const initialState = {
  isLoggedIn: false,
  error: null,
  credentials: {},
  isLoading: false,
  user: null,
};

export const AuthReducer = createReducer(initialState, {
  [SIGN_IN_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    user: action.payload,
    isLoggedIn: true,
  }),
  [SIGN_IN_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),
  [SIGN_OUT_SUCCESS]: () => ({
    ...initialState,
  }),
  [updateCredentialsSuccess]: (state, action) => ({
    ...state,
    credentials: action.payload.headers,
  }),
});
