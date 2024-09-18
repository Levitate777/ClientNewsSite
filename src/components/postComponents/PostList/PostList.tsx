import { useEffect, useState } from 'react';

import Masonry from 'react-masonry-css';
import { FloatButton, Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { useTypeSelector } from '../../../redux/hooks/useTypeSelector';
import { AppDispatch } from '../../../redux/store';
import { fetchPosts } from '../../../redux/actionCreators/post';
import { IPost } from '../../../types/postTypes';
import { defaultPost } from '../../../constants';
import PostCard from '../PostCard';
import PostCardModal from '../../modals/PostCardModal';
import ErrorModal from '../../modals/ErrorModal/ErrorModal';

import styles from './PostList.module.css'; 

const breakpointColumnsObj = {
  default: 4,
  1600: 3,
  1100: 2,
  600: 1,
};

const PostList = () => {
  const [selectedPost, setSelectedPost] = useState<IPost>(defaultPost);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const posts: IPost[] = useTypeSelector(state => state.post.posts);
  const isLoading: boolean = useTypeSelector(state => state.post.isLoading);
  const error: string | null = useTypeSelector(state => state.post.error);
  
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  const handleToggleModal = (post: IPost) => {
    setSelectedPost(post);
    setModalOpen(!modalOpen)
  };
  
  return (
    <Spin spinning={isLoading} tip="Loading" size="large">
      <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry__grid}
          columnClassName={styles.masonry__grid__column}
        >
          {posts.map((post: IPost) => 
            <PostCard
              key={post.id}  
              login={post.user.login} 
              avatar={post.user.avatar}
              createdDate={post.createdAt}
              tags={post.tags}
              image={post.image}
              header={post.header}
              description={post.description}
              openModal={() => handleToggleModal(post)}
            />
          )}
          {error ? (
            <ErrorModal error={error}/>
          ) : (
            <>
              <PostCardModal 
                login={selectedPost.user.login} 
                avatar={selectedPost.user.avatar}
                createdDate={selectedPost.createdAt}
                tags={selectedPost.tags}
                image={selectedPost.image}
                header={selectedPost.header}
                description={selectedPost.description} 
                modalOpen={modalOpen} 
                closeModal={() => setModalOpen(false)}
              />
              <FloatButton.BackTop />
            </>
          )}
      </Masonry>
    </Spin>
  );
};

export default PostList;
