import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  reduxForm,
} from 'redux-form';
import styled from '@emotion/styled';
import {
  Form,
  Label,
  Button,
  Input as Select,
} from 'reactstrap';

const Input = styled('input')`
`;

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

const ProductForm = (props) => {
  const {
    handleSubmit,
    categories,
    onSubmit,
  } = props;
  return (
    <Form
      style={{
        padding: '2vh 1vw',
        height: '90%',
        width: '90%',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputLabel htmlFor="name">Nome</InputLabel>
      <Field
        component={TextInput}
        name="name"
        placeholder="Nome"
        id="name"
      />
      <InputLabel htmlFor="model">Categoria</InputLabel>
      <Field
        component={RenderSelectInput}
        name="category_id"
        placeholder="Categoria"
        id="category"
        options={categories}
        style={{ width: '15em' }}
      />
      <Button
        type="submit"
      >
        Salvar Modelo
      </Button>
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
  categories: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
};

TextAreaInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
};

export default reduxForm({ form: 'modelsForm' })(ProductForm);
