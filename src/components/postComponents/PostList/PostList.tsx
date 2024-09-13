import { useEffect, useState } from 'react';

import Masonry from 'react-masonry-css';
import { FloatButton } from 'antd';
import { useDispatch } from 'react-redux';

import { useTypeSelector } from '../../../store/hooks/useTypeSelector';
import { MyDispatch } from '../../../store/store';
import { fetchPosts } from '../../../store/actions/postActions';
import { IPost } from '../../../types/postTypes';
import { defaultPost } from '../../../utils/defaultPost';
import PostCard from '../PostCard';
import PostCardModal from '../../modals/PostModals';
import styles from './PostList.module.css' 
import ErrorModal from '../../modals/ErrorModals/ErrorModal';


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
  
  const dispatch: MyDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  const handleToggleModal = (post: IPost = defaultPost, isModalOpen: boolean = false) => {
    setSelectedPost(post);
    setModalOpen(isModalOpen);
  };
  
  return (
    <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonry__grid}
        columnClassName={styles.masonry__grid__column}
      >
        {isLoading ? (
          <div>Loading</div>
          ) : (
            posts.map((post: IPost) => 
              <div key={post.id}>
                <PostCard  post={post} openModal={() => handleToggleModal(post, true)}/>
              </div>
            )
          )
        }
        {error ? (
          <ErrorModal error={error}/>
        ) : (
          <>
            <PostCardModal 
              post={selectedPost} 
              modalOpen={modalOpen} 
              closeModal={() => 
                handleToggleModal()
              }
            />
            <FloatButton.BackTop />
          </>
        )}
    </Masonry>
  );
};

export default PostList;
