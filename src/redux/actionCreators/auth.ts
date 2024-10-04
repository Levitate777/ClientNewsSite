import { AxiosError } from 'axios';

import { FETCH_AUTH, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR } from "../actionCreators/actionsAuthType"
import { AuthAction } from '../../types/authTypes';
import { IUser, IUserData } from '../../types/userTypes';

export const fetchAuth = (user: IUserData): AuthAction => ({type: FETCH_AUTH, payload: user});
export const fetchAuthSuccess = (currentUser: IUser): AuthAction => ({type: FETCH_AUTH_SUCCESS, payload: currentUser});
export const fetchAuthError = (error: AxiosError): AuthAction => ({type: FETCH_AUTH_ERROR, payload: error.message});
