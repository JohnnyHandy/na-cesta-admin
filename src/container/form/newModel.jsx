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
        dispatch(updateCredentialsRequest(res.headers));
        setCategories(res.data.map((item) => ({
          name: item.name,
          value: item.id,
        })));
      }
    });
    await getCategories();
  }, []);
  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      team: data.team && data.team * 1,
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
