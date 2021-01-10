import React from 'react';
import PropTypes from 'prop-types';

import FormComponent from '../../components/form';
import { createProductRequest, editProductRequest } from '../../store/products';

const FormContainer = (props) => {
  const { dispatch, formMode } = props;
  const onSubmit = (data) => {
    if (formMode === 'create') {
      return dispatch(createProductRequest(data));
    }
    return dispatch(editProductRequest(data));
  };
  return <FormComponent onSubmit={onSubmit} {...props} />;
};

FormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
  ])),
  formMode: PropTypes.string.isRequired,
};

FormContainer.defaultProps = {
  initialValues: {},
};

export default FormContainer;
