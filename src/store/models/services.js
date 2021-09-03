/* eslint-disable import/prefer-default-export */
import http from '../../utils/http';

const modelUrls = '/models';

export const fetchModels = ({ queryParams }) => http.get(modelUrls, { params: queryParams });

export const createModel = (attributes) => http.post(modelUrls, attributes);

export const updateModel = ({ data, id }) => http.patch(`${modelUrls}/${id}`, data);

export const deleteModel = ({ data, id }) => http.delete(`${modelUrls}/${id}`, { data });
