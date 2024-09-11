import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from "./reducers";
import { rootSaga } from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type MyDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
