import { AxiosResponse } from 'axios';

import { IUserData } from '../../types/userTypes';
import { IResponseAuth } from '../../types/authTypes';
import { api } from '.';

export const registration = (user: IUserData): Promise<AxiosResponse> => {
  return api.post<IResponseAuth>('user', { ...user})
};
