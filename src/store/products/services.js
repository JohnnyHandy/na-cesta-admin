/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import http, { multipartInstance } from '../../utils/http';

const apiUrl = 'https://lhpx7am1gk.execute-api.sa-east-1.amazonaws.com/dev';
// const productsUrl = '/products';
const modelUrls = '/models';
const productUrl = '/products';

export const lambdaS3Service = ({ method, ...params }) => {
  const options = {
    method,
    url: `${apiUrl}/upload`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'allow',
    },
    data: {
      ...params,
    },
  };
  return axios(options);
};

export const uploadImageWithSignedUrl = ({ url, data, type }) => {
  const options = {
    method: 'PUT',
    url,
    headers: {
      'Content-Type': type,
    },
    data,
  };
  return axios(options);
};

export const fetchModels = ({ queryParams }) => http.get(modelUrls, { params: queryParams });

export const productsApi = ({ data, method }) => {
  const options = {
    method,
    url: `${apiUrl}/products`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'allow',
    },
    data: {
      ...data,
    },
  };
  return axios(options);
};
export const createProduct = ({ data }) => http.post(`${productUrl}`, data);
export const editProduct = ({ productId, data }) => multipartInstance.patch(`${productUrl}/${productId}`, data);
export const deleteProduct = ({ productId }) => http.delete(`${productUrl}/${productId}`);
export const deleteImage = ({ productId, imageId }) => http.delete(`${productUrl}/${productId}/image/${imageId}`);
export const updateImage = ({ productId, imageId, params }) => http.patch(`${productUrl}/${productId}/image/${imageId}`, params);
