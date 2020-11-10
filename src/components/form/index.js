import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'
import { Form, Label } from 'reactstrap'

const Input = styled('input')`

`

const TextInput = props => <Input {...props} type="text" />
const Checkbox = props => <Input {...props} type='checkbox' />
const TextArea = styled('textarea')`
`

const InputLabel = styled(Label)`
    display: block
`


const ProductForm = () => {
    return (
        <Form
            style={{
                padding: '5vh 5vw'
            }}
        >
            <InputLabel htmlFor='name'>Nome</InputLabel>
            <Field
                component={TextInput}
                name='name'
                placeholder='Nome'
                id='name'
            />
            <InputLabel htmlFor='model'>Modelo</InputLabel>
            <Field
                component={TextInput}
                name='model'
                placeholder='Modelo'
                id='model'
            />
            <InputLabel htmlFor='description'>Descrição</InputLabel>
            <Field
                component={TextArea}
                name='description'
                placeholder='Nome'
                id='description'
            />
            <InputLabel htmlFor='price'>Preço</InputLabel>
            <Field
                component={TextInput}
                name='price'
                placeholder='Preço'
                id='price'
            />
            <InputLabel htmlFor='price'>Promocional</InputLabel>
            <Field
                component={TextInput}
                name='price'
                placeholder='Preço'
                id='price' 
            />
            <InputLabel htmlFor='isDeal'>Marcar como Oferta</InputLabel>
            <Field
                component={Checkbox}
                name='isDeal'
                id='isDeal'
            
            />
        </Form>
    )
}

export default reduxForm({ form: 'productsForm' })(ProductForm)