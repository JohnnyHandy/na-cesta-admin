/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import FormComponent from '../../components/form/products';
import { createProductRequest } from '../../store/products';
import { fetchModelsRequest } from '../../store/models';

const FormContainer = () => {
  const [nullValues, setNullValues] = React.useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
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
  const additionalProps = {};
  if (location?.state?.modelId) {
    additionalProps.initialValues = {
      model_id: `${location.state.modelId}`,
    };
  }
  return (
    <FormComponent
      onSubmit={onSubmit}
      models={modelsItems}
      dispatch={dispatch}
      setNullValues={setNullValues}
      nullValues={nullValues}
      {...additionalProps}
    />
  );
};

export default FormContainer;
