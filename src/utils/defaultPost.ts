import { IPost } from '../types/postTypes';

export const defaultPost: IPost = {
  id: 0,
  header: '',
  description: '',
  image: '',
  createdAt: '',
  user: {
    login: '',
    avatar: null,
  },
  tags: [],
}
