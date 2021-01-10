import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
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
    return <h1> Sem produtos cadastrados </h1>;
  }

  return data.map((item) => (
    <ListGroupItem
      style={
            selected === item.id ? selectedStyle : notSelectedStyle
        }
      key={item.id}
      onClick={() => setSelected(selected === item.id ? '' : item.id)}
    >
      {item.model}
    </ListGroupItem>
  ));
};

const List = ({
  data, selected, setSelected, setFormMode,
}) => (
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
    <Button
      color="primary"
      onClick={() => setFormMode('create')}
    >
      Criar Produto
    </Button>
  </ListContainer>
);

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  setFormMode: PropTypes.func.isRequired,
};

export default List;
