/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import FormComponent from '../../components/form/products';
import { editProductRequest, createProductRequest } from '../../store/products';

const FormContainer = (props) => {
  const {
    isEditing, dispatch, imagesToDelete, resetForm,
  } = props;
  const onSubmit = (data) => {
    let params = {
      data: {
        ...data,
        is_deal: data.is_deal ? data.is_deal : false,
        enabled: data.enabled ? data.enabled : false,
      },
      resetForm,
    };
    if (isEditing) {
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
    }
    return dispatch(createProductRequest(params));
    // if (formMode === 'create') {
    //   if (data.isDeal === undefined) {
    //     formatedData = {
    //       ...formatedData,
    //     };
    //   }
    //   return dispatch(createProductRequest({ data: formatedData, setFormMode, imagesToDelete }));
    // }
    // return dispatch(editProductRequest({ data: formatedData, setFormMode, imagesToDelete }));
  };
  return (
    <FormComponent
      // imagesToDelete={imagesToDelete}
      // setImagesToDelete={setImagesToDelete}
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
