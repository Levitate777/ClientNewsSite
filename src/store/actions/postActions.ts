import { AxiosError } from 'axios';

import { PostAction, PostActionTypes, IPost } from '../../types/postTypes';

export const fetchPosts = (): PostAction => ({type: PostActionTypes.FETCH_POSTS});
export const fetchPostsSuccess = (posts: IPost[]): PostAction => ({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: posts});
export const fetchPostsError = (error: AxiosError): PostAction => ({type: PostActionTypes.FETCH_POSTS_ERROR, payload: error.message});