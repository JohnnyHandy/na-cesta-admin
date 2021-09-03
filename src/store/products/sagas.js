/* eslint-disable no-console */
import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { success, error, warning } from 'react-notification-system-redux';
import { updateCredentialsRequest } from '../auth';
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
      const response = call(services.deleteImage, { ...params });
      put(updateCredentialsRequest(response.headers));
      return response;
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

export function* deleteStock({ payload }) {
  const { stocksToDelete } = payload;
  try {
    yield all(stocksToDelete.map((stock) => {
      const params = {
        stockId: stock.id,
        productId: stock.productId,
      };
      const response = call(services.deleteStock, { ...params });
      put(updateCredentialsRequest(response.headers));
      return response;
    }));
    yield put(success({
      title: 'Exclusão de estoques',
      message: 'Sucesso!',
      autoDismiss: 1,
    }));
    yield put(actions.deleteImageSuccess());
  } catch (err) {
    console.error(err);
    yield put(error({
      title: 'Exclusão de Estoque',
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
    Object.keys(data).filter((item) => (item !== 'images' && item !== 'stocks_attributes')).forEach((attr) => {
      formData.append(`data[attributes][${attr}]`, data[attr]);
    });
    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        const { file } = image;
        const editedFile = new File([file], image.filename, { type: image.content_type });

        formData.append('data[attributes][images][]', editedFile);
      });
    }
    if (data.stocks_attributes && data.stocks_attributes.length) {
      data.stocks_attributes.forEach((item, index) => {
        formData.append(`data[attributes][stocks_attributes][${index}][size]`, item.size);
        formData.append(`data[attributes][stocks_attributes][${index}][quantity]`, item.quantity);
      });
    }
    const response = yield call(services.createProduct, { data: formData });
    if (response.status === 201) {
      yield put(success({
        title: 'Criação de produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(updateCredentialsRequest(response.headers));
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
      data, resetForm, imagesToDelete, imagesToChange, stocksToDelete, stocksToChange,
    } = payload;
    if (imagesToDelete.length) {
      yield put(actions.deleteImageRequest({ imagesToDelete }));
    }
    if (imagesToChange.length) {
      yield put(actions.updateImagesOrderRequest({ imagesToChange }));
    }
    if (stocksToDelete.length) {
      yield put(actions.deleteStockRequest({ stocksToDelete }));
    }
    if (stocksToChange.length) {
      yield put(actions.updateStockRequest({ stocksToChange }));
    }
    const formData = new FormData();
    Object.keys(data).filter((item) => (item !== 'images' && item !== 'model_id' && item !== 'id' && item !== 'stocks_attributes')).forEach((attr) => {
      formData.append(`data[attributes][${attr}]`, data[attr]);
    });
    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        const { file } = image;
        const editedFile = new File([file], image.filename, { type: image.content_type });

        formData.append('data[attributes][images][]', editedFile);
      });
    }
    if (data.stocks_attributes && data.stocks_attributes.length) {
      data.stocks_attributes.forEach((item, index) => {
        formData.append(`data[attributes][stocks_attributes][${index}][id]`, item.id);
        formData.append(`data[attributes][stocks_attributes][${index}][size]`, item.size);
        formData.append(`data[attributes][stocks_attributes][${index}][quantity]`, item.quantity);
      });
    }
    const response = yield call(services.editProduct, { productId: data.id, data: formData });
    if (response.status === 201) {
      yield put(success({
        title: 'Edição de Produto',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(updateCredentialsRequest(response.headers));
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
      yield put(updateCredentialsRequest(response.headers));
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
          data: {
            type: 'images',
            attributes: {
              filename: newFilename,
            },
          },
        };
        const response = call(
          services.updateImage, { imageId: id, productId, params },
        );
        put(updateCredentialsRequest(response.headers));
        return response;
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

export function* updateStocks({ payload }) {
  try {
    const { stocksToChange } = payload;
    const responses = yield all(stocksToChange.map(
      ({
        size, quantity, id, productId,
      }) => {
        const params = {
          size,
          quantity,
        };
        const response = call(
          services.updateStock, { stockId: id, productId, params },
        );
        put(updateCredentialsRequest(response.headers));
        return response;
      },
    ));
    if (responses.every((item) => item.status === 200)) {
      yield put(success({
        title: 'Atualização de estoques',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
    } else {
      yield put(warning({
        title: 'Atualização de estoques',
        message: 'Alguma imagem não foi atualizada com sucesso!',
        autoDismiss: 1,
      }));
    }
  } catch (e) {
    console.error(e);
    yield put(error({
      title: 'Atualização de estoques',
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

export function* watchDeleteStock() {
  yield takeLatest(actions.deleteStockRequest, deleteStock);
}

export function* watchUpdateStock() {
  yield takeLatest(actions.updateStockRequest, updateStocks);
}

export default function* ProductsSaga() {
  yield all([
    watchDeleteImage(),
    watchCreateProduct(),
    watchEditProduct(),
    watchDeleteProduct(),
    watchUpdateImagesOrder(),
    watchDeleteStock(),
    watchUpdateStock(),
  ]);
}
