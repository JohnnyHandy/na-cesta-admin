/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import styled from '@emotion/styled';
import Select from 'react-select';
import { fetchModelsRequest } from '../../store/models';
import { categoryTypes, nbaTeams } from '../../utils/constants';
import Loading from '../loading';

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
  data, selected, setSelected, dispatch, loading,
}) => {
  const history = useHistory();
  const [categories, setCategories] = React.useState([]);
  const [team, setTeam] = React.useState();
  React.useEffect(() => {
    dispatch(fetchModelsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(fetchModelsRequest(
      {
        filters: {
          'q[category_id_in]': categories,
          'q[team_in]': [team?.value ? team.value : ''],
        },
      },
    ));
  }, [categories, team]);
  return (
    <ListContainer>
      {loading
        ? <Loading />
        : (
          <>
            <div
              style={{
                display: 'flex',
              }}
            >
              {
                Object.keys(categoryTypes).map((item) => (
                  <CategoryItem
                    id={item}
                    selected={categories.includes(categoryTypes[item])}
                    onClick={() => {
                      let newCategories = categories;
                      if (categories.includes(categoryTypes[item])) {
                        newCategories = categories.filter(
                          (categoryItem) => (categoryItem !== categoryTypes[item]),
                        );
                      } else {
                        newCategories = categories.concat(categoryTypes[item]);
                      }
                      setCategories(newCategories);
                    }}
                  >
                    {item}
                  </CategoryItem>
                ))
              }
            </div>
            <div style={{ width: 'inherit' }}>
              <Select
                value={team}
                isClearable
                onChange={(value) => setTeam(value)}
                placeholder="Filtrar por time"
                options={Object.keys(nbaTeams)
                  .map((item) => ({ label: item, value: nbaTeams[item] }))}
              />
            </div>
            <ListGroup
              style={{
                width: '100%',
                overflow: 'auto',
                maxHeight: '60vh',
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
              style={{ margin: '1em 0' }}
            >
              Criar Modelo
            </Button>
          </>
        )}
    </ListContainer>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default List;
