import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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

import { nbaTeams } from '../../utils/constants';

const FormSection = styled(Form)`
  display: grid;
  height: 100%;
  overflow: auto;
  padding: 2em;
`;

const FormExternalWrapper = styled('div')`
  background: white;  
  height: 100%;
  position:relative;
`;

const InputLabel = styled(Label)`
    display: block;
    margin-top: 1em;
`;

const Input = styled('input')`
`;

const TextInput = ({ input, ...rest }) => (
  <Input {...rest} {...input} size="sm" type="text" />
);
const Checkbox = ({ input }) => <Input checked={input.value} {...input} type="checkbox" />;

const TextArea = styled('textarea')`
`;
const TextAreaInput = ({ input }) => <TextArea {...input} />;

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
const teamsOptions = Object.keys(nbaTeams).map((team) => ({
  name: team,
  value: nbaTeams[team],
}));

const ModelForm = (props) => {
  const {
    handleSubmit,
    categories,
    onSubmit,
  } = props;
  const history = useHistory();
  return (
    <FormExternalWrapper>
      <FormSection
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          close
          style={{ position: 'absolute', right: '1em', top: '1em' }}
          onClick={() => history.push('/')}
        />
        <div
          style={{
            display: 'grid',
            width: 'fit-content',
          }}
        >
          <InputLabel htmlFor="name">Nome</InputLabel>
          <Field
            component={TextInput}
            name="name"
            placeholder="Nome"
            id="name"
          />

          <InputLabel htmlFor="description">Descrição</InputLabel>
          <Field
            component={TextAreaInput}
            name="description"
            placeholder="Nome"
            id="description"
          />

          <InputLabel htmlFor="category">Categoria</InputLabel>
          <Field
            component={RenderSelectInput}
            name="category_id"
            placeholder="Categoria"
            id="category"
            options={categories}
            style={{ width: '15em' }}
          />
          <InputLabel htmlFor="team">Time</InputLabel>
          <Field
            component={RenderSelectInput}
            name="team"
            placeholder="Time"
            id="team"
            options={teamsOptions}
            style={{ width: '15em' }}
          />
          <InputLabel htmlFor="price">Preço</InputLabel>
          <Field
            component={TextInput}
            name="price"
            placeholder="Preço"
            id="price"
          />
          <InputLabel htmlFor="dealPrice">Preço Promocional</InputLabel>
          <Field
            component={TextInput}
            name="deal_price"
            placeholder="Preço Promocional"
            id="dealPrice"
          />
          <InputLabel htmlFor="discount">Desconto</InputLabel>
          <Field
            component={TextInput}
            name="discount"
            placeholder="Desconto"
            id="discount"
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

        </div>
        <Button
          style={{
            marginTop: '2em',
            alignSelf: 'flex-end',
            justifySelf: 'center',
            height: 'fit-content',
            width: 'fit-content',
          }}
          type="submit"
        >
          Salvar Modelo
        </Button>
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

ModelForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  categories: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ModelForm.defaultProps = {
};

TextAreaInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ])).isRequired,
};

export default reduxForm({ form: 'modelsForm' })(ModelForm);
