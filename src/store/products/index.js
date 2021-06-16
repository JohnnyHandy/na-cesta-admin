import { createReducer, createAction } from '@reduxjs/toolkit';

export const fetchProductsRequest = createAction('Products/FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('Products/FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('Products/FETCH_PRODUCTS_FAILURE');

export const deleteImageRequest = createAction('Products/DELETE_IMAGE_REQUEST');
export const deleteImageSuccess = createAction('Products/DELETE_IMAGE_SUCCESS');
export const deleteImageFailure = createAction('Products/DELETE_IMAGE_FAILURE');

export const createProductRequest = createAction('Products/CREATE_PRODUCT_REQUEST');
export const createProductSuccess = createAction('Products/CREATE_PRODUCT_SUCCESS');
export const createProductFailure = createAction('Products/CREATE_PRODUCT_FAILURE');

export const editProductRequest = createAction('Products/EDIT_PRODUCT_REQUEST');
export const editProductSuccess = createAction('Products/EDIT_PRODUCT_SUCCESS');
export const editProductFailure = createAction('Products/EDIT_PRODUCT_FAILURE');

export const deleteProductRequest = createAction('Products/DELETE_PRODUCT_REQUEST');
export const deleteProductSuccess = createAction('Products/DELETE_PRODUCT_SUCCESS');
export const deleteProductFailure = createAction('Products/DELETE_PRODUCT_FAILURE');

export const updateImagesOrderRequest = createAction('Products/UPDATE_IMAGES_REQUEST');
export const updateImagesOrderSuccess = createAction('Products/UPDATE_IMAGES_ORDER_SUCCESS');
export const updateImagesOrderFailure = createAction('Products/UPDATE_IMAGES_ORDER_FAILURE');

export const deleteStockRequest = createAction('Products/DELETE_STOCK_REQUEST');
export const deleteStockSuccess = createAction('Products/DELETE_STOCK_SUCCESS');
export const deleteStockFailure = createAction('Products/DELETE_STOCK_FAILURE');

export const updateStockRequest = createAction('Products/UPDATE_STOCK_REQUEST');
export const updateStockSuccess = createAction('Products/UPDATE_STOCK_SUCCESS');
export const updateStockFailure = createAction('Products/UPDATE_STOCK_FAILURE');

export const initialState = {
  items: [],
  isFetching: false,
  error: null,
};

export const ProductsReducer = createReducer(initialState, {
  [fetchProductsRequest]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [fetchProductsSuccess]: (state, action) => ({
    ...state,
    isFetching: false,
    items: action.payload,
  }),
  [fetchProductsFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [deleteImageRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [deleteImageSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [deleteImageFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [createProductRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [createProductSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [createProductFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [editProductRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [editProductSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [editProductFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [deleteProductRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [deleteProductSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [deleteProductFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [deleteStockRequest]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [deleteStockSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [deleteStockFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [updateStockRequest]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [updateStockSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [updateStockFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
});
