import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'reactstrap'

import ImageDetails from './imageDetails'
import MeasureDetails from './measuresDetails'

const DetailsSpan = styled('span')`
    align-self: flex-start
`
const ProductDetailsContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ButtonsContainer = styled('div')`
    display: flex;
    width: 100%;
    justify-content: space-around
`

const ProductDetails = ({
    product
}) => {
    if(!Boolean(product)) {
        return <span> Select a product </span>
    }
    const {
        name = '',
        images = [],
        type='',
        description='',
        details=[],
        price='',
        dealPrice='',
        isDeal=false
    } = product
    return (
        <ProductDetailsContainer>
            <span> {name} </span>
            <ImageDetails images={images} />
            <DetailsSpan >Tipo: {type}</DetailsSpan>
            <DetailsSpan >Descrição: {description}</DetailsSpan>
            <MeasureDetails details={details} />
            <DetailsSpan> Preço: ${price} </DetailsSpan>
            <DetailsSpan> Promocional: ${dealPrice} </DetailsSpan>
            <DetailsSpan>Marcar como oferta: {isDeal ? 'Sim' : 'Não'}</DetailsSpan>
            <ButtonsContainer>
                <Button color='warning'> Editar </Button>
                <Button color='danger' > Deletar </Button>
            </ButtonsContainer>
        </ProductDetailsContainer>
    )
}

export default ProductDetails