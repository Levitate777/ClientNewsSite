import { UserOutlined } from '@ant-design/icons';
import { 
  Flex, 
  Avatar, 
  Card, 
  Tag, 
  Image, 
} from 'antd';

import { IPost } from '../../../types/postTypes';
import { formatDate } from '../../../utils/formatDate';
import defaulImage from '../../../images/Waaaaaaagh.webp';
import styles from './PostCard.module.css' 

interface IPostItemProps {
  post: IPost,
  openModal: () => void,
}

const PostCard = ({post, openModal}: IPostItemProps) => {

  const createdData = formatDate(post.createdAt);

  return (
    <Card className={styles.card} hoverable={true}>
      <Flex className={styles.card__info} gap={'small'}>
        <Avatar 
          className={styles.info__avatar} 
          shape='square' 
          size='large' 
          icon={post.user.avatar 
            ? post.user.avatar 
            : <UserOutlined />
          } 
        />
        <div>
          <div>{post.user.login}</div>
          <div>{createdData}</div>
        </div>
      </Flex>
      <Flex className={styles.card__tags} wrap gap={'small'}>
        {post.tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
      </Flex>
      <Image
        className={styles.card__image}
        src={defaulImage}
        preview={false}
      />
      <div className={styles.card__text}>
        <h2>{post.header}</h2>
        <span onClick={openModal}>{post.description}</span>
      </div>
    </Card>
  );
};

export default PostCard;
