import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers';
import { rootSaga } from './saga/rootSaga';
import { FETCH_ADD_POST, FETCH_USER_UPDATE } from './actionCreators/actionUserType';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FETCH_USER_UPDATE, FETCH_ADD_POST],
        ignoredPaths: ['payload.avatar', 'payload.image'],
      },
      thunk: false
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
