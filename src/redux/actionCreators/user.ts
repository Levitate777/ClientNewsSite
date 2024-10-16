import { AxiosError } from 'axios';

import {
	FETCH_AUTH,
	FETCH_AUTH_SUCCESS,
	FETCH_AUTH_ERROR,
	LOGOUT_USER,
	FETCH_USER_UPDATE,
	FETCH_USER_UPDATE_SUCCESS,
	FETCH_USER_UPDATE_ERROR,
	FETCH_WHO_IS_THIS,
} from "../actionCreators/actionUserType"
import {
	AuthAction,
	IAuthActionPayload,
	IUserDataUpdate,
	UserAction,
	IUserStateData,
} from '../../types/userTypes';

export const fetchAuth = (userData: IAuthActionPayload): AuthAction => ({type: FETCH_AUTH, payload: userData});
export const fetchAuthSuccess = (currentUserData: IUserStateData): AuthAction => ({type: FETCH_AUTH_SUCCESS, payload: currentUserData});
export const fetchAuthError = (error: AxiosError): AuthAction => ({type: FETCH_AUTH_ERROR, payload: error.message});
export const logoutUser = (): AuthAction => ({type: LOGOUT_USER});
export const fetchUserUpdate = (userData: IUserDataUpdate): UserAction => ({type: FETCH_USER_UPDATE, payload: userData});
export const fetchUserUpdateSuccess = (newUserData: IUserStateData): UserAction => ({type: FETCH_USER_UPDATE_SUCCESS, payload: newUserData});
export const fetchUserUpdateError = (error: AxiosError): UserAction => ({type: FETCH_USER_UPDATE_ERROR, payload: error.message});
export const fetchWhoIsThis = (): UserAction => ({type: FETCH_WHO_IS_THIS});
