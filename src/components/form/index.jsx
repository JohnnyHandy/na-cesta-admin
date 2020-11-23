import React from 'react';
import PropTypes from 'prop-types';
import {
  Field, FieldArray, reduxForm, getFormValues,
} from 'redux-form';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  Form,
  Label,
  ListGroup,
  ListGroupItem,
  Button,
  Input as Select,

} from 'reactstrap';

import { colors, sizeOptions } from '../../utils/constants';

const FormSection = styled('div')`
    display: grid;
    grid-template-columns: 30% 60%
`;

const ColorChoiceContainer = styled('div')`
    display: grid;
    grid-template-columns: 60% 20% 10%;
    justify-content: space-around
`;

const SizeChoiceContainer = styled('div')`
    display: grid;
    grid-template-columns: 30% 10%;
    justify-content: flex-start;
    position: relative;
`;

const Input = styled('input')`
`;

const TextInput = ({ input }) => (
  <Input {...input} type="text" />
);
const Checkbox = (props) => <Input {...props} type="checkbox" />;

const TextArea = styled('textarea')`
`;

const InputLabel = styled(Label)`
    display: block
`;

const RenderSelectInput = ({
  input, options, disabledOptions,
}) => (
  <Select
    size="sm"
    type="select"
    {...input}
  >
    {options.map((item) => (
      <option
        disabled={disabledOptions.includes(item)}
        key={item}
        value={item}
      >
        {item}
      </option>
    ))}
  </Select>
);

const ProductForm = () => {
  const state = useSelector((globalState) => globalState);
  const formValues = getFormValues('productsForm')(state);
  const detailsFormValue = formValues && formValues.details;

  const renderColorsForm = ({ fields }) => {
    const value = fields.getAll();
    const getColors = value && value.map(((item) => item.colorId));

    return (
      <>
        <Button
          style={{
            position: 'absolute',
            right: ' 1vw',
            top: '1vh',
          }}
          size="sm"
          onClick={() => fields.push({
            colorId: '',
            quantity: '',
          })}
          disabled={value && value.length >= colors.length - 1}
        >
          Adicionar cor
        </Button>

        <ListGroup
          style={{
            display: 'grid',
            gridTemplateColumns: '33% 33% 33%',
            margin: '0.5vh auto',
          }}
        >
          {fields.map((newColor, fieldIndex) => (
            <ListGroupItem
              style={{
                padding: '1vh 0',
                border: '1px solid #c6c6c6',
              }}
              key={newColor}
            >
              <ColorChoiceContainer>
                <Field
                  options={colors.map((item) => item.id)}
                  disabledOptions={getColors}
                  name={`${newColor}.colorId`}
                  component={RenderSelectInput}
                />
                <Field
                  component={TextInput}
                  name={`${newColor}.quantity`}
                />
                <Button close onClick={() => fields.remove(fieldIndex)} />
              </ColorChoiceContainer>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  };

  const renderDetailsForm = ({ fields }) => {
    const value = fields.getAll();
    const getMeasures = value && value.map(((item) => item.measure));
    return (
      <>
        <Button
          onClick={() => {
            fields.push({
              measure: '',
            });
          }}
        >
          Adicionar Tamanho
        </Button>
        <ListGroup>
          {fields.map((newItem, fieldIndex) => (
            <ListGroupItem
              style={{
                padding: '1vh 0.5vw',
                margin: '0.5vh 0',
                border: '1px solid #c6c6c6',
              }}
              key={newItem}
            >
              <SizeChoiceContainer>
                <Field
                  component={RenderSelectInput}
                  name={`${newItem}.measure`}
                  label="Tamanho"
                  options={sizeOptions}
                  disabledOptions={getMeasures}
                />
                <Button close onClick={() => fields.remove(fieldIndex)} />
              </SizeChoiceContainer>
              {getMeasures[fieldIndex]
                          && (
                            <FieldArray
                              name={`${newItem}.colors`}
                              component={renderColorsForm}
                            />
                          )}

            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  };

  console.log('details', detailsFormValue);
  return (
    <Form
      style={{
        padding: '5vh 1vw',
      }}
    >
      <FormSection>
        <div>
          <InputLabel htmlFor="name">Nome</InputLabel>
          <Field
            component={TextInput}
            name="name"
            placeholder="Nome"
            id="name"
          />
          <InputLabel htmlFor="model">Modelo</InputLabel>
          <Field
            component={TextInput}
            name="model"
            placeholder="Modelo"
            id="model"
          />
          <InputLabel htmlFor="description">Descrição</InputLabel>
          <Field
            component={TextArea}
            name="description"
            placeholder="Nome"
            id="description"
          />
          <InputLabel htmlFor="price">Preço</InputLabel>
          <Field
            component={TextInput}
            name="price"
            placeholder="Preço"
            id="price"
          />
          <InputLabel htmlFor="price">Promocional</InputLabel>
          <Field
            component={TextInput}
            name="price"
            placeholder="Preço"
            id="price"
          />
          <InputLabel htmlFor="isDeal">Marcar como Oferta</InputLabel>
          <Field
            component={Checkbox}
            name="isDeal"
            id="isDeal"
          />
          <InputLabel htmlFor="details">Detalhes</InputLabel>
        </div>
        <div>
          <FieldArray
            name="details"
            component={renderDetailsForm}
            value={detailsFormValue}
          />
        </div>
      </FormSection>
    </Form>
  );
};

TextInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.object).isRequired,
};

RenderSelectInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.object).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabledOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default reduxForm({ form: 'productsForm' })(ProductForm);
