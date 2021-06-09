import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Input } from 'reactstrap';
import styled from '@emotion/styled';

const StyledInput = styled(Input)`
  margin: 1em 0;
`;
const Container = styled('div')`
  background: white;
  padding: 2em
`;

const FormExternalWrapper = styled('div')`
  align-items: center;
  background-color: burlywood;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding: 2vh 2vw;
  position: relative
`;

const TextInput = ({ input, ...rest }) => (
  <StyledInput {...input} {...rest} />
);

const FormComponent = (props) => {
  const { onSubmit, handleSubmit } = props;
  return (
    <FormExternalWrapper>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid' }}>
          <Field
            name="email"
            component={TextInput}
            placeholder="Email"
            type="text"
          />
          <Field
            name="password"
            placeholder="Senha"
            component={TextInput}
            type="password"
          />
          <button style={{ margin: 'auto' }} type="submit"> Login </button>
        </Form>
      </Container>
    </FormExternalWrapper>
  );
};

FormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TextInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default reduxForm({ form: 'login' })(FormComponent);
