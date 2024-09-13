import { FC, useEffect, useState } from "react";
import Masonry from 'react-masonry-css';

import { useTypeSelector } from "../../store/hooks/useTypeSelector";
import { MyDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/reducers/postReducer";
import PostItem from "./PostItem";
import { IPost } from "../../types/postTypes";
import './style.css'
import { FloatButton } from "antd";
import PostItemModal from "../modals/PostModals/PostItemModal";

const PostList: FC = () => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const posts: IPost[] = useTypeSelector(state => state.post.posts)
  const isLoading: boolean = useTypeSelector(state => state.post.isLoading)
  const error: string | null = useTypeSelector(state => state.post.error)
  
  const dispatch: MyDispatch = useDispatch();

  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    1100: 2,
    600: 1,
  };

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

    const openModal = (post: IPost) => {
      setSelectedPost(post);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setSelectedPost(null);
    };
  
  return (
    <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {isLoading ? (
        <div>Loading</div>
        ) : (
          error ? (
            <h1>{error}</h1>
          ) : (
          posts.map((post: IPost) => 
            <div key={post.id}>
              <PostItem  post={post} openModal={() => openModal(post)}/>
            </div>
          )
        ))}
        <PostItemModal post={selectedPost} modalOpen={modalOpen} closeModal={() => closeModal()}/>
        <FloatButton.BackTop />
    </Masonry>
  );
};

export default PostList;
