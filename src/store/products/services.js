/* eslint-disable import/prefer-default-export */
import http, { multipartInstance } from '../../utils/http';

// const productsUrl = '/products';
const modelUrls = '/models';
const productUrl = '/products';

export const fetchModels = ({ queryParams }) => http.get(modelUrls, { params: queryParams });

export const createProduct = ({ data }) => http.post(`${productUrl}`, data);
export const editProduct = ({ productId, data }) => multipartInstance.patch(`${productUrl}/${productId}`, data);
export const deleteProduct = ({ productId }) => http.delete(`${productUrl}/${productId}`);
export const deleteImage = ({ productId, imageId }) => http.delete(`${productUrl}/${productId}/image/${imageId}`);
export const updateImage = ({ productId, imageId, params }) => http.patch(`${productUrl}/${productId}/image/${imageId}`, params);
