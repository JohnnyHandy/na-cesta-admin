import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  Nav, NavItem, TabPane, TabContent, NavLink,
} from 'reactstrap';

import ModelsList from '../List/models';
import OrdersList from '../List/orders';
import ProductsList from '../List/products';
import OrderDetails from '../details/orderDetails';

import { fetchModelsRequest } from '../../store/models';
import { fetchOrdersRequest } from '../../store/orders';

import Logo from '../../assets/useveranologo.png';

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
  display: grid;
  grid-template-columns: 25% 65%;
  min-height:100vh;
  justify-content: space-around;
  padding: 2vh 2vw;
  position: relative
`;

const DashboardView = () => {
  const dispatch = useDispatch();
  const { models, orders } = useSelector((reduxState) => reduxState);
  const [selectedModel, setSelectedModel] = React.useState('');
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('1');

  const selectedModelDetails = models.items.find((item) => item.id === selectedModel);
  const selectedOrderDetails = orders.items.find((item) => item.id === selectedOrder);

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
          <NavItem style={{ cursor: 'pointer' }} onClick={() => setActiveTab('1')}>
            <NavLink>
              Modelos
            </NavLink>
          </NavItem>
          <NavItem style={{ cursor: 'pointer' }} onClick={() => setActiveTab('2')}>
            <NavLink>
              Pedidos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          activeTab={activeTab}
          style={{
            width: '100%',
          }}
        >
          <TabPane tabId="1">
            <ModelsList
              fetchItems={fetchModelsRequest}
              data={models.items}
              selected={selectedModel}
              setSelected={setSelectedModel}
              // openCreateModelForm={() => {
              //   dispatchAction({ property: 'formAction', value: 'create' });
              //   dispatchAction({ property: 'formType', value: 'model' });
              // }}
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
            <ProductsList
              dispatch={dispatch}
              setSelectedModel={setSelectedModel}
              selectedModel={selectedModel}
              model={selectedModelDetails}
              // openEditProductForm={(initialValues) => {
              //   dispatchAction({ property: 'initialValues', value: initialValues });
              //   dispatchAction({ property: 'formAction', value: 'edit' });
              //   dispatchAction({ property: 'formType', value: 'product' });
              // }}
              // openCreateProductForm={() => {
              //   dispatchAction({ property: 'formAction', value: 'create' });
              //   dispatchAction({ property: 'formType', value: 'product' });
              // }}
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
};

export default DashboardView;
