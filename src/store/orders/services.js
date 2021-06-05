/* eslint-disable import/prefer-default-export */
import http from '../../utils/http';

const ordersUrl = '/orders';
export const fetchOrders = () => http.get(ordersUrl);
