import { put, call, takeEvery } from "redux-saga/effects";
import { AxiosError, AxiosResponse } from "axios";

import { IPost, PostActionTypes } from "../../types/postTypes";
import { getAllPosts } from "../api/postApi";
import { fetchPostsSuccess, fetchPostsError } from "../reducers/postReducer";


const UNKNOWN_ERROR = "unknown error";

function* fetchPosts() {
  try {
    const response: AxiosResponse<IPost[]> = yield call(getAllPosts);
    console.log(response.data);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    const currentError = error instanceof AxiosError;
    yield currentError
      ? put(fetchPostsError(error))
      : put(fetchPostsError(new AxiosError(UNKNOWN_ERROR)));
  }
}

export function* postWatcher() {
  yield takeEvery(PostActionTypes.FETCH_POSTS, fetchPosts)
}
