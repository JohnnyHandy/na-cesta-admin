/* eslint-disable no-console */
import {
  put, call, takeLatest, all, select,
} from 'redux-saga/effects';
import { success } from 'react-notification-system-redux';
import { generateId } from '../../utils/functions';
import * as actions from '.';
import * as services from './services';

export function* fetchProducts() {
  try {
    const params = {
      data: {
        action: 'scan',
      },
      method: 'POST',
    };
    const response = yield call(services.productsApi, { ...params });
    const productsData = response.data;
    yield put(actions.fetchProductsSuccess(productsData));
  } catch (error) {
    yield put(actions.fetchProductsFailure);
  }
}

export function* uploadImageToS3({ payload }) {
  const { info, file, fields } = payload;
  try {
    const newId = generateId(9);
    const objectKey = `images/${newId}${info.name}`;
    const params = {
      object_key: objectKey,
      type: info.type,
      action: 'getSignedUrl',
      method: 'POST',
    };
    const getUrlResponse = yield call(services.lambdaS3Service, params);
    const preSignedUrl = getUrlResponse.data.url;
    const uploadImageResponse = yield call(
      services.uploadImageWithSignedUrl, { url: preSignedUrl, data: file, type: info.type },
    );
    if (uploadImageResponse.statusText === 'OK') {
      fields.push({ key: objectKey });
      yield put(success({
        title: 'Upload de imagem',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(actions.uploadImageSuccess());
    }
  } catch (error) {
    console.error(error);
    yield put(error({
      title: 'Upload de imagem',
      message: 'Erro!',
      autoDismiss: 1,
    }));
    yield put(actions.uploadImageFailure(error));
  }
}

export function* deleteS3Image({ payload }) {
  const { objectKey, fields, index } = payload;
  try {
    const params = {
      object_key: objectKey,
      action: 'deleteObject',
      method: 'DELETE',
    };
    const response = yield call(services.lambdaS3Service, params);
    if (response.statusText === 'OK') {
      fields.remove(index);
      yield put(success({
        title: 'Exclusão de imagem',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(actions.deleteImageSuccess());
    }
  } catch (error) {
    yield put(error({
      title: 'Exclusão de imagem',
      message: 'Erro!',
      autoDismiss: 1,
    }));
    yield put(actions.deleteImageFailure());
  }
}

export function* createProduct({ payload }) {
  try {
    const { setFormMode, data } = payload;
    const id = generateId(8);
    // const productItems = yield select((state) => state.products.items);
    const params = {
      data: {
        product: { ...data, id },
        action: 'create',
      },
      method: 'POST',
    };
    const response = yield call(services.productsApi, { ...params });
    if (response.status === 200) {
      yield put(success({
        title: 'Criação de produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      setFormMode('');
      yield put(actions.createProductSuccess());
      yield put(actions.fetchProductsRequest());
    }
  } catch (error) {
    console.error(error);
    yield put(error({
      title: 'Criação de produto',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.createProductFailure());
  }
}

export function* editProduct({ payload }) {
  try {
    const productItems = yield select((state) => state.products.items);
    const findItem = productItems.find((item) => item.id === payload.id);
    const updateItem = {
      ...findItem,
      ...payload,
    };
    const updatedProductItems = productItems.map((item) => {
      if (item.id === findItem.id) {
        return updateItem;
      } return item;
    });
    yield put(actions.editProductSuccess(updatedProductItems));
  } catch (error) {
    console.error(error);
    yield put(actions.editProductFailure(error));
  }
}

export function* deleteProduct({ payload }) {
  try {
    const { id } = payload;
    const productItems = yield select((state) => state.products.items);
    const updatedProductItems = productItems.filter((item) => item.id !== id);
    yield put(actions.deleteProductSuccess(updatedProductItems));
  } catch (error) {
    yield put(actions.deleteProductFailure(error));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(actions.fetchProductsRequest, fetchProducts);
}

export function* watchUploadImageToS3() {
  yield takeLatest(actions.uploadImageRequest, uploadImageToS3);
}

export function* watchDeleteImage() {
  yield takeLatest(actions.deleteImageRequest, deleteS3Image);
}

export function* watchCreateProduct() {
  yield takeLatest(actions.createProductRequest, createProduct);
}

export function* watchEditProduct() {
  yield takeLatest(actions.editProductRequest, editProduct);
}

export function* watchDeleteProduct() {
  yield takeLatest(actions.deleteProductRequest, deleteProduct);
}

export default function* ProductsSaga() {
  yield all([
    watchFetchProducts(),
    watchUploadImageToS3(),
    watchDeleteImage(),
    watchCreateProduct(),
    watchEditProduct(),
    watchDeleteProduct(),
  ]);
}
