import { createReducer, createAction } from '@reduxjs/toolkit';

export const fetchOrdersRequest = createAction('orders/FETCH_ORDERS_REQUEST');
export const fetchOrdersSuccess = createAction('orders/FETCH_ORDERS_SUCCESS');
export const fetchOrdersError = createAction('orders/FETCH_ORDERS_ERROR');

export const initialState = {
  items: [],
  isFetching: false,
  error: null,
};

export const OrdersReducer = createReducer(initialState, {
  [fetchOrdersRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [fetchOrdersSuccess]: (state, action) => ({
    ...state,
    isFetching: true,
    items: action.payload,
  }),
  [fetchOrdersError]: (state, action) => ({
    ...state,
    isFetching: false,
    items: action.payload,
  }),
});
