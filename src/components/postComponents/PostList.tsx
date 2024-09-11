import { FC, useEffect } from "react";

import { useTypeSelector } from "../../store/hooks/useTypeSelector";
import { MyDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/reducers/postReducer";
import PostItem from "./PostItem";
import { IPost, IPostState } from "../../types/postTypes";

const PostList: FC = () => {
  const {posts, loading, error}: IPostState = useTypeSelector(state => state.post)
  //const posts: IPost[] = useTypeSelector(state => state.post.posts)
  
  const dispatch: MyDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  
  return (
    <div>
        {loading ? (
            <div>Loading</div>
          ) : (
            posts.map((post: IPost) => <PostItem key={post.id} post={post}/>)
        )}
    </div>
  );
};

export default PostList;
