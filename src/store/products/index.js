import { createReducer, createAction } from '@reduxjs/toolkit'

export const fetchProductsRequest = createAction('Products/FETCH_PRODUCTS_REQUEST')
export const fetchProductsSuccess = createAction('Products/FETCH_PRODUCTS_SUCCESS')
export const fetchProductsFailure = createAction('Products/FETCH_PRODUCTS_FAILURE')

export const initialState = {
    items: [],
    isFetching: false,
    error: null
}

export const ProductsReducer = createReducer(initialState, {
    [fetchProductsRequest]: (state, action) => ({
        ...state,
        isFetching: true,
    }),
    [fetchProductsSuccess]: (state, action) => ({
        ...state,
        isFetching: false,
        items: action.payload
    }),
    [fetchProductsFailure]: (state, action) => ({
        ...state,
        isFetching: false,
        error: action.payload
    })
})