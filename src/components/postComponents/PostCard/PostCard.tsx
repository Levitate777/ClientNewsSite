import { UserOutlined } from '@ant-design/icons';
import { 
  Flex, 
  Avatar, 
  Card, 
  Tag, 
  Image, 
} from 'antd';

import { formatDate } from '../../../utils/formatDate';
import { ITag } from '../../../types/tagTypes';
import defaulImage from '../../../images/Waaaaaaagh.webp';
import styles from './PostCard.module.css' 

interface IPostItemProps {
  postUserLogin: string, 
  postUserAvatar: string | null, 
  postDate: string, 
  postTags: ITag[], 
  postImage: string | null, 
  postHeader: string, 
  postDescription: string, 
  openModal: () => void,
}

const PostCard = ({
  postUserLogin, 
  postUserAvatar, 
  postDate, 
  postTags, 
  postImage, 
  postHeader, 
  postDescription, 
  openModal}: IPostItemProps) => {

  const createdData = formatDate(postDate);

  return (
    <Card className={styles.card} hoverable={true}>
      <Flex className={styles.card__info} gap={'small'}>
        <Avatar 
          className={styles.info__avatar} 
          shape='square' 
          size='large' 
          icon={postUserAvatar 
            ? postUserAvatar 
            : <UserOutlined />
          } 
        />
        <div>
          <div>{postUserLogin}</div>
          <div>{createdData}</div>
        </div>
      </Flex>
      <Flex className={styles.card__tags} wrap gap={'small'}>
        {postTags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
      </Flex>
      <Image
        className={styles.card__image}
        src={postImage ? postImage : defaulImage}
        preview={false}
      />
      <div className={styles.card__text}>
        <h2>{postHeader}</h2>
        <span onClick={openModal}>{postDescription}</span>
      </div>
    </Card>
  );
};

export default PostCard;
