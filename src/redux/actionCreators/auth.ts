import { AxiosError } from 'axios';

import { FETCH_AUTH, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR } from "../actionCreators/actionsAuthType"
import { AuthAction, ICurrentUser } from '../../types/authTypes';

export const fetchAuth = (): AuthAction => ({type: FETCH_AUTH});
export const fetchAuthSuccess = (currentUser: ICurrentUser): AuthAction => ({type: FETCH_AUTH_SUCCESS, payload: currentUser});
export const fetchAuthError = (error: AxiosError): AuthAction => ({type: FETCH_AUTH_ERROR, payload: error.message});
