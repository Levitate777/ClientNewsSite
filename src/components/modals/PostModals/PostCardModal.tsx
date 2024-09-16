import { UserOutlined } from '@ant-design/icons';
import { 
  Avatar, 
  Flex, 
  Modal, 
  Tag, 
  Image,
} from 'antd';

import { IPost } from '../../../types/postTypes';
import { formatDate } from '../../../utils/formatDate';
import { useTypeSelector } from '../../../redux/hooks/useTypeSelector';
import { defaultPost } from '../../../utils/defaultPost';

import defaultImage from '../../../images/Waaaaaaagh.webp';
import styles from './PostCardModal.module.css'; 

interface IPostItemProps {
  postId: number,
  modalOpen: boolean,
  closeModal: () => void,
}

const PostCardModal = ({postId, modalOpen, closeModal}: IPostItemProps) => {
  const posts: IPost[] = useTypeSelector(state => state.post.posts);
  
  const searchPost = (postId: number) => {
    const post: IPost[] = posts.filter((post) => post.id === postId);
    return post.length ? post[0] : defaultPost;
  }

  const post: IPost = searchPost(postId);
  const createdData = formatDate(post.createdAt);

  return (
    <Modal 
      className={styles.card}
      centered
      open={modalOpen}
      onCancel={closeModal}
      footer={null}
    >
      <Flex className={styles.card__info} gap={'small'}>
        <Avatar 
          className={styles.info__avatar} 
          shape='square' 
          size='large' 
          icon={post.user.avatar 
            ? post.user.avatar 
            : <UserOutlined/>
          } 
        />
        <div>
          <div className={styles.info__login}>{post.user.login}</div>
          <div className={styles.info__date}>{createdData}</div>
        </div>
      </Flex>
      <Flex className={styles.card__tags} wrap gap={'small'}>
        {post.tags.map(tag => 
          <Tag key={tag.id}>{tag.name}</Tag>
        )}
      </Flex>
      <div className={styles.image__container}>
        <Image
          className={styles.card__image}
          src={defaultImage}
        />
      </div>
      <div className={styles.card__text}>
        <h2>{post.header}</h2>
        <span>{post.description}</span>
      </div>
    </Modal>
  );
};

export default PostCardModal;
