import { AxiosError } from 'axios';

import {
	FETCH_AUTH,
	FETCH_AUTH_SUCCESS,
	FETCH_AUTH_ERROR,
	LOGOUT_USER,
	FETCH_USER_UPDATE,
	FETCH_USER_UPDATE_SUCCESS,
	FETCH_USER_UPDATE_ERROR, 
} from "../actionCreators/actionUserType"
import { AuthAction, IAuthActionPayload, IUser, IUserDataUpdate, UserAction } from '../../types/userTypes';
import { IPost } from '../../types/postTypes';

export const fetchAuth = (userData: IAuthActionPayload): AuthAction => ({type: FETCH_AUTH, payload: userData});
export const fetchAuthSuccess = (currentUser: IUser, posts: IPost[]): AuthAction => ({type: FETCH_AUTH_SUCCESS, payload: {user: currentUser, posts: posts}});
export const fetchAuthError = (error: AxiosError): AuthAction => ({type: FETCH_AUTH_ERROR, payload: error.message});
export const logoutUser = (): AuthAction => ({type: LOGOUT_USER});
export const fetchUserUpdate = (userData: IUserDataUpdate): UserAction => ({type: FETCH_USER_UPDATE, payload: userData});
export const fetchUserUpdateSuccess = (currentUser: IUser): UserAction => ({type: FETCH_USER_UPDATE_SUCCESS, payload: currentUser});
export const fetchUserUpdateError = (error: AxiosError): UserAction => ({type: FETCH_USER_UPDATE_ERROR, payload: error.message});
