import { AxiosResponse } from 'axios';

import { IUser } from '../../types/userTypes';
import { api } from '.';

export const whoIsThisRequest = (): Promise<AxiosResponse> => {
	return api.get<IUser>('user/whoIsThis');
};
