import { delay, put, race, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import Product from '../../services/product.service';

import {
  updateProductDetailFail,
  updateProductDetailSuccess,
} from '../slices/editProductSlice';
import type { ProductData } from '../slices/editProductSlice';

import { ERRORS, SUCCESS } from '../../utils/messages';
import { TIME_OUT_IN_SECONDS } from '../../utils/config';

export function* workUpdateProductDetailFetch(
  action: PayloadAction<ProductData>,
) {
  try {
    const { response } = yield race({
      response: Product.updateProductDetails(action.payload),
      timeOut: delay(TIME_OUT_IN_SECONDS * 1000),
    });

    if (response) {
      yield put(updateProductDetailSuccess());
    } else {
      throw new Error(ERRORS.REQUEST_TIMEOUT);
    }

    toast.success(SUCCESS.PRODUCT_UPDATE_SUCCESS);
  } catch (error) {
    const { message } = error as Error;
    const errorMessage = message || ERRORS.GENERAL;

    toast.error(errorMessage);
    yield put(updateProductDetailFail(errorMessage));
  }
}

export function* editProductSaga() {
  yield takeEvery(
    'editProduct/updateProductDetail',
    workUpdateProductDetailFetch,
  );
}
