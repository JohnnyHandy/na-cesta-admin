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
    const getUrlResponse = yield call(services.getPreSignedUrl, { objectKey, type: info.type });
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

export function* watchFetchProducts() {
  yield takeLatest(actions.fetchProductsRequest, fetchProducts);
}

export function* watchUploadImageToS3() {
  yield takeLatest(actions.uploadImageRequest, uploadImageToS3);
}

export default function* ProductsSaga() {
  yield all([
    watchFetchProducts(),
    watchUploadImageToS3(),
  ]);
}
