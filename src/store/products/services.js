/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiUrl = 'https://lhpx7am1gk.execute-api.sa-east-1.amazonaws.com/dev';

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
