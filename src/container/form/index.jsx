import React from 'react';
import PropTypes from 'prop-types';

import FormComponent from '../../components/form';
import { createProductRequest } from '../../store/products';

const FormContainer = (props) => {
  const { dispatch } = props;
  const onSubmit = (data) => dispatch(createProductRequest(data));
  return <FormComponent onSubmit={onSubmit} {...props} />;
};

FormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default FormContainer;
