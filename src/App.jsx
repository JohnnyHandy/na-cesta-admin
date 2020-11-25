import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';

import styled from '@emotion/styled';
import List from './components/List';
import FormContainer from './container/form';
import ProductDetails from './components/details';
import { fetchProductsRequest } from './store/products';

const Container = styled('div')`
    background: white;
    height: 90%;
    padding: 2%;
    width: 40$
`;

const AppContainer = styled('div')`
  align-items: center;
  background-color: burlywood;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  padding: 2vh 2vw;
  position: relative
`;

const FormWrapper = styled('div')`
    width: 80%;
    height: 90%;
    background: white;
    padding: 2%
`;

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = React.useState('1');
  const [formMode, setFormMode] = React.useState(false);
  React.useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const selectedProductDetails = products.items.find((item) => item.id === selectedProduct);
  console.log('selectedProductDetails', selectedProductDetails, 'products', products);
  if (formMode) {
    return (
      <AppContainer>
        <FormWrapper>
          <Button
            close
            color="danger"
            onClick={() => setFormMode(false)}
          />
          <FormContainer />
        </FormWrapper>
      </AppContainer>
    );
  }
  return (
    <AppContainer>
      <Container>
        <List
          data={products.items}
          selected={selectedProduct}
          setSelected={setSelectedProduct}
          setFormMode={setFormMode}
        />
      </Container>
      <Container>
        <ProductDetails
          product={selectedProductDetails}
          setFormMode={setFormMode}
        />
      </Container>
    </AppContainer>
  );
}

export default App;
