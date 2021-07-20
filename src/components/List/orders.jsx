/* eslint-disable camelcase */
/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import { parseISOString } from '../../utils/functions';
import { StatusOptions } from '../../utils/constants';

const selectedStyle = {
  backgroundColor: 'blue',
  color: 'white',
};

const notSelectedStyle = {
  backgroundColor: 'white',
  color: 'black',
};

const ListContainer = styled('div')`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center
`;

const spanCss = css`
  font-weight: bold;
`;

const ListItemComponent = ({ data, selected, setSelected }) => {
  if (data.length === 0) {
    return <h1> Sem pedidos cadastrados </h1>;
  }

  return data.map((item) => {
    const {
      id, status, created_at: createdAt, user, ref,
    } = item;
    const style = selected === id ? selectedStyle : notSelectedStyle;
    return (
      <ListGroupItem
        style={{
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 0.5fr)',
          ...style,
        }}
        key={id}
        onClick={() => setSelected(id)}
      >
        <span
          style={{
            gridColumn: '1 / -1',
            fontSize: '1.5em',
            marginBottom: '1em',
          }}
        >
          Referência:
          {ref}
        </span>
        <div>
          <span css={spanCss}>Id:</span>
          <span>{id}</span>
        </div>
        <div>
          <span css={spanCss}>Nome:</span>
          <span>{user.name}</span>
        </div>
        <div>
          <span css={spanCss}>Status:</span>
          <span>
            {StatusOptions.find((statusItem) => statusItem.value === status)?.label}
          </span>
        </div>
        <div>
          <span css={spanCss}>Data:</span>
          <span>{parseISOString(createdAt)}</span>
        </div>
      </ListGroupItem>
    );
  });
};

const List = ({
  data, selected, setSelected, dispatch, fetchItems,
}) => {
  React.useEffect(() => {
    dispatch(fetchItems());
  }, []);
  return (
    <ListContainer>
      <ListGroup
        style={{
          width: '100%',
        }}
      >
        <ListItemComponent
          data={data}
          selected={selected}
          setSelected={setSelected}
        />
      </ListGroup>
    </ListContainer>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

ListItemComponent.defaultProps = {
  user: {},
};

export default List;
