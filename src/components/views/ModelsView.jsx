import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModelsList from '../List/models';
import ProductsList from '../List/products';
import { Container, AppContainer } from './views.styles';

import { fetchModelsRequest } from '../../store/models';

const DashboardView = () => {
  const dispatch = useDispatch();
  const { models } = useSelector((reduxState) => reduxState);
  const [selectedModel, setSelectedModel] = React.useState(0);

  const selectedModelDetails = models.items.find((item) => item.id === selectedModel);

  return (
    <AppContainer>
      <Container>
        <ModelsList
          fetchItems={fetchModelsRequest}
          data={models.items}
          selected={selectedModel}
          setSelected={setSelectedModel}
          dispatch={dispatch}
          loading={models.isFetching}
        />
      </Container>
      <Container>
        <ProductsList
          dispatch={dispatch}
          setSelectedModel={setSelectedModel}
          selectedModel={selectedModel}
          model={selectedModelDetails}
        />
      </Container>
    </AppContainer>

  );
};

export default DashboardView;
