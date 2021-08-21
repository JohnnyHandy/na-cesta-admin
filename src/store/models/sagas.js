/* eslint-disable no-console */
import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { success, error } from 'react-notification-system-redux';
import { generateId } from '../../utils/functions';
import { updateCredentialsRequest } from '../auth';
import * as actions from '.';
import * as services from './services';

export function* fetchModels({ payload }) {
  try {
    let filtersQuery = {};
    if (payload && payload.filters) {
      filtersQuery = {
        ...filtersQuery,
        ...payload.filters,
      };
    }
    const queryParams = {
      ...filtersQuery,
    };
    const response = yield call(services.fetchModels, { queryParams });
    if (response.status === 200) {
      const { data: { data }, headers } = response;
      const parsedData = data.map(({ attributes, id }) => ({
        ...attributes,
        id,
      }));
      yield put(updateCredentialsRequest(headers));
      yield put(actions.fetchModelsSuccess(parsedData));
    }
  } catch (err) {
    yield put(actions.fetchModelsFailure());
  }
}

export function* createModel({ payload }) {
  try {
    const { resetForm, data } = payload;
    const ref = generateId(10);
    const params = {
      data: {
        type: 'models',
        attributes: {
          ...data,
          category_id: data.category_id * 1,
          ref,
        },
      },
    };
    const response = yield call(services.createModel, { ...params });
    if (response.status === 201) {
      yield put(success({
        title: 'Criação de produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      resetForm();
      yield put(updateCredentialsRequest(response.headers));
      yield put(actions.createModelSuccess());
      yield put(actions.fetchModelsRequest());
    }
  } catch (err) {
    console.error(err);
    yield put(error({
      title: 'Criação de produto',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.createModelFailure(error));
  }
}

export function* editModel({ payload }) {
  try {
    const { data: { id, ...rest }, resetForm } = payload;
    const params = {
      data: {
        type: 'models',
        id,
        attributes: {
          ...rest,
        },
      },
    };
    const response = yield call(services.updateModel, { data: params, id });
    if (response.status === 200) {
      yield put(success({
        title: 'Edição de Modelo',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(updateCredentialsRequest(response.headers));
      yield put(actions.editModelSuccess());
      yield put(actions.fetchModelsRequest());
      resetForm();
    }
  } catch (err) {
    console.error(err);
    yield put(error({
      title: 'Edição de Modelo',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.editModelFailure(err));
  }
}

export function* deleteModel({ payload }) {
  try {
    const { ModelId } = payload;
    const params = {
      data: {
        Model: {
          ModelId,
        },
        action: 'delete',
      },
      method: 'DELETE',
    };
    const response = yield call(services.deleteModel, { ...params });
    if (response.status === 200) {
      yield put(success({
        title: 'Exclusão de Produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(updateCredentialsRequest(response.headers));
      yield put(actions.deleteModelSuccess());
      yield put(actions.fetchModelsRequest());
    }
  } catch (err) {
    yield put(error({
      title: 'Exclusão de produto',
      message: 'Erro',
      autoDismiss: 1,
    }));

    yield put(actions.deleteModelFailure(err));
  }
}

export function* watchFetchModels() {
  yield takeLatest(actions.fetchModelsRequest, fetchModels);
}

export function* watchCreateModel() {
  yield takeLatest(actions.createModelRequest, createModel);
}

export function* watchEditModel() {
  yield takeLatest(actions.editModelRequest, editModel);
}

export function* watchDeleteModel() {
  yield takeLatest(actions.deleteModelRequest, deleteModel);
}

export default function* ModelsSaga() {
  yield all([
    watchFetchModels(),
    watchCreateModel(),
    watchEditModel(),
    watchDeleteModel(),
  ]);
}
