import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';

import styled from '@emotion/styled';
import List from './components/List';
import FormContainer from './container/form';
import ProductDetails from './components/details';
import Logo from './assets/useveranologo.png';

const Container = styled('div')`
    align-items: center;
    background: white;
    border-style: dashed;
    display: flex;
    flex-direction: column;
    height: 90%;
    justify-content: space-between;
    padding: 2%;
`;

const AppContainer = styled('div')`
  align-items: center;
  background-color: burlywood;
  height: 100vh;
  display: grid;
  grid-template-columns: 25% 65%;
  justify-content: space-around;
  padding: 2vh 2vw;
  position: relative
`;

const FormExternalWrapper = styled('div')`
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
  const [initialValues, setInitialValues] = React.useState({});
  React.useEffect(() => {
    // dispatch(fetchProductsRequest());
  }, [dispatch]);

  const selectedProductDetails = products.items.find((item) => item.id === selectedProduct);
  if (formMode) {
    return (
      <FormExternalWrapper>
        <FormWrapper>
          <Button
            close
            color="danger"
            onClick={() => setFormMode('')}
          />
          <FormContainer
            formMode={formMode}
            initialValues={initialValues}
            dispatch={dispatch}
          />
        </FormWrapper>
      </FormExternalWrapper>
    );
  }
  return (
    <AppContainer>
      <Container>
        <img style={{ width: '10vw' }} src={Logo} alt="logo" />
        <List
          data={products.items}
          selected={selectedProduct}
          setSelected={setSelectedProduct}
          setFormMode={setFormMode}
        />
      </Container>
      <Container>
        <ProductDetails
          dispatch={dispatch}
          setInitialValues={setInitialValues}
          product={selectedProductDetails}
          setFormMode={setFormMode}
        />
      </Container>
    </AppContainer>
  );
}

export default App;
