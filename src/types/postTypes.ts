import { ITag } from './tagTypes';
import { IUser } from './userTypes';
import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from '../redux/actionCreators/actionsPostType'

export interface IPost {
  id: number,
  header: string,
  description: string,
  image: string,
  createdAt: string,
  user: Pick<IUser, 'login' | 'avatar'>
  tags: ITag[],
}

export interface IPostState {
  posts: IPost[],
  isLoading: boolean,
  error: null | string,
}

interface IFetchPostsAction {
  type: typeof FETCH_POSTS,
}

interface IFetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS,
  payload: IPost[],
}

interface IFetchPostsErrorAction {
  type: typeof FETCH_POSTS_ERROR,
  payload: null | string,
}

export type PostAction = IFetchPostsAction | IFetchPostsSuccessAction | IFetchPostsErrorAction;
