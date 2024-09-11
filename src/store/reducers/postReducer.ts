import { AxiosError } from "axios"

import { PostActionTypes, IPostState, PostAction, IPost } from "../../types/postTypes"

const initialState: IPostState = {
  posts: [],
  loading: false,
  error: null,
}

export const postReducer = (state = initialState, action: PostAction): IPostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS: 
      return {loading: true, error: null, posts: []}
    case PostActionTypes.FETCH_POSTS_SUCCESS: 
      return {loading: false, error: null, posts: action.payload}
    case PostActionTypes.FETCH_POSTS_ERROR: 
      return {loading: false, error: action.payload, posts: []}
    default:
      return state
  }
}

export const fetchPosts = (): PostAction => ({type: PostActionTypes.FETCH_POSTS});
export const fetchPostsSuccess = (posts: IPost[]): PostAction => ({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: posts});
export const fetchPostsError = (error: AxiosError): PostAction => ({type: PostActionTypes.FETCH_POSTS_ERROR, payload: error.message});
