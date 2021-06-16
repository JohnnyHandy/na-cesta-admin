/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from 'reactstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

import http from '../../utils/http';
import { updateCredentialsRequest } from '../../store/auth';
import { deleteProductRequest } from '../../store/products';

const ProductDetailsWrapper = styled('div')` 
  align-items: center;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50% 50%;
  justify-items: center;
`;
const ProductsWrapper = styled('div')`
  background-color: darkblue;
  border: 1px solid black;
  color: white;
  padding: 1%;
  position: relative;

`;

const fetchModelProducts = (id) => (
  http.get(`/models/${id}/products`)
);

const ProductsList = ({
  model,
  dispatch,
}) => {
  const history = useHistory();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchProducts = async (id) => {
    setLoading(true);
    await fetchModelProducts(id).then((response) => {
      if (response.status === 200) {
        dispatch(updateCredentialsRequest(response.headers));
        setProducts(response.data);
        setLoading(false);
      }
    });
  };
  React.useEffect(async () => {
    if (model) {
      await fetchProducts(model.id);
    }
  }, [model]);
  if (loading) {
    <span> Carregando... </span>;
  }
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          margin: '1em 0', padding: '1em 0', width: '100%',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
          }}
        >
          {' '}
          {model?.name}
          {' '}
        </span>
        <div
          style={{
            display: model ? 'grid' : 'none',
            gridTemplateColumns: '20% 20% 20%',
            gridTemplateRows: '50% 50%',
            width: '100%',
          }}
        >
          <span>
            Oferta:
            {model?.is_deal ? 'Sim' : 'Não'}
          </span>
          <span>
            Desconto:
            {model?.discount}
          </span>
          <span>
            Preço:
            {model?.price}
          </span>
          <span>
            Preço Promocional:
            {model?.deal_price}
          </span>
          <span>
            Ativado:
            {model?.enabled ? 'Ativado' : 'Desativado'}
          </span>
        </div>
        <div>
          <span>Descrição:</span>
          <span>{model?.description}</span>
        </div>
        <div
          style={{ position: 'absolute', right: '0', top: '0' }}
        >
          {products && products.length !== 0 && (
          <Button
            style={{
              margin: '0 0.5em',
            }}
            onClick={() => history.push(`/models/edit/${model.id}`)}
            color="warning"
          >
            Editar modelo
          </Button>
          )}
          <Button
            style={{
              margin: '0 0.5em',
            }}
            onClick={() => history.push('/products/new')}
          >
            Criar produto
          </Button>

        </div>
      </div>
      {
        products && products.length === 0 ? (
          <span> Sem produtos cadastrados </span>
        ) : products.map((product) => (
          <ProductsWrapper>
            <div
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
              }}
            >
              <Button
                style={{ padding: '0.2em', margin: '0 0.2em' }}
                size="small"
                color="warning"
                onClick={() => {
                  history.push(`/products/edit/${product.id}`);
                }}
              >
                <AiFillEdit />
              </Button>
              <Button
                style={{ padding: '0.2em', margin: '0 0.2em' }}
                size="small"
                color="danger"
                onClick={() => {
                  const updateProductsList = () => fetchProducts(model.id);
                  dispatch(deleteProductRequest({ productId: product.id, updateProductsList }));
                }}
              >
                <AiFillDelete />
              </Button>
            </div>
            <span>
              {product.name}
            </span>
            <ProductDetailsWrapper>
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
                <span>
                  Cor:
                </span>
                <div style={{ background: `${product.color}`, height: '20px', width: '20px' }} />
              </div>
              <span>
                Tamanho:
                {product.sizes}
              </span>
              <span>
                Oferta:
                {product.is_deal ? 'Sim' : 'Não'}
              </span>
              <span>
                Desconto:
                {product.discount}
              </span>
              <span>
                Preço: R$
                {product.price}
              </span>
              <span>
                Promocional
                {product.deal_price}
              </span>
              <span>
                Estoque:
                {product.stocks.map((stock) => (
                  <span>
                    {' '}
                    {stock.size}
                    {' '}
                    :
                    {stock.quantity}
                  </span>
                ))}
              </span>
              <span>
                Status:
                {product.enabled ? 'Ativado' : 'Desativado'}
              </span>

            </ProductDetailsWrapper>
          </ProductsWrapper>
        ))
      }
    </div>
  );
};

ProductsList.propTypes = {
  model: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string],
  )).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ProductsList;
