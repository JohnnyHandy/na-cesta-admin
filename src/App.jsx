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
import ModelsList from './components/List/models';
import OrdersList from './components/List/orders';
import ProductsList from './components/List/products';
import ProductFormContainer from './container/form/products';
import ModelFormContainer from './container/form/models';
import OrderDetails from './components/details/orderDetails';
import Logo from './assets/useveranologo.png';
import { fetchModelsRequest } from './store/models';
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
const initialState = {
  formAction: '',
  formType: '',
  initialValues: null,
};
const reducer = (state, action) => ({ ...state, [action.property]: action.value });

function App() {
  const dispatch = useDispatch();
  const [state, dispatchAction] = React.useReducer(reducer, initialState);
  const { models, orders } = useSelector((reduxState) => reduxState);
  const [selectedModel, setSelectedModel] = React.useState('');
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('1');
  const [imagesToDelete, setImagesToDelete] = React.useState([]);

  const selectedModelDetails = models.items.find((item) => item.id === selectedModel);
  const selectedOrderDetails = orders.items.find((item) => item.OrderId === selectedOrder);
  const resetForm = () => {
    dispatchAction({ property: 'formAction', value: '' });
    dispatchAction({ property: 'formType', value: '' });
    dispatchAction({ property: 'initialValues', value: null });
  };
  if (state.formType) {
    return (
      <FormExternalWrapper>
        <FormWrapper>
          <Button
            close
            color="danger"
            onClick={() => {
              setImagesToDelete([]);
              resetForm();
            }}
          />
          {
          state.formType === 'product' ? (
            <ProductFormContainer
              imagesToDelete={imagesToDelete}
              setImagesToDelete={setImagesToDelete}
              formType={state.formType}
              initialValues={state.initialValues}
              dispatch={dispatch}
              selectedModel={selectedModel}
              models={models.items}
              resetForm={resetForm}
              isEditing={state.formAction === 'edit'}
            />
          )
            : (
              <ModelFormContainer
                resetForm={resetForm}
                imagesToDelete={imagesToDelete}
                setImagesToDelete={setImagesToDelete}
                formType={state.formType}
                initialValues={state.initialValues}
                dispatch={dispatch}
                selectedModel={selectedModel}
                models={models.items}
              />
            )
        }
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
              Modelos
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
            <ModelsList
              fetchItems={fetchModelsRequest}
              data={models.items}
              selected={selectedModel}
              setSelected={setSelectedModel}
              openCreateModelForm={() => {
                dispatchAction({ property: 'formAction', value: 'create' });
                dispatchAction({ property: 'formType', value: 'model' });
              }}
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
                openEditProductForm={(initialValues) => {
                  dispatchAction({ property: 'initialValues', value: initialValues });
                  dispatchAction({ property: 'formAction', value: 'edit' });
                  dispatchAction({ property: 'formType', value: 'product' });
                }}
                openCreateProductForm={() => {
                  dispatchAction({ property: 'formAction', value: 'create' });
                  dispatchAction({ property: 'formType', value: 'product' });
                }}
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
