/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import FormComponent from '../../components/form/products';
import { editProductRequest } from '../../store/products';

const FormContainer = (props) => {
  const [imagesToDelete, setImagesToDelete] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({});
  const {
    dispatch, resetForm,
  } = props;
  React.useEffect(() => {
    setInitialValues({});
  }, []);
  const onSubmit = (data) => {
    let params = {
      data: {
        ...data,
        is_deal: data.is_deal ? data.is_deal : false,
        enabled: data.enabled ? data.enabled : false,
      },
      resetForm,
    };

    const {
      created_at, updated_at, images, ...rest
    } = data;
    params = {
      ...params,
      data: {
        ...rest,
        images: images.filter((item) => !item.stored),
      },
      imagesToChange: images.filter((item) => item.stored && item.newParams),
      imagesToDelete,
    };
    return dispatch(editProductRequest(params));
  };
  return (
    <FormComponent
      imagesToDelete={imagesToDelete}
      setImagesToDelete={setImagesToDelete}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

FormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  imagesToDelete: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default FormContainer;
