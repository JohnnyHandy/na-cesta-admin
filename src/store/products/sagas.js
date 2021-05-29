/* eslint-disable no-console */
import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { success, error, warning } from 'react-notification-system-redux';
import * as actions from '.';
import * as services from './services';

export function* deleteImage({ payload }) {
  const {
    imagesToDelete,
  } = payload;
  try {
    yield all(imagesToDelete.map((image) => {
      const params = {
        imageId: image.id,
        productId: image.productId,
      };
      return call(services.deleteImage, { ...params });
    }));
    yield put(success({
      title: 'Exclusão de imagens',
      message: 'Sucesso!',
      autoDismiss: 1,
    }));
    yield put(actions.deleteImageSuccess());
  } catch (err) {
    console.error(err);
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
    const { data, resetForm } = payload;
    const formData = new FormData();
    Object.keys(data).filter((item) => (item !== 'images')).forEach((attr) => {
      formData.append(`${attr}`, data[attr]);
    });
    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        const { file } = image;
        const editedFile = new File([file], image.filename, { type: image.content_type });

        formData.append('images[]', editedFile);
      });
    }
    const response = yield call(services.createProduct, { data: formData });
    if (response.status === 201) {
      yield put(success({
        title: 'Criação de produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(actions.createProductSuccess());
      resetForm();
    }
  } catch (err) {
    console.error(err);
    yield put(error({
      title: 'Criação de produto',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.createProductFailure(error));
  }
}

export function* editProduct({ payload }) {
  try {
    const {
      data, resetForm, imagesToDelete, imagesToChange,
    } = payload;
    if (imagesToDelete.length) {
      yield put(actions.deleteImageRequest({ imagesToDelete }));
    }
    if (imagesToChange.length) {
      yield put(actions.updateImagesOrderRequest({ imagesToChange }));
    }
    const formData = new FormData();
    Object.keys(data).filter((item) => (item !== 'images' && item !== 'model_id' && item !== 'id')).forEach((attr) => {
      formData.append(`${attr}`, data[attr]);
    });
    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        const { file } = image;
        const editedFile = new File([file], image.filename, { type: image.content_type });

        formData.append('images[]', editedFile);
      });
    }
    const response = yield call(services.editProduct, { productId: data.id, data: formData });
    if (response.status === 200) {
      yield put(success({
        title: 'Edição de Produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(actions.editProductSuccess());
      resetForm();
    }
  } catch (err) {
    console.error(err);
    yield put(error({
      title: 'Edição de produto',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.editProductFailure(err));
  }
}

export function* deleteProduct({ payload }) {
  try {
    const { productId, updateProductsList } = payload;
    const response = yield call(services.deleteProduct, { productId });
    if (response.status === 204) {
      yield put(success({
        title: 'Exclusão de Produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      updateProductsList();
      yield put(actions.deleteProductSuccess());
    }
  } catch (err) {
    yield put(error({
      title: 'Exclusão de produto',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.deleteProductFailure(err));
  }
}

export function* updateImagesOrder({ payload }) {
  try {
    const { imagesToChange } = payload;
    const responses = yield all(imagesToChange.filter(
      ({ newParams: { newFilename, initialFilename } }) => newFilename !== initialFilename,
    ).map(
      ({ newParams: { newFilename, productId }, id }) => {
        const params = {
          filename: newFilename,
        };
        return call(
          services.updateImage, { imageId: id, productId, params },
        );
      },
    ));
    if (responses.every((item) => item.status === 200)) {
      yield put(success({
        title: 'Atualização de imagens',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
    } else {
      yield put(warning({
        title: 'Atualização de imagens',
        message: 'Alguma imagem não foi atualizada com sucesso!',
        autoDismiss: 1,
      }));
    }
  } catch (e) {
    console.error(e);
    yield put(error({
      title: 'Atualização de imagens',
      message: 'Erro!',
      autoDismiss: 1,
    }));
  }
}

export function* watchDeleteImage() {
  yield takeLatest(actions.deleteImageRequest, deleteImage);
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

export function* watchUpdateImagesOrder() {
  yield takeLatest(actions.updateImagesOrderRequest, updateImagesOrder);
}

export default function* ProductsSaga() {
  yield all([
    watchDeleteImage(),
    watchCreateProduct(),
    watchEditProduct(),
    watchDeleteProduct(),
    watchUpdateImagesOrder(),
  ]);
}
