import { combineReducers, createStore } from "redux";
import { postReducer } from "./postReducer";


const rootReducer = combineReducers({
    post: postReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
