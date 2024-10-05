import { AxiosResponse } from 'axios';

import { IUserData } from '../../types/userTypes';
import { IResponseAuth } from '../../types/authTypes';
import { api } from '.';

export const requestAuth = (user: IUserData, route: string): Promise<AxiosResponse> => {
  return api.post<IResponseAuth>(`auth/${route}`, { ...user});
};
