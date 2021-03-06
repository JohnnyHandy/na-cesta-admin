import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';
import storage from 'redux-persist/lib/storage';

import ProductSagas from './products/sagas';
import { ProductsReducer } from './products/index';
import { OrdersReducer } from './orders';
import OrdersSaga from './orders/sagas';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['form', 'products'],
};

const sagaMiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield all([
    ProductSagas(),
    OrdersSaga(),
  ]);
}

const rootReducer = combineReducers({
  products: ProductsReducer,
  orders: OrdersReducer,
  form: formReducer,
  notifications,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const config = ({ initialState } = {}) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default config;
