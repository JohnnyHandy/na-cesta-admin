import React from 'react';
import PropTypes from 'prop-types';

import FormComponent from '../../components/form';
import { createProductRequest, editProductRequest } from '../../store/products';

const FormContainer = (props) => {
  const {
    dispatch, formMode, setFormMode, imagesToDelete, setImagesToDelete,
  } = props;
  const onSubmit = (data) => {
    if (formMode === 'create') {
      let formatedData = data;
      if (data.isDeal === undefined) {
        formatedData = {
          ...data,
          isDeal: false,
        };
      }
      return dispatch(createProductRequest({ data: formatedData, setFormMode, imagesToDelete }));
    }
    return dispatch(editProductRequest({ data, setFormMode, imagesToDelete }));
  };
  return (
    <FormComponent
      imagesToDelete={imagesToDelete}
      setImagesToDelete={setImagesToDelete}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

FormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
  ])),
  formMode: PropTypes.string.isRequired,
  setFormMode: PropTypes.func.isRequired,
  imagesToDelete: PropTypes.arrayOf(PropTypes.object).isRequired,
  setImagesToDelete: PropTypes.func.isRequired,
};

FormContainer.defaultProps = {
  initialValues: {},
};

export default FormContainer;
