import axiosInstance from '../utils/http';
import { SIGN_IN_SUCCESS } from './auth';

// eslint-disable-next-line import/prefer-default-export
export const addTokenToRequest = () => (next) => (action) => {
  const isStorageRehydrate = action.type === 'persist/REHYDRATE';
  const isUserSignedIn = action.type === SIGN_IN_SUCCESS.type;
  const isLoggedIn = action.payload?.auth?.isLoggedIn;

  if (isStorageRehydrate && action.payload && action.payload.headers) {
    axiosInstance.defaults.headers.common['access-token'] = action.payload.headers['access-token'];
    axiosInstance.defaults.headers.common.client = action.payload.headers.client;
    axiosInstance.defaults.headers.common.expiry = action.payload.headers.expiry;
    axiosInstance.defaults.headers.common.client = action.payload.headers.client;
    axiosInstance.defaults.headers.common.uid = action.payload.headers.uid;
  }

  if (isStorageRehydrate && isLoggedIn) {
    axiosInstance.defaults.headers.common['access-token'] = action.payload.auth?.credentials['access-token'];
    axiosInstance.defaults.headers.common.client = action.payload.auth?.credentials.client;
    axiosInstance.defaults.headers.common.expiry = action.payload.auth?.credentials.expiry;
    axiosInstance.defaults.headers.common.client = action.payload.auth?.credentials.client;
    axiosInstance.defaults.headers.common.uid = action.payload.auth?.credentials.uid;
  }
  if (
    (isUserSignedIn && action.payload && action.payload.headers)
    || (action.payload && action.payload.headers)
  ) {
    axiosInstance.defaults.headers.common['access-token'] = action.payload.headers['access-token'];
    axiosInstance.defaults.headers.common['token-type'] = action.payload.headers['token-type'];
    axiosInstance.defaults.headers.common.expiry = action.payload.headers.expiry;
    axiosInstance.defaults.headers.common.client = action.payload.headers.client;
    axiosInstance.defaults.headers.common.uid = action.payload.headers.uid;
  }

  next(action);
};
