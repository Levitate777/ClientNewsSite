import { FETCH_AUTH, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR } from "../redux/actionCreators/actionsAuthType";
import { IUser, IUserData } from "./userTypes";

export interface IResponseAuth {
	user: IUserData,
	accessToken: string,
}

export interface IAuthState {
	currentUser: IUser | null,
	isLoading: boolean,
	error: null | string,
}

interface IFetchPostsAction {
	type: typeof FETCH_AUTH,
}

interface IFetchPostsSuccessAction {
	type: typeof FETCH_AUTH_SUCCESS,
	payload: IUser,
}

interface IFetchPostsErrorAction {
	type: typeof FETCH_AUTH_ERROR,
	payload: null | string,
}

export type AuthAction = IFetchPostsAction | IFetchPostsSuccessAction | IFetchPostsErrorAction;
