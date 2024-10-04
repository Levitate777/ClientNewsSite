import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import { FETCH_AUTH } from '../actionCreators/actionsAuthType';
import { fetchAuthSuccess, fetchAuthError } from '../actionCreators/auth';
import { IUserData } from '../../types/userTypes';
import { IResponseAuth } from '../../types/authTypes';
import { registration } from '../api/authApi';
import { UNKNOWN_ERROR } from '../../constants';

function* authSaga( action: { payload: IUserData } ) {
  try {
    const response: AxiosResponse<IResponseAuth> = yield call(registration, action.payload);
    yield put(fetchAuthSuccess(response.data.user));
    localStorage.setItem('token', response.data.accessToken)
  } catch (error) {   
    if (error instanceof AxiosError) {
      yield put(fetchAuthError(error));
    } else {
      yield put(fetchAuthError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
};

export function* authWatcher() {
  yield takeEvery(FETCH_AUTH, authSaga);
};
