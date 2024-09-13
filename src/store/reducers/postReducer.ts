import { AxiosError } from "axios"

import { PostActionTypes, IPostState, PostAction, IPost } from "../../types/postTypes"

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  error: null,
}

export const postReducer = (state = initialState, action: PostAction): IPostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS: 
      return {
        isLoading: true, 
        error: null, 
        posts: [],
      }
    case PostActionTypes.FETCH_POSTS_SUCCESS: 
      return {
        isLoading: false, 
        error: null, posts: 
        action.payload,
      }
    case PostActionTypes.FETCH_POSTS_ERROR: 
      return {
        isLoading: false, 
        error: action.payload, 
        posts: [],
      }
    default:
      return state
  }
}

export const fetchPosts = (): PostAction => ({type: PostActionTypes.FETCH_POSTS});
export const fetchPostsSuccess = (posts: IPost[]): PostAction => ({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: posts});
export const fetchPostsError = (error: AxiosError): PostAction => ({type: PostActionTypes.FETCH_POSTS_ERROR, payload: error.message});
