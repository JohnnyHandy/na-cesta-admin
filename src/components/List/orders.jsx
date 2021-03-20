import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from '@emotion/styled';

const selectedStyle = {
  backgroundColor: 'blue',
  color: 'white',
  cursor: 'pointer',
};

const notSelectedStyle = {
  backgroundColor: 'white',
  color: 'black',
  cursor: 'pointer',
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
    const id = item.OrderId;
    return (
      <ListGroupItem
        style={
            selected === id ? selectedStyle : notSelectedStyle
        }
        key={id}
        onClick={() => setSelected(id)}
      >
        {id}
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

export default List;
