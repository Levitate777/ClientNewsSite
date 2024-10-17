import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import { FETCH_ADD_POST, FETCH_USER_UPDATE } from '../actionCreators/actionUserType';
import {
  fetchUserUpdateSuccess,
  fetchUserUpdateError,
  fetchAddPostSuccess,
  fetchAddPostError,
} from '../actionCreators/user';
import { IUserDataUpdate, IUserStateData } from '../../types/userTypes';
import { addPost, updateUser } from '../api/userApi';
import { UNKNOWN_ERROR } from '../../constants';
import { IPost, IPostPayload } from '../../types/postTypes';

function* updateUserSaga( action: { payload: IUserDataUpdate } ) {
  try {
    const response: AxiosResponse<IUserStateData> = yield call(updateUser, action.payload);
    yield put(fetchUserUpdateSuccess(response.data));
  } catch (error) {   
    if (error instanceof AxiosError) {
      yield put(fetchUserUpdateError(error));
    } else {
      yield put(fetchUserUpdateError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
};

function* addPostSaga( action: { payload: IPostPayload } ) {
  try {
    const response: AxiosResponse<IPost[]> = yield call(addPost, action.payload);
    yield put(fetchAddPostSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(fetchAddPostError(error));
    } else {
      yield put(fetchAddPostError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
}

export function* userWatcher() {
  yield takeEvery(FETCH_USER_UPDATE, updateUserSaga);
  yield takeEvery(FETCH_ADD_POST, addPostSaga);
};
