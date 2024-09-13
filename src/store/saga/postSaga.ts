import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import { IPost, PostActionTypes } from '../../types/postTypes';
import { getAllPosts } from '../api/postApi';
import { fetchPostsSuccess, fetchPostsError } from '../actions/postActions';
import { UNKNOWN_ERROR } from '../../constants';

function* fetchPosts() {
  try {
    const response: AxiosResponse<IPost[]> = yield call(getAllPosts);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    const currentError = error instanceof AxiosError;
    if (currentError) {
      yield put(fetchPostsError(error));
    } else {
      yield put(fetchPostsError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
}

export function* postWatcher() {
  yield takeEvery(PostActionTypes.FETCH_POSTS, fetchPosts);
}
