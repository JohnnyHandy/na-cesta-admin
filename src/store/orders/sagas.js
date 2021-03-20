import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import * as actions from './index';
import * as services from './services';

const defaultFetchOrderParams = {
  ExpressionAttributeNames: {
    '#OI': 'OrderId',
    '#PI': 'ProductIds',
    '#UI': 'UserId',
    '#CA': 'created_at',
    '#OD': 'orderDetails',
    '#PR': 'products',
    '#ST': 'status',
    '#TP': 'totalPrice',
  },
  ProjectionExpression: '#OI, #PI, #UI, #CA, #OD, #PR, #ST, #TP',
};

export function* fetchOrders() {
  try {
    const params = {
      data: {
        action: 'scan',
        paramAttributes: defaultFetchOrderParams,
      },
      method: 'POST',
    };
    const response = yield call(services.fetchOrders, params);
    if (response.status === 200) {
      const { data } = response;
      yield put(actions.fetchOrdersSuccess(data));
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
