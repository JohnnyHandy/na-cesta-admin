/* eslint-disable camelcase */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import http from '../../utils/http';
import FormComponent from '../../components/form/products';
import Loading from '../../components/loading';
import { editProductRequest } from '../../store/products';
import { fetchModelsRequest } from '../../store/models';
import { updateCredentialsRequest } from '../../store/auth';

const fetchProductData = (id) => http.get(`/products/${id}`);

const FormContainer = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [imagesToDelete, setImagesToDelete] = React.useState([]);
  const [stocksToDelete, setStocksToDelete] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({});
  const [ready, setRenderReady] = React.useState(false);
  const modelsItems = useSelector((state) => state.models.items);
  const resetForm = () => history.push('/');
  React.useEffect(async () => {
    dispatch(fetchModelsRequest());
    await fetchProductData(id).then((res) => {
      if (res.status === 200) {
        dispatch(updateCredentialsRequest(res.headers));
        const { data: { image_url, stocks, ...rest } } = res;
        const productInfo = {
          ...rest,
          images: image_url.map((item) => ({
            ...item,
            stored: true,
          })),
          stocks_attributes: stocks.map((item) => ({
            size: item.size,
            quantity: item.quantity,
            id: item.id,
            stored: true,
          })),
        };
        setInitialValues(productInfo);
        setRenderReady(true);
      }
    });
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
      created_at, updated_at, images, stocks_attributes, ...rest
    } = data;
    params = {
      ...params,
      data: {
        ...rest,
        images: images.filter((item) => !item.stored),
        stocks_attributes: stocks_attributes.filter((item) => !item.stored),
      },
      imagesToChange: images.filter((item) => item.stored && item.newParams),
      imagesToDelete,
      stocksToChange: stocks_attributes.filter((item) => item.stored).filter((item) => {
        const initialValue = initialValues?.stocks_attributes.find(
          (initial) => initial.id === item.id,
        );
        return (initialValue?.size !== item.size || initialValue?.quantity !== item.quantity);
      }).map((item) => ({
        ...item,
        productId: data.id,
      })),
      stocksToDelete: stocksToDelete.map((item) => ({ ...item, productId: data.id })),
    };
    return dispatch(editProductRequest(params));
  };
  if (!ready) {
    return <Loading />;
  }
  return (
    <FormComponent
      models={modelsItems}
      imagesToDelete={imagesToDelete}
      setImagesToDelete={setImagesToDelete}
      setStocksToDelete={setStocksToDelete}
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
