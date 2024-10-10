import { UserOutlined } from '@ant-design/icons';
import { 
  Avatar, 
  Flex, 
  Modal, 
  Tag, 
  Image,
} from 'antd';

import { ITag } from '../../../types/tagTypes';
import { formatDate } from '../../../utils/formatDate';

import defaultImage from '../../../images/Waaaaaaagh.webp';
import styles from './PostCardModal.module.css'; 

interface IPostCardProps {
  login: string, 
  avatar: string | null, 
  createdDate: string, 
  tags: ITag[], 
  image: string | null, 
  header: string, 
  description: string, 
  modalOpen: boolean,
  closeModal: () => void,
}

const PostCardModal = ({
  login, 
  avatar, 
  createdDate, 
  tags, 
  image, 
  header, 
  description, 
  modalOpen, 
  closeModal,
}: IPostCardProps) => {
  const createdData = formatDate(createdDate);

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
          icon={avatar 
            ? avatar 
            : <UserOutlined/>
          } 
        />
        <div>
          <div className={styles.info__login}>{login}</div>
          <div className={styles.info__date}>{createdData}</div>
        </div>
      </Flex>
      <Flex className={styles.card__tags} wrap gap={'small'}>
        {tags.map(tag => 
          <Tag key={tag.id}>{tag.name}</Tag>
        )}
      </Flex>
      <div className={styles.image__container}>
        <Image
          className={styles.card__image}
          src={image ? `${import.meta.env.VITE_APP_SERVER_URL}${image}` : defaultImage}
        />
      </div>
      <div className={styles.card__text}>
        <h2>{header}</h2>
        <span>{description}</span>
      </div>
    </Modal>
  );
};

export default PostCardModal;
