import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { success, error } from 'react-notification-system-redux';

import * as actions from './index';
import * as services from './services';

export function* signIn({ payload }) {
  try {
    const response = yield call(services.signIn, payload);
    if (response.status === 200) {
      yield put(success({
        title: 'Login',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(actions.SIGN_IN_SUCCESS(response.data.data));
    }
  } catch (err) {
    yield put(error({
      title: 'Login',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.SIGN_IN_FAILURE());
  }
}

export function* signOut() {
  try {
    const response = yield call(services.signOut);
    if (response.status === 200) {
      yield put(success({
        title: 'Logout',
        message: 'Successo!',
        autoDismiss: 1,
      }));
      yield put(actions.SIGN_OUT_SUCCESS());
    }
  } catch (err) {
    yield put(error({
      title: 'Logout',
      message: 'Erro ao fazer logout',
      autoDismiss: 1,
    }));
    yield put(actions.SIGN_OUT_FAILURE());
  }
}

export function* watchSignIn() {
  yield takeLatest(actions.SIGN_IN_REQUEST, signIn);
}

export function* watchSignOut() {
  yield takeLatest(actions.SIGN_OUT_REQUEST, signOut);
}

export default function* AuthSaga() {
  yield all([
    watchSignIn(),
    watchSignOut(),
  ]);
}
