import {
  FETCH_AUTH,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  LOGOUT_USER 
} from "../actionCreators/actionsAuthType";
import { AuthAction, IAuthState } from "../../types/authTypes";

const initialState: IAuthState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action: AuthAction): IAuthState => {
  switch(action.type) {
    case FETCH_AUTH: 
      return {
        isLoading: true, 
        error: null, 
        currentUser: null,
      }
    case FETCH_AUTH_SUCCESS: 
      return {
        isLoading: false, 
        error: null, 
        currentUser: action.payload,
      }
    case FETCH_AUTH_ERROR: 
      return {
        isLoading: false, 
        error: action.payload, 
        currentUser: null,
      }
    case LOGOUT_USER:
      return {
        isLoading: true, 
        error: null, 
        currentUser: null,
      }
    default:
      return state
  }
};
