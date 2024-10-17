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
	FETCH_ADD_POST,
	FETCH_ADD_POST_SUCCESS,
	FETCH_ADD_POST_ERROR,
} from "../actionCreators/actionUserType"
import {
	AuthAction,
	IAuthActionPayload,
	IUserDataUpdate,
	IUserStateData,
	AddPostAction,
	UpdateAction,
} from '../../types/userTypes';
import { IPost, IPostPayload } from '../../types/postTypes';

export const fetchAuth = (userData: IAuthActionPayload): AuthAction => ({type: FETCH_AUTH, payload: userData});
export const fetchAuthSuccess = (currentUserData: IUserStateData): AuthAction => ({type: FETCH_AUTH_SUCCESS, payload: currentUserData});
export const fetchAuthError = (error: AxiosError): AuthAction => ({type: FETCH_AUTH_ERROR, payload: error.message});
export const logoutUser = (): AuthAction => ({type: LOGOUT_USER});
export const fetchUserUpdate = (userData: IUserDataUpdate): UpdateAction => ({type: FETCH_USER_UPDATE, payload: userData});
export const fetchUserUpdateSuccess = (newUserData: IUserStateData): UpdateAction => ({type: FETCH_USER_UPDATE_SUCCESS, payload: newUserData});
export const fetchUserUpdateError = (error: AxiosError): UpdateAction => ({type: FETCH_USER_UPDATE_ERROR, payload: error.message});
export const fetchWhoIsThis = (): AuthAction => ({type: FETCH_WHO_IS_THIS});
export const fetchAddPost = (postData: IPostPayload): AddPostAction => ({type: FETCH_ADD_POST, payload: postData});
export const fetchAddPostSuccess = (userPosts: IPost[]): AddPostAction => ({type: FETCH_ADD_POST_SUCCESS, payload: userPosts});
export const fetchAddPostError = (error: AxiosError): AddPostAction => ({type: FETCH_ADD_POST_ERROR, payload: error.message});
