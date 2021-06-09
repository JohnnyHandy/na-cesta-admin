import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled('div')`
  background-color: burlywood;
  display: flex;
  min-height: 100vh;
`;

const ChildrenContainer = styled('div')`
  height: 100%;
  margin: auto;
  width: 100%;
`;

const Template = ({ children }) => (
  <Container>
    <div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
      </ul>
    </div>
    <ChildrenContainer>
      {children}
    </ChildrenContainer>
  </Container>
);

Template.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default Template;
