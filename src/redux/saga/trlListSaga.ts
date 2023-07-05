import { delay, put, race, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import TrlList from '../../services/trlList.service';
import type { TrlListResponse } from '../../services/trlList.service';

import { getTrlListFail, getTrlListSuccess } from '../slices/trlListSlice';

import { ERRORS } from '../../utils/messages';
import { TIME_OUT_IN_SECONDS } from '../../utils/config';

interface RaceResponse {
  response: TrlListResponse[];
}

export function* workGetTrlListFetch() {
  try {
    const { response }: RaceResponse = yield race({
      response: TrlList.getTrlList(),
      timeOut: delay(TIME_OUT_IN_SECONDS * 1000),
    });

    if (response) {
      yield put(getTrlListSuccess(response));
    } else {
      throw new Error(ERRORS.REQUEST_TIMEOUT);
    }
  } catch (error) {
    const { message } = error as Error;
    const errorMessage = message || ERRORS.GENERAL;

    toast.error(errorMessage);
    yield put(getTrlListFail(errorMessage));
  }
}

export function* trlListSaga() {
  yield takeEvery('trlList/getTrlListFetch', workGetTrlListFetch);
}
