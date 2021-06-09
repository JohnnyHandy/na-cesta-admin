import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
  reduxForm,
  getFormValues,
} from 'redux-form';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  Form,
  Label,
  Input as Select,
  Button,
} from 'reactstrap';

import UploadComponent from '../crop/index';

const FormSection = styled(Form)`
  background: white;
  border: 2px dashed;
  display: grid;
  overflow: auto;
  padding: 2em;
  position:relative;
`;

const FormExternalWrapper = styled('div')`
  align-items: center;
  height: 80%;
  display: flex;
  justify-content: space-around;
  padding: 2vh 2vw;
`;

const Input = styled('input')`
  max-width: 15em;
`;

const ColorInput = ({ input }) => (
  <Input type="color" {...input} />
);

const TextInput = ({ input }) => (
  <Input {...input} size="sm" type="text" />
);
const Checkbox = ({ input }) => <Input {...input} type="checkbox" />;

const TextArea = styled('textarea')`
  max-width: 15em;
`;
const TextAreaInput = ({ input }) => <TextArea {...input} />;

const InputLabel = styled(Label)`
    display: block
`;

const SizeOptions = [
  {
    name: 'Selecione um tamanho',
    value: '',
  },
  {
    name: 'P',
    value: 'P',
  },
  {
    name: 'M',
    value: 'M',
  },
  {
    name: 'G',
    value: 'G',
  },
];
const RenderSelectInput = ({
  input, options, style,
}) => (
  <Select
    size="sm"
    type="select"
    style={style}
    {...input}
  >
    {options.map((item) => (
      <option
        key={item.value}
        value={item.value}
      >
        {item.name}
      </option>
    ))}
  </Select>
);

const ProductDataSection = ({ modelOptions }) => (
  <>
    <InputLabel htmlFor="name">Nome</InputLabel>
    <Field
      component={TextInput}
      name="name"
      placeholder="Nome"
      id="name"
    />
    <InputLabel htmlFor="model">Modelo</InputLabel>
    <Field
      component={RenderSelectInput}
      name="model_id"
      placeholder="Modelo"
      id="model"
      options={modelOptions}
      style={{ width: '15em' }}
    />
    <InputLabel htmlFor="description">Descrição</InputLabel>
    <Field
      component={TextAreaInput}
      name="description"
      placeholder="Nome"
      id="description"
    />
    <InputLabel htmlFor="size">Tamanho</InputLabel>
    <Field
      component={RenderSelectInput}
      name="size"
      placeholder="Tamanho"
      id="size"
      options={SizeOptions}
      style={{ width: '15em' }}
    />
    <InputLabel htmlFor="color"> Cor </InputLabel>
    <Field
      component={ColorInput}
      name="color"
      placeholder="Cor"
      id="color"
      type="color"
    />
    <InputLabel htmlFor="price">Preço</InputLabel>
    <Field
      component={TextInput}
      name="price"
      placeholder="Preço"
      id="price"
    />
    <InputLabel htmlFor="dealPrice">Promocional</InputLabel>
    <Field
      component={TextInput}
      name="deal_price"
      placeholder="Preço"
      id="dealPrice"
    />
    <InputLabel htmlFor="discount">Desconto</InputLabel>
    <Field
      component={TextInput}
      name="discount"
      placeholder="Preço"
      id="discount"
    />
    <InputLabel htmlFor="in_stock">Em estoque</InputLabel>
    <Field
      component={TextInput}
      name="in_stock"
      placeholder="Em estoque"
      id="in_stock"
    />
    <InputLabel htmlFor="isDeal">Marcar como Oferta</InputLabel>
    <Field
      component={Checkbox}
      name="is_deal"
      id="isDeal"
    />
    <InputLabel htmlFor="enabled">Ativar / Desativar</InputLabel>
    <Field
      component={Checkbox}
      name="enabled"
      id="enabled"
    />
  </>

);

const ProductForm = (props) => {
  const {
    handleSubmit,
    imagesToDelete,
    setImagesToDelete,
    models,
  } = props;
  const history = useHistory();
  const state = useSelector((getState) => getState);
  const productsState = state.products;
  const formValues = getFormValues('productsForm')(state);
  const productId = formValues && formValues.id;
  const imagesValue = formValues && formValues.images;
  const modelOptions = models.map((model) => ({
    name: `${model.name} - ${model.ref}`,
    value: model.id,
  }));
  modelOptions.unshift({ name: 'Selecione um modelo', value: '' });
  return (
    <FormExternalWrapper>
      <FormSection
        onSubmit={handleSubmit}
      >
        <Button
          close
          style={{ position: 'absolute', right: '1em', top: '1em' }}
          onClick={() => history.push('/')}
        />
        <ProductDataSection modelOptions={modelOptions} />
        <FieldArray
          imagesToDelete={imagesToDelete}
          setImagesToDelete={setImagesToDelete}
          productsState={productsState}
          name="images"
          component={UploadComponent}
          values={imagesValue}
          formValues={formValues}
          productId={productId}
        />
      </FormSection>
    </FormExternalWrapper>
  );
};

TextInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

RenderSelectInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabledOptions: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.objectOf(PropTypes.oneOf([
    PropTypes.string,
  ])),
};
RenderSelectInput.defaultProps = {
  style: {},
  disabledOptions: [],
};

Checkbox.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  imagesToDelete: PropTypes.arrayOf(PropTypes.object),
  setImagesToDelete: PropTypes.func,
  models: PropTypes.bool.isRequired,
};

ProductForm.defaultProps = {
  imagesToDelete: [],
  setImagesToDelete: () => {},
};

TextAreaInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
};

ColorInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
};

ProductDataSection.propTypes = {
  modelOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default reduxForm({ form: 'productsForm' })(ProductForm);
