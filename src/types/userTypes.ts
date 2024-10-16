import {
  FETCH_AUTH,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  LOGOUT_USER,
	FETCH_USER_UPDATE,
	FETCH_USER_UPDATE_SUCCESS,
	FETCH_USER_UPDATE_ERROR, 
	FETCH_WHO_IS_THIS,
} from "../redux/actionCreators/actionUserType";
import { IPost } from "./postTypes";

export interface IUser {
  id: number,
  login: string,
  email: string,
  avatar: string | null,
}

export interface IUserData {
  login?: string,
  password: string,
  email: string,
}

export interface IUserState {
	currentUser: IUser | null,
	posts: IPost[],
	isLoading: boolean,
  errorAuth: null | string,
	errorAddPost: null | string,
	errorUpdate: null | string,
}

export interface IUserStateData {
	user: IUser,
	posts: IPost[],
}

export interface IUserDataUpdate {
	id: string,
  login: string | null,
  avatar: File | null,
}

export interface IResponseAuth {
	user: IUser,
	accessToken: string,
	posts: IPost[],
}

export interface IAuthActionPayload {
  user: IUserData,
  route: string,
}

interface IFetchAuthAction {
	type: typeof FETCH_AUTH,
	payload: IAuthActionPayload,
}

interface IFetchAuthSuccessAction {
	type: typeof FETCH_AUTH_SUCCESS,
	payload: IUserStateData,
}

interface IFetchAuthErrorAction {
	type: typeof FETCH_AUTH_ERROR,
	payload: null | string,
}

interface ILogoutUser {
	type: typeof LOGOUT_USER,
}

interface IWhoIsThis {
	type: typeof FETCH_WHO_IS_THIS,
}

export type AuthAction = 
IFetchAuthAction 
| IFetchAuthSuccessAction 
| IFetchAuthErrorAction 
| ILogoutUser 
| IWhoIsThis;

interface IFetchUserUpdateAction {
	type: typeof FETCH_USER_UPDATE,
	payload: IUserDataUpdate,
}

interface IFetchUserUpdateSuccessAction {
	type: typeof FETCH_USER_UPDATE_SUCCESS,
	payload: IUserStateData,
}

interface IFetchUserUpdateErrorAction {
	type: typeof FETCH_USER_UPDATE_ERROR,
	payload: null | string,
}

export type UpdateAction = IFetchUserUpdateAction | IFetchUserUpdateSuccessAction | IFetchUserUpdateErrorAction;

export type UserAction = AuthAction | UpdateAction;
