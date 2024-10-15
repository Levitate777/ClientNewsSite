import {
  FETCH_AUTH,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  LOGOUT_USER,
  FETCH_USER_UPDATE,
	FETCH_USER_UPDATE_SUCCESS,
	FETCH_USER_UPDATE_ERROR,
  FETCH_WHO_IS_THIS_SUCCESS,
} from "../actionCreators/actionUserType";
import { UserAction, IUserState } from "../../types/userTypes";

const initialState: IUserState = {
  currentUser: null,
  posts: [],
  isLoading: false,
  errorAuth: null,
	errorAddPost: null,
	errorUpdate: null,
};

export const userReducer = (state = initialState, action: UserAction): IUserState => {
  switch(action.type) {
    case FETCH_AUTH: 
      return {
        ...state,
        isLoading: true, 
        errorAuth: null, 
        currentUser: null,
        posts: [],
      }
    case FETCH_AUTH_SUCCESS: 
      return {
        ...state,
        isLoading: false, 
        errorAuth: null, 
        currentUser: action.payload.user,
        posts: action.payload.posts,
      }
    case FETCH_AUTH_ERROR: 
      return {
        ...state,
        isLoading: false, 
        errorAuth: action.payload, 
        currentUser: null,
        posts: [],
      }
    case LOGOUT_USER:
      return {
        ...state,
        isLoading: true, 
        errorAuth: null, 
        currentUser: null,
        posts: [],
      }
    case FETCH_WHO_IS_THIS_SUCCESS:
      return {
        ...state,
        isLoading: false,  
        currentUser: action.payload,
      }
    case FETCH_USER_UPDATE: 
      return {
        ...state,
        isLoading: true, 
        errorUpdate: null,
      }
    case FETCH_USER_UPDATE_SUCCESS: 
      return {
        ...state,
        isLoading: false, 
        errorUpdate: null, 
        currentUser: action.payload,
      }
    case FETCH_USER_UPDATE_ERROR: 
      return {
        ...state,
        isLoading: false, 
        errorUpdate: action.payload, 
      }
    default:
      return state
  }
};
