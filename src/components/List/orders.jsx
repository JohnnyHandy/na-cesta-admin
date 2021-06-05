import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from '@emotion/styled';

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

const ListItemComponent = ({ data, selected, setSelected }) => {
  if (data.length === 0) {
    return <h1> Sem pedidos cadastrados </h1>;
  }

  return data.map((item) => {
    const {
      id, status, created_at: createdAt, user,
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
        <span>
          Id:
          {id}
        </span>
        <span>
          Usuário:
          {user.name}
        </span>
        <span>
          Status:
          {StatusOptions.find((statusItem) => statusItem.value === status).label}
        </span>
        <span>
          Data:
          {parseISOString(createdAt)}
        </span>
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
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

ListItemComponent.defaultProps = {
  user: {},
};

export default List;
