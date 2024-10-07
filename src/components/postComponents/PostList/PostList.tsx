import { useEffect, useState } from 'react';

import Masonry from 'react-masonry-css';
import { FloatButton, Pagination, PaginationProps, Spin } from 'antd';
import { useDispatch } from 'react-redux';

import { useTypeSelector } from '../../../redux/hooks/useTypeSelector';
import { AppDispatch } from '../../../redux/store';
import { fetchPosts } from '../../../redux/actionCreators/post';
import { IPost } from '../../../types/postTypes';
import { defaultPost } from '../../../constants';
import { pageSizeOptions } from '../../../utils/pageSizeOptions';
import PostCard from '../PostCard';
import PostCardModal from '../../modals/PostCardModal';
import ErrorModal from '../../modals/ErrorModal/ErrorModal';
import usePagination from '../../../hooks/usePagination';

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
  const [countPostsOnPage, setCountPostsOnPage] = useState<number>(import.meta.env.VITE_APP_COUNT_POSTS_ON_PAGE);

  const posts: IPost[] = useTypeSelector(state => state.post.posts);
  const isLoading: boolean = useTypeSelector(state => state.post.isLoading);
  const error: string | null = useTypeSelector(state => state.post.error);
  
  const dispatch: AppDispatch = useDispatch();

  const [postsOnPage, setCurrentPage] = usePagination(posts, countPostsOnPage);
  
  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  const handleToggleModal = (post: IPost) => {
    setSelectedPost(post);
    setModalOpen(!modalOpen)
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
    setCountPostsOnPage(pageSize);
  };

  const handleCurrentPage: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  }
  
  return (
    <Spin spinning={isLoading} tip="Loading" size="large">
      <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonry__grid}
          columnClassName={styles.masonry__grid__column}
        >
          {postsOnPage.map((post: IPost) => 
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
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={handleCurrentPage}
        align='center'
        defaultPageSize={import.meta.env.VITE_APP_COUNT_POSTS_ON_PAGE}
        pageSizeOptions={pageSizeOptions()}
        defaultCurrent={1}
        total={posts.length}
      />
    </Spin>
  );
};

export default PostList;
