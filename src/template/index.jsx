import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import styled from '@emotion/styled';

import { SIGN_OUT_SUCCESS } from '../store/auth';

const Container = styled('div')`
  background-color: burlywood;
  display: flex;
  min-height: 100vh;
  position: relative;
`;

const ChildrenContainer = styled('div')`
  height: 100%;
  margin: auto;
  width: 100%;
`;

const Template = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Container>
      { isLoggedIn && (
      <Button
        style={{
          position: 'absolute', right: '1em', top: '1em', zIndex: '1',
        }}
        onClick={() => dispatch(SIGN_OUT_SUCCESS())}
      >
        Logout
      </Button>
      )}
      <ChildrenContainer>
        {children}
      </ChildrenContainer>
    </Container>
  );
};

Template.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default Template;
