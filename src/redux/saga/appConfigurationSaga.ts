import { delay, put, race, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  getAppConfigFail,
  getAppConfigSuccess,
} from '../slices/appConfigSlice';

import AppConfigurations from '../../services/appConfigurations.service';
import type { AppConfigurationResponse } from '../../services/appConfigurations.service';

import { ERRORS } from '../../utils/messages';
import { TIME_OUT_IN_SECONDS } from '../../utils/config';
import { setThemeColor } from '../../utils/helpers';

interface RaceResponse {
  response: AppConfigurationResponse;
}

export function* workGetAppConfigFetch() {
  try {
    const { response }: RaceResponse = yield race({
      response: AppConfigurations.getAppConfigurations(),
      timeOut: delay(TIME_OUT_IN_SECONDS * 1000),
    });

    if (response) {
      setThemeColor(response.mainColor);
      yield put(getAppConfigSuccess(response));
    } else {
      throw new Error(ERRORS.REQUEST_TIMEOUT);
    }
  } catch (error) {
    const { message } = error as Error;
    const errorMessage = message || ERRORS.GENERAL;

    toast.error(errorMessage);
    yield put(getAppConfigFail(errorMessage));
  }
}

export function* appConfigurationSaga() {
  yield takeEvery('appConfig/getAppConfigFetch', workGetAppConfigFetch);
}
