import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import http from '../../utils/http';
import FormComponent from '../../components/form/models';
import { createModelRequest, fetchModelsRequest } from '../../store/models';
import { updateCredentialsRequest } from '../../store/auth';

const FormContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const resetForm = () => history.push('/');
  const [categories, setCategories] = React.useState([]);
  React.useEffect(async () => {
    fetchModelsRequest();
    const getCategories = async () => http.get('/categories').then((res) => {
      if (res.status === 200) {
        const { data: { data }, headers } = res;
        const parsedData = data.map(({ attributes, id }) => ({
          name: attributes.name,
          value: id,
        }));
        dispatch(updateCredentialsRequest(headers));
        setCategories(parsedData);
      }
    });
    await getCategories();
  }, []);
  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      team: data.team && data.team * 1,
      is_deal: data.is_deal ? data.is_deal : false,
      enabled: data.enabled ? data.enabled : false,
    };
    dispatch(createModelRequest({ data: parsedData, resetForm }));
  };
  return (
    <FormComponent
      categories={categories}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

FormContainer.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
  ])),
};

FormContainer.defaultProps = {
  initialValues: {},
};

export default FormContainer;
