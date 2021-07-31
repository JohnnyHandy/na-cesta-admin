import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import http from '../../utils/http';
import FormComponent from '../../components/form/models';
import Loading from '../../components/loading';
import { editModelRequest } from '../../store/models';
import { updateCredentialsRequest } from '../../store/auth';

const FormContainer = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [categories, setCategories] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({});
  const [ready, setRenderReady] = React.useState(false);
  const resetForm = () => history.push('/');
  React.useEffect(async () => {
    const getCategories = async () => http.get('/categories').then((res) => {
      if (res.status === 200) {
        dispatch(updateCredentialsRequest(res.headers));
        setCategories(res.data.map((item) => ({
          name: item.name,
          value: item.id,
        })));
      }
    });
    const getModelData = async () => http.get(`/models/${id}`).then((res) => {
      if (res.status === 200) {
        dispatch(updateCredentialsRequest(res.headers));
        setInitialValues(res.data);
        setRenderReady(true);
      }
    });
    await getCategories();
    await getModelData();
  }, []);
  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      team: data.team && data.team * 1,
    };
    dispatch(editModelRequest({ data: parsedData, resetForm }));
  };
  if (!ready) {
    return <Loading />;
  }
  return (
    <FormComponent
      initialValues={initialValues}
      categories={categories}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

export default FormContainer;
