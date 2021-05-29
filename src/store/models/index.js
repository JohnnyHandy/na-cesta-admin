import { createReducer, createAction } from '@reduxjs/toolkit';

export const fetchModelsRequest = createAction('Models/FETCH_MODELS_REQUEST');
export const fetchModelsSuccess = createAction('Models/FETCH_MODELS_SUCCESS');
export const fetchModelsFailure = createAction('Models/FETCH_MODELS_FAILURE');

export const createModelRequest = createAction('Models/CREATE_MODEL_REQUEST');
export const createModelSuccess = createAction('Models/CREATE_MODEL_SUCCESS');
export const createModelFailure = createAction('Models/CREATE_MODEL_FAILURE');

export const editModelRequest = createAction('Models/EDIT_MODEL_REQUEST');
export const editModelSuccess = createAction('Models/EDIT_MODEL_SUCCESS');
export const editModelFailure = createAction('Models/EDIT_MODEL_FAILURE');

export const deleteModelRequest = createAction('Models/DELETE_MODEL_REQUEST');
export const deleteModelSuccess = createAction('Models/DELETE_MODEL_SUCCESS');
export const deleteModelFailure = createAction('Models/DELETE_MODEL_FAILURE');

export const initialState = {
  items: [],
  isFetching: false,
  error: null,
  images: {
    isFetching: false,
    error: null,
  },
};

export const ModelsReducer = createReducer(initialState, {
  [fetchModelsRequest]: (state) => ({
    ...state,
    isFetching: true,
  }),
  [fetchModelsSuccess]: (state, action) => ({
    ...state,
    isFetching: false,
    items: action.payload,
  }),
  [fetchModelsFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [createModelRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [createModelSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [createModelFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [editModelRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [editModelSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [editModelFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
  [deleteModelRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null,
  }),
  [deleteModelSuccess]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [deleteModelFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
});
