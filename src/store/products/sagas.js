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

export function* uploadImageToS3({ payload }) {
  const { info, file, fields } = payload;
  try {
    const objectKey = `images/${info.name}`;
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
    if (uploadImageResponse.statusText === 'OK') fields.push({ key: objectKey });
    yield put(actions.uploadImageSuccess());
  } catch (error) {
    console.error(error);
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
    console.log('response', response);
    fields.remove(index);
    yield put(actions.deleteImageSuccess());
  } catch (error) {
    yield put(actions.deleteImageFailure());
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

export default function* ProductsSaga() {
  yield all([
    watchFetchProducts(),
    watchUploadImageToS3(),
    watchDeleteImage(),
  ]);
}
