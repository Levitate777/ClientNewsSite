import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import { FETCH_USER_UPDATE } from '../actionCreators/actionUserType';
import { fetchUserUpdateSuccess, fetchUserUpdateError } from '../actionCreators/user';
import { IUserDataUpdate, IUserStateData } from '../../types/userTypes';
import { updateUser } from '../api/userApi';
import { UNKNOWN_ERROR } from '../../constants';

function* updateUserSaga( action: { payload: IUserDataUpdate } ) {
  try {
		console.log('userSagaData: ', action.payload);
    const response: AxiosResponse<IUserStateData> = yield call(updateUser, action.payload);
    console.log('response.data: ', response.data);
    yield put(fetchUserUpdateSuccess(response.data));
  } catch (error) {   
    if (error instanceof AxiosError) {
      yield put(fetchUserUpdateError(error));
    } else {
      yield put(fetchUserUpdateError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
};

export function* userWatcher() {
  yield takeEvery(FETCH_USER_UPDATE, updateUserSaga);
};
