import { 
  PostActionTypes, 
  IPostState, 
  PostAction, 
} from '../../types/postTypes'

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
        error: null, 
        posts: action.payload,
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
