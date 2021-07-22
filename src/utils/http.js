import axios from 'axios';

const {
  REACT_APP_SERVER_ENV = 'dev',
  REACT_APP_SERVER_PORT = 3000,
} = process.env;

const backendHost = {
  production: 'https://na-cesta-api.herokuapp.com/',
  staging: '',
  development: '',
  dev: `http://localhost:${REACT_APP_SERVER_PORT}`,
  demo: '',
};

const instance = axios.create({
  baseURL: backendHost[REACT_APP_SERVER_ENV],
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const multipartInstance = axios.create({
  baseURL: backendHost[REACT_APP_SERVER_ENV],
  headers: {
    'Content-Type':
      'multipart/form-data;',
  },
});

export const host = backendHost[REACT_APP_SERVER_ENV];

export default instance;
