import { useEffect, useState } from 'react';

import Masonry from 'react-masonry-css';
import { FloatButton, Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { useTypeSelector } from '../../../store/hooks/useTypeSelector';
import { MyDispatch } from '../../../store/store';
import { fetchPosts } from '../../../store/actions/postActions';
import { IPost } from '../../../types/postTypes';
import PostCard from '../PostCard';
import PostCardModal from '../../modals/PostModals';
import ErrorModal from '../../modals/ErrorModals/ErrorModal';
import styles from './PostList.module.css' 


const breakpointColumnsObj = {
  default: 4,
  1600: 3,
  1100: 2,
  600: 1,
};

const PostList = () => {
  const [selectedPost, setSelectedPost] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const posts: IPost[] = useTypeSelector(state => state.post.posts);
  const isLoading: boolean = useTypeSelector(state => state.post.isLoading);
  const error: string | null = useTypeSelector(state => state.post.error);
  
  const dispatch: MyDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  const handleToggleModal = (postId: number = 1, isModalOpen: boolean = false) => {
    setSelectedPost(postId);
    setModalOpen(isModalOpen);
  };
  
  return (
    <Spin spinning={isLoading} tip="Loading" size="large">
      <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry__grid}
          columnClassName={styles.masonry__grid__column}
        >
          {posts.map((post: IPost) => 
            <div key={post.id}>
              <PostCard  
              postUserLogin={post.user.login} 
              postUserAvatar={post.user.avatar}
              postDate={post.createdAt}
              postTags={post.tags}
              postImage={post.image}
              postHeader={post.header}
              postDescription={post.description}
              openModal={() => handleToggleModal(post.id, true)}
            />
            </div>
          )}
          {error ? (
            <ErrorModal error={error}/>
          ) : (
            <>
              <PostCardModal 
                postId={selectedPost} 
                modalOpen={modalOpen} 
                closeModal={() => 
                  handleToggleModal()
                }
              />
              <FloatButton.BackTop />
            </>
          )}
      </Masonry>
    </Spin>
  );
};

export default PostList;
