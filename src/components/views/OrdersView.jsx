import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrdersList from '../List/orders';
import OrderDetails from '../details/orderDetails';
import { AppContainer, Container } from './views.styles';

import { fetchOrdersRequest } from '../../store/orders';

const DashboardView = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((reduxState) => reduxState);
  const [selectedOrder, setSelectedOrder] = React.useState(0);
  const selectedOrderDetails = orders.items.find((item) => item.id === selectedOrder);
  return (
    <AppContainer>
      <Container>
        <OrdersList
          fetchItems={fetchOrdersRequest}
          data={orders.items}
          selected={selectedOrder}
          setSelected={setSelectedOrder}
          dispatch={dispatch}
        />
      </Container>
      <Container>
        <OrderDetails
          dispatch={dispatch}
          order={selectedOrderDetails}
          setSelected={setSelectedOrder}
        />

      </Container>
    </AppContainer>

  );
};

export default DashboardView;
