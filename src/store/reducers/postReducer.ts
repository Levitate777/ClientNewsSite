import { PostActionType, IPostState, PostAction } from "../../types/postTypes"

const initialState: IPostState = {
  posts: [],
  loading: false,
  error: null,
}

export const postReducer = (state = initialState, action: PostAction): IPostState => {
  switch (action.type) {
    case PostActionType.FETCH_POSTS: 
      return {loading: true, error: null, posts: []}
    case PostActionType.FETCH_POSTS_SUCCESS: 
      return {loading: false, error: null, posts: action.payload}
    case PostActionType.FETCH_POSTS_ERROR: 
      return {loading: false, error: action.payload, posts: []}
    default:
      return state
  }
}