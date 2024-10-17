import { AxiosResponse } from 'axios';

import { IUserDataUpdate, IUserStateData } from '../../types/userTypes';
import { IPost, IPostPayload } from '../../types/postTypes';
import { api } from '.';

export const updateUser = (payload: IUserDataUpdate): Promise<AxiosResponse> => { 
	const { id, login, avatar } = payload;
	const formData = new FormData();
	formData.append('id', id);
	if (login) formData.append('login', login);
	if (avatar) formData.append('avatar', avatar);

  return api.patch<IUserStateData>(
		`user`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } },
	);
};

export const addPost = (payload: IPostPayload): Promise<AxiosResponse> => {
	const { id, header, description, tags, image } = payload;
  const formData = new FormData();
	formData.append('id', id);
  formData.append('header', header);
  formData.append('description', description);
  formData.append('tags', tags);
	if (image) formData.append('image', image);

  return api.post<IPost[]>('posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const whoIsThisRequest = (): Promise<AxiosResponse> => {
	return api.get<IUserStateData>('user/whoIsThis');
};
