import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from '@emotion/styled';
import { AiOutlineBlock, AiOutlineInbox } from 'react-icons/ai';

import Logo from '../assets/na-cesta-logo.png';
import { SIGN_OUT_REQUEST } from '../store/auth';

const Container = styled('div')`
  background-color: burlywood;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ChildrenContainer = styled('div')`
  flex-grow: 1;
  overflow: hidden;
  padding: 1em;
`;

const MenuItem = styled('div')`
  align-items: center;
  background: ${(props) => (props.highlighted ? 'lightgray' : 'initial')};
  color: ${(props) => (props.highlighted ? 'white' : 'initial')};
  cursor: pointer;
  display: flex;
  padding: 0.5em;
  font-size: 1.2em;
  &: hover {
    color: ${(props) => (props.highlighted ? 'white' : 'lightgray')};

  }
`;
const MenuItemLabel = styled('span')`
  margin-left: 0.5em;
`;

const menuOptions = [
  {
    label: 'Modelos',
    path: '/models',
    icon: <AiOutlineBlock />,
  },
  {
    label: 'Pedidos',
    path: '/orders',
    icon: <AiOutlineInbox />,
  },
];

const Template = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Container>
      <div
        style={{ background: 'white', width: '100%', position: 'relative' }}
      >
        <img style={{ width: '10vw' }} src={Logo} alt="logo" />
        {isLoggedIn && (
        <Button
          style={{
            position: 'absolute', right: '1em', top: '1em', zIndex: '1',
          }}
          onClick={() => dispatch(SIGN_OUT_REQUEST({ history }))}
        >
          Logout
        </Button>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        {isLoggedIn && (
        <div
          style={{ background: 'white', width: '10vw' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {
              menuOptions.map((option) => (
                <MenuItem
                  highlighted={history.location.pathname === option.path}
                  key={option.label}
                  onClick={() => history.push(option.path)}
                >
                  {option.icon}
                  <MenuItemLabel>{option.label}</MenuItemLabel>
                </MenuItem>
              ))
            }
          </div>
        </div>
        )}
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
      </div>
    </Container>
  );
};

Template.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default Template;
