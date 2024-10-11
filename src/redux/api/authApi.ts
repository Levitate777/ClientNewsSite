import { AxiosResponse } from 'axios';

import { IUserData, IResponseAuth } from '../../types/userTypes';
import { api } from '.';

export const requestAuth = (user: IUserData, route: string): Promise<AxiosResponse> => {
  return api.post<IResponseAuth>(`auth/${route}`, { ...user});
};
