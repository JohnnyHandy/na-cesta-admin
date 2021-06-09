/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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

const CategoryItem = styled('div')`
  border: 1px solid black;
  background-color: ${(props) => (props.selected ? 'burlywood' : 'initial')};
  color: ${(props) => (props.selected ? 'white' : 'initial')};
  cursor: pointer;
  margin: 1em;
  padding: 0.5em 1em;
`;

const categoryTypes = [
  {
    label: 'Biquini',
    value: 1,
  },
  {
    label: 'Maiô',
    value: 2,
  },
  {
    label: 'Saida',
    value: 3,
  },
];

const ListItemComponent = ({ data, selected, setSelected }) => {
  if (data.length === 0) {
    return <h1> Sem Modelos cadastrados </h1>;
  }

  return data.map((item) => {
    const { id } = item;
    return (
      <ListGroupItem
        style={
            selected === id ? selectedStyle : notSelectedStyle
        }
        key={id}
        onClick={() => setSelected(id)}
      >
        {item.name}
      </ListGroupItem>
    );
  });
};

const List = ({
  data, selected, setSelected, dispatch, fetchItems,
}) => {
  const history = useHistory();
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchItems(
      {
        filters: {
          'q[category_id_in]': categories,
        },
      },
    ));
  }, [categories]);
  return (
    <ListContainer>
      <div
        style={{
          display: 'flex',
        }}
      >
        {
        categoryTypes.map((item) => (
          <CategoryItem
            id={item.value}
            selected={categories.includes(item.value)}
            onClick={() => {
              let newCategories = categories;
              if (categories.includes(item.value)) {
                newCategories = categories.filter((categoryItem) => (categoryItem !== item.value));
              } else {
                newCategories = categories.concat(item.value);
              }
              setCategories(newCategories);
            }}
          >
            {item.label}
          </CategoryItem>
        ))
      }
      </div>
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
        onClick={() => history.push('/models/new')}
      >
        Criar Modelo
      </Button>
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
