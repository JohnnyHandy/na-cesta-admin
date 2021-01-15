import { createReducer, createAction } from '@reduxjs/toolkit';

export const fetchProductsRequest = createAction('Products/FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('Products/FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('Products/FETCH_PRODUCTS_FAILURE');

export const uploadImageRequest = createAction('Products/UPLOAD_IMAGE_REQUEST');
export const uploadImageSuccess = createAction('Products/UPLOAD_IMAGE_SUCCESS');
export const uploadImageFailure = createAction('Products/UPLOAD_IMAGE_FAILURE');

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

export const initialState = {
  items: [],
  isFetching: false,
  error: null,
  images: {
    isFetching: false,
    error: null,
  },
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
  [uploadImageRequest]: (state) => ({
    ...state,
    images: {
      ...state.images,
      isFetching: true,
    },
  }),
  [uploadImageSuccess]: (state) => ({
    ...state,
    images: {
      ...state.images,
      isFetching: false,
      error: null,
    },
  }),
  [uploadImageFailure]: (state, action) => ({
    ...state,
    images: {
      ...state.images,
      isFetching: false,
      error: action.payload,
    },
  }),
  [deleteImageRequest]: (state) => ({
    ...state,
    images: {
      ...state.images,
      isFetching: true,
      error: null,
    },
  }),
  [deleteImageSuccess]: (state) => ({
    ...state,
    images: {
      ...state.images,
      isFetching: false,
    },
  }),
  [deleteImageFailure]: (state, action) => ({
    ...state,
    images: {
      ...state.images,
      isFetching: false,
      error: action.payload,
    },
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
  [editProductSuccess]: (state, action) => ({
    ...state,
    isFetching: false,
    items: action.payload,
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
  [deleteProductSuccess]: (state, action) => ({
    ...state,
    isFetching: false,
    items: action.payload,
  }),
  [deleteProductFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
});
