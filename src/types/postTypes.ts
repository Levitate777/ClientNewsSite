import { ITag } from "./tagTypes";
import { IUser } from "./userTypes";

interface IPost {
  id: number,
  header: string,
  description: string,
  image: string,
  createdAt: string,
  user: Pick<IUser, 'login'>
  tag: ITag[],
}

export interface IPostState {
  posts: IPost[],
  loading: boolean,
  error: null | string,
}

interface IFetchPosts {
  type: PostActionType.FETCH_POSTS,
}

interface IFetchPostsSuccess {
  type: PostActionType.FETCH_POSTS_SUCCESS,
  payload: IPost[],
}

interface IFetchPostsError {
  type: PostActionType.FETCH_POSTS_ERROR,
  payload: string,
}

export type PostAction = IFetchPosts | IFetchPostsSuccess | IFetchPostsError;

export enum PostActionType {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
}