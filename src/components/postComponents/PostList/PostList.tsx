import { useState } from 'react';

import Masonry from 'react-masonry-css';
import { FloatButton, Spin } from 'antd';

import { IPost } from '../../../types/postTypes';
import { defaultPost } from '../../../constants';
import PostCard from '../PostCard';
import PostCardModal from '../../modals/PostCardModal';
import ErrorModal from '../../modals/ErrorModal/ErrorModal';

import styles from './PostList.module.css'; 
import { IUser } from '../../../types/userTypes';

const breakpointColumnsObj = {
  default: 4,
  1600: 3,
  1100: 2,
  600: 1,
};

interface IPostList {
  posts: IPost[],
  isLoading: boolean,
  error: string | null,
  user?: IUser | null,
}

const PostList = ({ posts, isLoading, error, user }: IPostList) => {
  const [selectedPost, setSelectedPost] = useState<IPost>(defaultPost);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
              login={post.user?.login ?? user?.login} 
              avatar={post.user?.avatar ?? user?.avatar ?? null}
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
