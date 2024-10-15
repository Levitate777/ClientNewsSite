import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import { FETCH_AUTH, FETCH_WHO_IS_THIS } from '../actionCreators/actionUserType';
import { fetchAuthSuccess, fetchAuthError, fetchWhoIsThisSuccess } from '../actionCreators/user';
import { IAuthActionPayload, IResponseAuth } from '../../types/userTypes';
import { requestAuth } from '../api/authApi';
import { UNKNOWN_ERROR } from '../../constants';
import { whoIsThisRequest } from '../api/userApi';

function* authSaga( action: { payload: IAuthActionPayload } ) {
  try {
    const response: AxiosResponse<IResponseAuth> = yield call(requestAuth, action.payload.user, action.payload.route);
    console.log('response.data: ', response.data);
    yield put(fetchAuthSuccess(response.data.user, response.data.posts));
    localStorage.setItem('token', response.data.accessToken)
  } catch (error) {   
    if (error instanceof AxiosError) {
      yield put(fetchAuthError(error));
    } else {
      yield put(fetchAuthError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
};

function* whoIsThis() {
  try {
    const response: AxiosResponse = yield call(whoIsThisRequest);
    yield put(fetchWhoIsThisSuccess(response.data));
  } catch (error) {
    if (localStorage.length) {
      yield localStorage.removeItem('token');
    }
    if (error instanceof AxiosError) {
      yield put(fetchAuthError(error));
    } else {
      yield put(fetchAuthError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
}

export function* authWatcher() {
  yield takeEvery(FETCH_AUTH, authSaga);
  yield takeEvery(FETCH_WHO_IS_THIS, whoIsThis);
};
