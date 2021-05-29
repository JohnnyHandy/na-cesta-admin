import React from 'react';
import PropTypes from 'prop-types';

import http from '../../utils/http';
import FormComponent from '../../components/form/models';
import { createModelRequest } from '../../store/models';

const FormContainer = (props) => {
  const { dispatch, resetForm } = props;
  const [categories, setCategories] = React.useState([]);
  React.useEffect(async () => {
    const getCategories = async () => http.get('/categories').then((res) => {
      if (res.status === 200) {
        setCategories(res.data.map((item) => ({
          name: item.name,
          value: item.id,
        })));
      }
    });
    await getCategories();
  }, []);
  const onSubmit = (data) => {
    dispatch(createModelRequest({ data, resetForm }));
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
  resetForm: PropTypes.func.isRequired,
};

FormContainer.defaultProps = {
  initialValues: {},
};

export default FormContainer;
