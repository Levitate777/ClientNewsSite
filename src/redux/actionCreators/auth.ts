import { AxiosError } from 'axios';

import {
	FETCH_AUTH,
	FETCH_AUTH_SUCCESS,
	FETCH_AUTH_ERROR,
	LOGOUT_USER 
} from "../actionCreators/actionsAuthType"
import { AuthAction, IAuthActionPayload } from '../../types/authTypes';
import { IUser } from '../../types/userTypes';

export const fetchAuth = (userData: IAuthActionPayload): AuthAction => ({type: FETCH_AUTH, payload: userData});
export const fetchAuthSuccess = (currentUser: IUser): AuthAction => ({type: FETCH_AUTH_SUCCESS, payload: currentUser});
export const fetchAuthError = (error: AxiosError): AuthAction => ({type: FETCH_AUTH_ERROR, payload: error.message});
export const logoutUser = (): AuthAction => ({type: LOGOUT_USER});
