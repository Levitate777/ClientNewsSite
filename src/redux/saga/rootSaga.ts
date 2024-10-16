import { all } from 'redux-saga/effects';

import { postWatcher } from './postSaga';
import { authWatcher } from './authSaga';
import { userWatcher } from './userSaga';

export function* rootSaga() {
	yield all([postWatcher(), authWatcher(), userWatcher()])
};
