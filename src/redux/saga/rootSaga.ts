import { appConfigurationSaga } from './appConfigurationSaga';
import { all } from 'redux-saga/effects';
import { productSaga } from './productSaga';
import { editProductSaga } from './editProductSaga';
import { trlListSaga } from './trlListSaga';

export default function* rootSaga() {
  yield all([
    appConfigurationSaga(),
    productSaga(),
    editProductSaga(),
    trlListSaga(),
  ]);
}
