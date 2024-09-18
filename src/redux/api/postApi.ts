import { AxiosResponse } from 'axios';

import { IPost } from '../../types/postTypes';
import { api } from '.';

export const getAllPosts = (): Promise<AxiosResponse> => {
  return api.get<IPost[]>('posts');
};
