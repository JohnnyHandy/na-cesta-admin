import React from 'react';
import { useDispatch } from 'react-redux';

import { SIGN_IN_REQUEST } from '../../store/auth/index';

import LoginComponent from '../../components/form/login';

const LoginContainer = (props) => {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(SIGN_IN_REQUEST(data));
  };
  return (
    <LoginComponent {...props} onSubmit={onSubmit} />
  );
};

export default LoginContainer;
