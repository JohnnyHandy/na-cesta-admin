import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from 'reactstrap';

import ImageDetails from './imageDetails';
import MeasureDetails from './measuresDetails';

const DetailsSpan = styled('span')`
    align-self: flex-start;
    font-size: 1vw;
`;
const ButtonsContainer = styled('div')`
    display: flex;

    justify-content: space-around;
    position: absolute;
    width: 100%;
`;

const ProductDetails = ({
  product,
  setFormMode,
}) => {
  if (!product) {
    return <span> Select a product </span>;
  }
  const {
    name = '',
    images = [],
    type = '',
    description = '',
    details = [],
    price = '',
    dealPrice = '',
    isDeal = false,
    quantity = '',
  } = product;
  return (
    <>
      <span>
        {' '}
        {name}
        {' '}
      </span>
      <ImageDetails
        images={images.map((item) => ({
          src: `https://${process.env.REACT_APP_S3_BUCKET}.s3-${process.env.REACT_APP_REGION}.amazonaws.com/${item.key}`,
          objectKey: item.key,
        }))}
      />
      <DetailsSpan>
        Tipo:
        {type}
      </DetailsSpan>
      <DetailsSpan>
        Descrição:
        {description}
      </DetailsSpan>
      <MeasureDetails details={details} />
      <DetailsSpan>
        {' '}
        Preço: $
        {price}
      </DetailsSpan>
      <DetailsSpan>
        {' '}
        Promocional: $
        {dealPrice}
      </DetailsSpan>
      <DetailsSpan>
        Quantidade: $
        {quantity}
      </DetailsSpan>
      <DetailsSpan>
        Marcar como oferta:
        {isDeal ? 'Sim' : 'Não'}
      </DetailsSpan>
      <ButtonsContainer>
        <Button onClick={() => setFormMode()} color="warning"> Editar </Button>
        <Button color="danger"> Deletar </Button>
      </ButtonsContainer>
    </>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool,
  ])),
  setFormMode: PropTypes.func.isRequired,
};

ProductDetails.defaultProps = {
  product: {},
};

export default ProductDetails;
