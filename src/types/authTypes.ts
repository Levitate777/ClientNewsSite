import { FETCH_AUTH, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR, LOGOUT_USER } from "../redux/actionCreators/actionsAuthType";
import { IPost } from "./postTypes";
import { IUser, IUserData } from "./userTypes";

export interface IResponseAuth {
	user: IUser,
	accessToken: string,
	posts: IPost[],
}

export interface IAuthState {
	currentUser: IUser | null,
	isLoading: boolean,
	error: null | string,
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
	payload: IUser,
}

interface IFetchAuthErrorAction {
	type: typeof FETCH_AUTH_ERROR,
	payload: null | string,
}

interface ILogoutUser {
	type: typeof LOGOUT_USER,
}

export type AuthAction = IFetchAuthAction | IFetchAuthSuccessAction | IFetchAuthErrorAction | ILogoutUser;
