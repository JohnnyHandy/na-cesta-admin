import { createReducer, createAction } from '@reduxjs/toolkit';

export const fetchProductsRequest = createAction('Products/FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('Products/FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('Products/FETCH_PRODUCTS_FAILURE');

export const uploadImageRequest = createAction('Products/UPLOAD_IMAGE_REQUEST');
export const uploadImageSuccess = createAction('Products/UPLOAD_IMAGE_SUCCESS');
export const uploadImageFailure = createAction('Products/UPLOAD_IMAGE_FAILURE');

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
});
