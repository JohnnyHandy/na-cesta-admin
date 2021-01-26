import React from 'react';
import PropTypes from 'prop-types';

import FormComponent from '../../components/form';
import { createProductRequest, editProductRequest } from '../../store/products';

const FormContainer = (props) => {
  const { dispatch, formMode, setFormMode } = props;
  const onSubmit = (data) => {
    if (formMode === 'create') {
      return dispatch(createProductRequest({ data, setFormMode }));
    }
    return dispatch(editProductRequest({ data, setFormMode }));
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
  setFormMode: PropTypes.func.isRequired,
};

FormContainer.defaultProps = {
  initialValues: {},
};

export default FormContainer;
