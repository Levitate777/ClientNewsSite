import { AxiosResponse } from 'axios';

import { api } from '.';
import { IPost } from '../../types/postTypes';

export const getAllPosts = (): Promise<AxiosResponse> => {
  return api.get<IPost[]>('posts');
}
