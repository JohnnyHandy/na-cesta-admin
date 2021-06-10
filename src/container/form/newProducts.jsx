/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FormComponent from '../../components/form/products';
import { createProductRequest } from '../../store/products';
import { fetchModelsRequest } from '../../store/models';

const FormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [imagesToDelete, setImagesToDelete] = React.useState([]);
  const resetForm = () => history.push('/');
  React.useEffect(() => {
    dispatch(fetchModelsRequest());
  }, []);
  const modelsItems = useSelector((state) => state.models.items);
  const onSubmit = (data) => {
    const params = {
      data: {
        ...data,
        is_deal: data.is_deal ? data.is_deal : false,
        enabled: data.enabled ? data.enabled : false,
      },
      resetForm,
    };
    return dispatch(createProductRequest(params));
  };
  return (
    <FormComponent
      imagesToDelete={imagesToDelete}
      setImagesToDelete={setImagesToDelete}
      onSubmit={onSubmit}
      models={modelsItems}
    />
  );
};

export default FormContainer;
