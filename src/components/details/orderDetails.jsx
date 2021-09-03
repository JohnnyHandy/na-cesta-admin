/* eslint-disable camelcase */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import http from '../../utils/http';
import { parseISOString } from '../../utils/functions';
import { StatusOptions } from '../../utils/constants';
import Loading from '../loading/index';
import { updateCredentialsRequest } from '../../store/auth';

const DetailsSpan = styled('span')`
    align-self: flex-start;
    font-size: 1vw;
`;

const ProductDetailsWrapper = styled('div')` 
  align-items: center;
  background: darkblue;
  color: white;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50% 50%;
  justify-items: center;
  margin: 1em 0;
`;

const fetchOrderDetails = (id) => (
  http.get(`/orders/${id}`)
);

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [orderInfo, setOrderInfo] = React.useState({});
  const fetchProducts = async (id) => {
    setLoading(true);
    await fetchOrderDetails(id).then((response) => {
      if (response.status === 200) {
        const { data: { data: { attributes } }, headers } = response;
        const parsedData = ({
          ...attributes,
          id,
        });
        dispatch(updateCredentialsRequest(headers));
        setOrderInfo(parsedData);
        setLoading(false);
      }
    });
  };
  React.useEffect(async () => {
    if (Object.keys(order).length) {
      await fetchProducts(order.id);
    }
  }, [order]);
  if (Object.keys(order).length === 0) {
    return <h2> Selecione um pedido </h2>;
  }
  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        rowGap: '1em',
        width: '100%',
      }}
    >
      <div
        style={{
          alignContent: 'space-around',
          background: 'lemonchiffon',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 0.5fr)',
          justifyItems: 'center',
        }}
      >
        <DetailsSpan>
          Id do pedido:
          { order.id }
        </DetailsSpan>
        <DetailsSpan>
          Criado em:
          { orderInfo.created_at && parseISOString(orderInfo.created_at) }
        </DetailsSpan>
        <DetailsSpan>
          Preço final:
          {`R$ ${orderInfo.total}`}
        </DetailsSpan>
        <DetailsSpan>
          Status:
          {orderInfo.status
        && StatusOptions.find((statusItem) => statusItem.value === orderInfo.status)?.label}
        </DetailsSpan>
      </div>
      <div
        style={{
          background: 'aquamarine',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          style={{
            display: 'grid',
          }}
        >
          <DetailsSpan>
            Comprador
          </DetailsSpan>
          <DetailsSpan>
            Id do usuário:
            {orderInfo.user?.id}
          </DetailsSpan>
          <DetailsSpan>
            {orderInfo.user?.name}
          </DetailsSpan>
          <DetailsSpan>
            Telefone:
            {orderInfo.user?.phone}
          </DetailsSpan>
          <DetailsSpan>
            Email:
            {orderInfo.user?.email}
          </DetailsSpan>
        </div>
        <div
          style={{
            display: 'grid',
          }}
        >
          <DetailsSpan>
            Endereço de entrega
          </DetailsSpan>
          <DetailsSpan>
            Cep:
            {orderInfo.address?.cep}
          </DetailsSpan>
          <DetailsSpan>
            Rua:
            {orderInfo.address?.street}
          </DetailsSpan>
          <DetailsSpan>
            Numero:
            {orderInfo.address?.number}
          </DetailsSpan>
          <DetailsSpan>
            Complemento:
            {orderInfo.address?.complement}
          </DetailsSpan>
          <DetailsSpan>
            Bairro:
            {orderInfo.address?.neighbourhood}
          </DetailsSpan>
          <DetailsSpan>
            Cidade:
            {orderInfo.address?.city}
          </DetailsSpan>
          <DetailsSpan>
            Estado:
            {orderInfo.address?.state}
          </DetailsSpan>
        </div>
      </div>
      <div
        style={{
          gridColumn: '1 / -1',
        }}
      >
        {
          orderInfo.order_items && orderInfo.order_items.map((product, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProductDetailsWrapper key={`${product.name}-${index}`}>
              <DetailsSpan>
                {product.name}
              </DetailsSpan>

              {
                    product.image_url && product.image_url.length && (
                      <div style={{ gridRow: '1/-1' }}>
                        <img style={{ width: '50%', height: '50%' }} src={product.image_url[0].url} alt={product.name} />
                      </div>
                    )
                  }
              <div
                style={{
                  display: 'flex',
                }}
              >
                <DetailsSpan>
                  Cor:
                </DetailsSpan>
                <div style={{
                  alignSelf: 'center', background: `${product.color}`, height: '20px', width: '20px',
                }}
                />
              </div>
              <DetailsSpan>
                Tamanho:
                {product.size}
              </DetailsSpan>
              <DetailsSpan>
                Quantidade:
                {product.quantity}
              </DetailsSpan>
              <DetailsSpan>
                Oferta:
                {product.is_deal ? 'Sim' : 'Não'}
              </DetailsSpan>
              <DetailsSpan>
                Desconto %:
                {product.discount}
              </DetailsSpan>
              <DetailsSpan>
                Preço:
                {`R$ ${product.subtotal}`}
              </DetailsSpan>
              <DetailsSpan>
                Promocional:
                {`R$ ${product.deal_price || ''}`}
              </DetailsSpan>
              <DetailsSpan>
                Status:
                {product.enabled ? 'Ativado' : 'Desativado'}
              </DetailsSpan>
            </ProductDetailsWrapper>
          ))
        }
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    UserId: PropTypes.string,
    id: PropTypes.number,
    created_at: PropTypes.string,
    total: PropTypes.number,
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
  order: {},
};

export default OrderDetails;
