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
  grid-template-columns: 50% 50%;
  overflow: auto;
  padding: 2em;
  position:relative;
`;

const FormExternalWrapper = styled('div')`
`;

const Input = styled('input')`
  max-width: 15em;
`;
const InputLabel = styled(Label)`
    display: block;
    margin-top: 1em;
`;

const ColorInput = ({ input }) => (
  <Input type="color" {...input} />
);

const TextInput = ({
  input, likeModel = false, setNullValues, ...rest
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Input {...rest} {...input} bsSize="sm" type="text" />
    {likeModel && (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        style={{ margin: '0 1em' }}
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) {
            setNullValues((nullValues) => nullValues.concat(input.name));
          } else {
            setNullValues((nullValues) => nullValues.filter((value) => value !== input.name));
          }
        }}
      />
      <span>
        {`Usar ${rest.placeholder.toLowerCase()} do modelo`}
      </span>
    </div>
    )}
  </div>
);
const Checkbox = ({
  input, likeModel, setNullValues, ...rest
}) => (
  (
    <div>
      <Input {...rest} {...input} type="checkbox" />
      {likeModel && (
      <>
        <Input
          style={{ margin: '0 1em' }}
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setNullValues((nullValues) => nullValues.concat(input.name));
            } else {
              setNullValues((nullValues) => nullValues.filter((value) => value !== input.name));
            }
          }}
        />
        <span>
          {`Usar ${rest.placeholder.toLowerCase()} do modelo`}
        </span>
      </>
      )}
    </div>
  )
);

const TextArea = styled('textarea')`
  max-width: 15em;
`;
const TextAreaInput = ({
  input, likeModel, setNullValues, ...rest
}) => (
  <div
    style={{ display: 'flex', alignItems: 'center' }}
  >
    <TextArea {...rest} {...input} />
    {likeModel && (
    <div
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Input
        style={{ margin: '0 1em' }}
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) {
            setNullValues((nullValues) => nullValues.concat(input.name));
          } else {
            setNullValues((nullValues) => nullValues.filter((value) => value !== input.name));
          }
        }}
      />
      <span>
        {`Usar ${rest.placeholder.toLowerCase()} do modelo`}
      </span>
    </div>
    )}
  </div>

);

const RenderSelectInput = ({
  input, options, ...rest
}) => (
  <Select
    size="sm"
    type="select"
    {...rest}
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

const renderSizesField = ({ fields, setStocksToDelete }) => (
  <div>
    {fields.map((newSize, index) => (
      <div
        key={newSize}
        style={{ display: 'flex' }}
      >
        <div>
          <InputLabel>
            {'Tamanho '}

            {index + 1}
          </InputLabel>
          <Field
            component={TextInput}
            name={`${newSize}.size`}
            style={{ marginRight: '1em' }}
          />
        </div>
        <div>
          <InputLabel>
            Quantidade
          </InputLabel>
          <Field
            component={TextInput}
            name={`${newSize}.quantity`}
            style={{ marginLeft: '1em' }}
          />
        </div>
        <Button
          close
          style={{
            alignSelf: 'flex-end',
            background: 'red',
            color: 'white',
            marginLeft: '1em',
            padding: '0.5em',
          }}
          onClick={() => {
            const value = fields.get(index);
            if (value.stored) {
              setStocksToDelete((sizes) => [...sizes, value]);
            }
            fields.remove(index);
          }}
        />
      </div>
    ))}
    <Button
      onClick={() => fields.push({
        size: '',
        quantity: '',
      })}
      style={{ marginTop: '1em' }}
    >
      Adicionar Tamanho
    </Button>
  </div>
);

const ProductDataSection = ({
  modelOptions, setStocksToDelete, setNullValues, nullValues,
}) => (
  <div style={{ display: 'grid' }}>
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
      placeholder="Descrição"
      id="description"
      setNullValues={setNullValues}
      likeModel
      disabled={nullValues.includes('description')}
    />
    <InputLabel htmlFor="color"> Cor </InputLabel>
    <Field
      component={ColorInput}
      name="color"
      placeholder="Cor"
      id="color"
      type="color"
      setNullValues={setNullValues}
      likeModel
      disabled={nullValues.includes('color')}
    />
    <InputLabel> Tamanhos </InputLabel>
    <FieldArray
      component={renderSizesField}
      name="stocks_attributes"
      setStocksToDelete={setStocksToDelete}
    />
    <InputLabel htmlFor="price">Preço</InputLabel>
    <Field
      component={TextInput}
      name="price"
      placeholder="Preço"
      id="price"
      setNullValues={setNullValues}
      disabled={nullValues.includes('price')}
      likeModel
    />
    <InputLabel htmlFor="dealPrice">Preço Promocional</InputLabel>
    <Field
      component={TextInput}
      name="deal_price"
      placeholder="Preço Promocional"
      id="dealPrice"
      setNullValues={setNullValues}
      disabled={nullValues.includes('deal_price')}
      likeModel
    />
    <InputLabel htmlFor="discount">Desconto</InputLabel>
    <Field
      component={TextInput}
      name="discount"
      placeholder="Desconto"
      id="discount"
      setNullValues={setNullValues}
      likeModel
      disabled={nullValues.includes('discount')}
    />
    <InputLabel htmlFor="isDeal">Marcar como Oferta</InputLabel>
    <Field
      component={Checkbox}
      name="is_deal"
      id="isDeal"
      placeholder="Oferta"
      setNullValues={setNullValues}
      likeModel
      disabled={nullValues.includes('is_deal')}
    />
    <InputLabel htmlFor="enabled">Ativar / Desativar</InputLabel>
    <Field
      component={Checkbox}
      name="enabled"
      id="enabled"
    />
  </div>

);

const ProductForm = (props) => {
  const {
    handleSubmit,
    imagesToDelete,
    setImagesToDelete,
    models,
    ...rest
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
        <ProductDataSection
          formValues={formValues}
          modelOptions={modelOptions}
          {...rest}
        />
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
        <Button style={{ justifySelf: 'center', margin: '1em 0', gridColumn: '1/-1' }} type="submit"> Salvar produto </Button>
      </FormSection>
    </FormExternalWrapper>
  );
};

TextInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
  likeModel: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  meta: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
  setNullValues: PropTypes.func,
};

TextInput.defaultProps = {
  likeModel: false,
  setNullValues: () => {},
};

RenderSelectInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Checkbox.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
  likeModel: PropTypes.bool,
  setNullValues: PropTypes.func,
};

Checkbox.defaultProps = {
  likeModel: false,
  setNullValues: () => {},
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  imagesToDelete: PropTypes.arrayOf(PropTypes.object),
  setImagesToDelete: PropTypes.func,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  likeModel: PropTypes.bool,
  setNullValues: PropTypes.func,
};

TextAreaInput.defaultProps = {
  likeModel: false,
  setNullValues: () => {},
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
  setStocksToDelete: PropTypes.func,
  nullValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNullValues: PropTypes.func,
};

ProductDataSection.defaultProps = {
  setStocksToDelete: () => {},
  setNullValues: () => {},
};

export default reduxForm({ form: 'productsForm' })(ProductForm);
