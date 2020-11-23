import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import * as actions from '.';
import * as services from './services';

export function* fetchProducts() {
  try {
    const products = yield call(services.fetchProducts);
    yield put(actions.fetchProductsSuccess(products));
  } catch (error) {
    yield put(actions.fetchProductsFailure);
  }
}

export function* watchFetchProducts() {
  yield takeLatest(actions.fetchProductsRequest, fetchProducts);
}

export default function* ProductsSaga() {
  yield all([
    watchFetchProducts(),
  ]);
}
