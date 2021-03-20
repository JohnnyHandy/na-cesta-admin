/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { parseISOString } from '../../utils/functions';

const DetailsSpan = styled('span')`
    align-self: flex-start;
    font-size: 1vw;
`;

const OrderDetails = ({ order }) => {
  const {
    UserId,
    created_at,
    totalPrice,
    products,
    status,
    ProductIds,
    orderDetails,
    OrderId,
  } = order;
  return (
    <>
      <DetailsSpan>
        Id do pedido:
        {' '}
        { OrderId }
      </DetailsSpan>
      <DetailsSpan>
        Criado em:
        {' '}
        { parseISOString(created_at) }
      </DetailsSpan>
      <DetailsSpan>
        Preço final:
        {totalPrice}
      </DetailsSpan>
      <DetailsSpan>
        Status:
        {' '}
        {status}
      </DetailsSpan>
      <DetailsSpan>
        Id do comprador:
        {UserId}
      </DetailsSpan>
      <DetailsSpan>
        Ids dos Produtos
        {ProductIds.map((item) => (
          <DetailsSpan>
            {' '}
            { item }
            {' '}
          </DetailsSpan>
        ))}
      </DetailsSpan>
      <DetailsSpan>
        Detalhes do pedido:
        {
          Object.keys(orderDetails).map((item) => (
            <DetailsSpan>
              {item}
              {' '}
              :
              {' '}
              {orderDetails[item]}
            </DetailsSpan>
          ))
        }
        {
          products.map((item) => (
            <DetailsSpan>
              {' '}
              {item.name}
              {' '}
            </DetailsSpan>
          ))
        }
      </DetailsSpan>
    </>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    UserId: PropTypes.string,
    OrderId: PropTypes.string,
    created_at: PropTypes.string,
    totalPrice: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.object),
    status: PropTypes.string,
    ProductIds: PropTypes.arrayOf(PropTypes.string),
    orderDetails: PropTypes.shape({
      discount: PropTypes.number,
      paymentMethod: PropTypes.string,
      deliverCost: PropTypes.number,
      discountCode: PropTypes.string,
      deliverMethod: PropTypes.string,
      totalCost: PropTypes.number,
    }),
  })
  ,

};

OrderDetails.defaultProps = {
  order: {
    UserId: '',
    created_at: '',
    totalPrice: 0,
    products: [{}],
    status: '',
    ProductIds: [''],
    orderDetails: {
      discount: 0,
      paymentMethod: '',
      deliverCost: 0,
      discountCode: '',
      deliverMethod: '',
      totalCost: 0,
    },
    OrderId: '',
  },
};

export default OrderDetails;
