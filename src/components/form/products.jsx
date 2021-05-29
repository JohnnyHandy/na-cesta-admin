import React from 'react';
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
  Button,
  Input as Select,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';

import UploadComponent from '../crop/index';

const FormSection = styled('div')`
    display: grid;
`;

const StyledNavLink = styled(NavLink)`
  background:${(props) => (props.selected ? '#0797FF' : 'white')};
  color:${(props) => (props.selected ? 'white' : '#0797FF')};
  cursor: pointer
`;

const StyledTabPane = styled(TabPane)`
  max-height: 75vh;
  overflow: auto;
  padding: 1vh 1vw
`;

const Input = styled('input')`
`;

const ColorInput = ({ input }) => (
  <Input type="color" {...input} />
);

const TextInput = ({ input }) => (
  <Input {...input} size="sm" type="text" />
);
const Checkbox = ({ input }) => <Input {...input} type="checkbox" />;

const TextArea = styled('textarea')`
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
  const [activeTab, toggleTab] = React.useState('1');
  return (
    <Form
      style={{
        padding: '2vh 1vw',
        height: '90%',
        width: '90%',
      }}
      onSubmit={handleSubmit}
    >
      <FormSection>
        <Nav
          tabs
          style={{
            position: 'relative',
          }}
        >
          <NavItem>
            <StyledNavLink
              onClick={() => toggleTab('1')}
              selected={activeTab === '1'}
            >
              Dados do produto
            </StyledNavLink>
          </NavItem>
          <Button
            type="submit"
            style={{
              position: 'absolute',
              right: '0',
            }}
          >
            Salvar Produto
          </Button>
        </Nav>
        <TabContent activeTab={activeTab}>
          <StyledTabPane tabId="1">
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

          </StyledTabPane>
        </TabContent>
      </FormSection>
    </Form>
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
