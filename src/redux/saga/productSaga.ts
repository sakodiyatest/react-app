import { delay, put, race, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getProductDetailFail,
  getProductDetailSuccess,
} from '../slices/productSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ProductDetailResponse } from '../../services/product.service';
import Product from '../../services/product.service';

import { ERRORS } from '../../utils/messages';
import { TIME_OUT_IN_SECONDS } from '../../utils/config';

interface RaceResponse {
  response: ProductDetailResponse;
}

export function* workGetProductDetailFetch(action: PayloadAction<string>) {
  try {
    const { response }: RaceResponse = yield race({
      response: Product.getProductDetails(action.payload),
      timeOut: delay(TIME_OUT_IN_SECONDS * 1000),
    });

    if (response) {
      yield put(getProductDetailSuccess(response));
    } else {
      throw new Error(ERRORS.REQUEST_TIMEOUT);
    }
  } catch (error) {
    const { message } = error as Error;
    const errorMessage = message || ERRORS.GENERAL;

    toast.error(errorMessage);
    yield put(getProductDetailFail(errorMessage));
  }
}

export function* productSaga() {
  yield takeEvery('product/getProductDetailFetch', workGetProductDetailFetch);
}
