import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';

import styled from '@emotion/styled';
import ProductsList from './components/List/products';
import OrdersList from './components/List/orders';
import FormContainer from './container/form';
import ProductDetails from './components/details/productsDetails';
import OrderDetails from './components/details/orderDetails';
import Logo from './assets/useveranologo.png';
import { fetchProductsRequest } from './store/products';
import { fetchOrdersRequest } from './store/orders';

const Container = styled('div')`
    align-items: center;
    background: white;
    border-style: dashed;
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow: auto;
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
  const { products, orders } = useSelector((state) => state);
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [formMode, setFormMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('1');
  const [initialValues, setInitialValues] = React.useState({});
  const [imagesToDelete, setImagesToDelete] = React.useState([]);

  const selectedProductDetails = products.items.find((item) => item.ProductId === selectedProduct);
  const selectedOrderDetails = orders.items.find((item) => item.OrderId === selectedOrder);
  if (formMode) {
    return (
      <FormExternalWrapper>
        <FormWrapper>
          <Button
            close
            color="danger"
            onClick={() => {
              setImagesToDelete([]);
              setFormMode('');
            }}
          />
          <FormContainer
            imagesToDelete={imagesToDelete}
            setImagesToDelete={setImagesToDelete}
            formMode={formMode}
            initialValues={initialValues}
            dispatch={dispatch}
            setFormMode={setFormMode}
          />
        </FormWrapper>
      </FormExternalWrapper>
    );
  }
  return (
    <AppContainer>
      <Container>
        <img style={{ width: '10vw' }} src={Logo} alt="logo" />
        <Nav
          style={{
            alignItems: 'center',
            width: '100%',
          }}
        >
          <NavItem onClick={() => setActiveTab('1')}>
            <NavLink>
              Produtos
            </NavLink>
          </NavItem>
          <NavItem onClick={() => setActiveTab('2')}>
            Pedidos
          </NavItem>
        </Nav>
        <TabContent
          activeTab={activeTab}
          style={{
            width: '100%',
          }}
        >
          <TabPane tabId="1">
            <ProductsList
              fetchItems={fetchProductsRequest}
              data={products.items}
              selected={selectedProduct}
              setSelected={setSelectedProduct}
              setFormMode={setFormMode}
              dispatch={dispatch}
            />
          </TabPane>
          <TabPane tabId="2">
            <OrdersList
              fetchItems={fetchOrdersRequest}
              data={orders.items}
              selected={selectedOrder}
              setSelected={setSelectedOrder}
              dispatch={dispatch}
            />
          </TabPane>
        </TabContent>
      </Container>
      <Container>
        {
          activeTab === '1'
            ? (
              <ProductDetails
                dispatch={dispatch}
                setInitialValues={setInitialValues}
                product={selectedProductDetails}
                setFormMode={setFormMode}
              />

            )
            : (
              <OrderDetails
                dispatch={dispatch}
                order={selectedOrderDetails}
                setSelected={setSelectedOrder}
              />

            )
        }
      </Container>
    </AppContainer>
  );
}

export default App;
