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
import defaultImage from '../../../images/Waaaaaaagh.webp';
import styles from './PostCardModal.module.css' 

interface IPostItemProps {
  post: IPost,
  modalOpen: boolean,
  closeModal: () => void,
}

const PostCardModal = ({post, modalOpen, closeModal}: IPostItemProps) => {
  const createdData = formatDate(post.createdAt);

  return (
    <>
      <Modal 
        className={styles.modal}
        centered
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Flex className={styles.modal__info} gap={'small'}>
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
        <Flex className={styles.modal__tags} wrap gap={'small'}>
          {post.tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
        </Flex>
        <div className={styles.modal__image}>
          <Image
            className={styles.image__item}
            src={defaultImage}
          />
        </div>
        <div className={styles.modal__text}>
          <h2>{post.header}</h2>
          <span>{post.description}</span>
        </div>
      </Modal>
    </>
  );
};

export default PostCardModal;
