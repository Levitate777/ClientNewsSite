import { all } from 'redux-saga/effects';

import { postWatcher } from './postSaga';

export function* rootSaga() {
    yield all([postWatcher()])
}
