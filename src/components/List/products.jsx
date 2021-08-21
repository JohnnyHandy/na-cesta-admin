/* eslint-disable camelcase */
/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
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

const StyledButton = styled(Button)`
  margin: 0 0.5em
`;

const StyledIconButton = styled(Button)`
  margin: 0.2em;
  padding: 0.2em;
`;

const fetchModelProducts = (ref) => (
  http.get(`/models/${ref}/products`)
);

const ProductsList = ({
  model,
  dispatch,
}) => {
  const history = useHistory();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchProducts = async (ref) => {
    setLoading(true);
    await fetchModelProducts(ref).then((response) => {
      if (response.status === 200) {
        const { data: { data }, headers } = response;
        const parsedData = data.map(({ attributes, id }) => ({
          ...attributes,
          id,
          images: attributes?.images && attributes?.images.sort((a, b) => {
            if (a.filename.charAt(0) < b.filename.charAt(0)) {
              return -1;
            }
            if (a.filename.charAt(0) > b.filename.charAt(0)) {
              return 1;
            }
            return 0;
          }),
        }));
        dispatch(updateCredentialsRequest(headers));
        setProducts(parsedData);
        setLoading(false);
      }
    });
  };
  React.useEffect(async () => {
    if (model.id) {
      await fetchProducts(model.id);
    }
  }, [model]);
  if (loading) {
    <span> Carregando... </span>;
  }
  if (Object.keys(model).length === 0) {
    return <h2> Selecione um modelo </h2>;
  }
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin: 1em 0;
          padding: 1em 0;
          width:100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          `}
        >
          <span
            css={css`
              font-size: 1.5em;
              font-weight: bold;
              margin: auto;
            `}
          >
            {' '}
            {model?.name}
            {' '}
          </span>
          <div
            css={css`
              display: grid;
              grid-template-columns: 33% 33% 33%;
              grid-template-rows: 50% 50%;
            `}
          >
            <span>
              Marcado como oferta:
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

        </div>
        <div>
          {model && (
          <StyledButton
            onClick={() => history.push(`/models/edit/${model.id}`)}
            color="warning"
          >
            Editar modelo
          </StyledButton>
          )}
          <StyledButton
            onClick={() => {
              const additionalState = {};
              if (model.id) {
                additionalState.modelId = model.id;
              }
              history.push('/products/new', { ...additionalState });
            }}
          >
            Criar produto
          </StyledButton>

        </div>
      </div>
      <div
        css={css`
            overflow:auto;
            max-height: 60vh;
        `}
      >
        {
        products && products.length === 0 ? (
          <span> Sem produtos cadastrados </span>
        ) : products.map((product) => (
          <ProductsWrapper
            key={product.id}
          >
            <div
              css={css`
                position: absolute;
                right: 0;
                top: 0;
              `}
            >
              <StyledIconButton
                size="small"
                color="warning"
                onClick={() => {
                  history.push(`/products/edit/${product.id}`);
                }}
              >
                <AiFillEdit />
              </StyledIconButton>
              <StyledIconButton
                size="small"
                color="danger"
                onClick={() => {
                  const updateProductsList = () => fetchProducts(model.id);
                  dispatch(deleteProductRequest({ productId: product.id, updateProductsList }));
                }}
              >
                <AiFillDelete />
              </StyledIconButton>
            </div>
            <span
              css={css`font-weight: bold;`}
            >
              {product.name}
            </span>
            <ProductDetailsWrapper>
              {
                product.images && product.images[0] && (
                  <div css={css`grid-row: 1/-1`}>
                    <img
                      css={css`
                        height: 50%;
                        width: 50%;
                      `}
                      src={product.images[0].url}
                      alt={product.name}
                    />
                  </div>
                )
              }
              <div
                style={{
                  display: 'grid',
                }}
              >
                <span>
                  Cor
                </span>
                <div
                  css={css`
                    background: ${product.color};
                    height: 20px;
                    width: 20px;
                  `}
                />
              </div>
              <div
                css={css` display: grid; text-align: center; `}
              >
                <span>
                  Oferta:
                </span>
                <span>
                  {product.is_deal === null && 'Oferta do modelo'}
                  {product.is_deal === true && 'Sim'}
                  {product.is_deal === false && 'Não'}
                </span>
              </div>
              <div
                css={css` display: grid; text-align: center; `}
              >
                <span> Desconto </span>
                <span>
                  {product.discount === null
                    ? 'Desconto do modelo'
                    : `R$ ${product.discount}`}
                </span>
              </div>
              <div
                css={css` display: grid; text-align: center; `}
              >
                <span> Preço </span>
                <span>
                  {product.price === null
                    ? 'Preço do modelo'
                    : `R$ ${product.price}`}
                </span>
              </div>
              <div
                css={css` display: grid; text-align: center; `}
              >
                <span> Preço promocional </span>
                <span>
                  {product.deal_price === null
                    ? 'Preço promocional do modelo'
                    : `R$ ${product.deal_price}`}
                </span>
              </div>
              <div
                css={css` display: grid; text-align: center; `}
              >
                <span> Estoque </span>
                <span>
                  {' '}
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
              </div>
              <span>
                Status:
                {product.enabled ? 'Ativado' : 'Desativado'}
              </span>

            </ProductDetailsWrapper>
          </ProductsWrapper>
        ))
      }

      </div>
    </div>
  );
};

ProductsList.propTypes = {
  model: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string],
  )),
  dispatch: PropTypes.func.isRequired,
};

ProductsList.defaultProps = {
  model: {},
};

export default ProductsList;
