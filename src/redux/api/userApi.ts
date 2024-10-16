import { AxiosResponse } from 'axios';

import { IUserDataUpdate, IUserStateData } from '../../types/userTypes';
import { api } from '.';

export const updateUser = (payload: IUserDataUpdate): Promise<AxiosResponse> => { 
	const { id, login, avatar } = payload;
	const formData = new FormData();
	formData.append('id', id);
	if (login) formData.append('login', login);
	if (avatar) formData.append('avatar', avatar);
	for (const [key, value] of formData) {
    console.log(`${key}: ${value}\n`);
  }

  return api.patch<IUserStateData>(
		`user`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } },
	);
};

export const whoIsThisRequest = (): Promise<AxiosResponse> => {
	return api.get<IUserStateData>('user/whoIsThis');
};
