import { AxiosError } from 'axios';

import { PostAction, IPost } from '../../types/postTypes';
import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from './actionsPostType';

export const fetchPosts = (): PostAction => ({type: FETCH_POSTS});
export const fetchPostsSuccess = (posts: IPost[]): PostAction => ({type: FETCH_POSTS_SUCCESS, payload: posts});
export const fetchPostsError = (error: AxiosError): PostAction => ({type: FETCH_POSTS_ERROR, payload: error.message});
