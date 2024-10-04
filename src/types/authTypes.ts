import { FETCH_AUTH, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR } from "../redux/actionCreators/actionsAuthType";
import { IUser, IUserData } from "./userTypes";

export interface IResponseAuth {
	user: IUser,
	accessToken: string,
}

export interface IAuthState {
	currentUser: IUser | null,
	isLoading: boolean,
	error: null | string,
}

interface IFetchAuthAction {
	type: typeof FETCH_AUTH,
	payload: IUserData,
}

interface IFetchAuthSuccessAction {
	type: typeof FETCH_AUTH_SUCCESS,
	payload: IUser,
}

interface IFetchAuthErrorAction {
	type: typeof FETCH_AUTH_ERROR,
	payload: null | string,
}

export type AuthAction = IFetchAuthAction | IFetchAuthSuccessAction | IFetchAuthErrorAction;
