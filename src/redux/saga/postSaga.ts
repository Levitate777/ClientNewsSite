import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';

import { IPost } from '../../types/postTypes';
import { FETCH_POSTS } from '../actionCreators/actionsPostType';
import { getAllPosts } from '../api/postApi';
import { fetchPostsSuccess, fetchPostsError } from '../actionCreators/post';
import { UNKNOWN_ERROR } from '../../constants';

function* fetchPosts() {
  try {
    const response: AxiosResponse<IPost[]> = yield call(getAllPosts);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {   
    if (error instanceof AxiosError) {
      yield put(fetchPostsError(error));
    } else {
      yield put(fetchPostsError(new AxiosError(UNKNOWN_ERROR)));
    }
  }
};

export function* postWatcher() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
};
