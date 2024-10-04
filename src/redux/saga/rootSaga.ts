import { all } from 'redux-saga/effects';

import { postWatcher } from './postSaga';
import { authWatcher } from './authSaga';

export function* rootSaga() {
    yield all([postWatcher(), authWatcher()])
};
