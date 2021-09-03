import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { updateCredentialsRequest } from '../auth';
import * as actions from './index';
import * as services from './services';

export function* fetchOrders() {
  try {
    const response = yield call(services.fetchOrders);
    if (response.status === 200) {
      const { data: { data }, headers } = response;
      const parsedData = data.map(({ attributes, id }) => ({
        ...attributes,
        id,
      }));

      yield put(updateCredentialsRequest(headers));
      yield put(actions.fetchOrdersSuccess(parsedData));
    }
  } catch (e) {
    yield put(actions.fetchOrdersError(e));
  }
}

export function* watchFetchOrders() {
  yield takeLatest(actions.fetchOrdersRequest, fetchOrders);
}

export default function* OrdersSaga() {
  yield all([watchFetchOrders()]);
}
