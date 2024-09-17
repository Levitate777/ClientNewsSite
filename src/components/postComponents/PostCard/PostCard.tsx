import { 
  Flex, 
  Card, 
  Tag, 
  Image, 
} from 'antd';

import { formatDate } from '../../../utils/formatDate';
import { ITag } from '../../../types/tagTypes';
import CustomerAvatar from '../../Avatar/CustomerAvatar';

import defaulImage from '../../../images/Waaaaaaagh.webp';
import styles from './PostCard.module.css';


interface IPostCardProps {
  login: string, 
  avatar: string | null, 
  createdDate: string, 
  tags: ITag[], 
  image: string | null, 
  header: string, 
  description: string, 
  openModal: () => void,
}

const PostCard = ({
  login, 
  avatar, 
  createdDate, 
  tags, 
  image, 
  header, 
  description, 
  openModal,
}: IPostCardProps) => {
  const formatCreatedDate = formatDate(createdDate);

  return (
    <Card className={styles.card} hoverable={true}>
      <Flex className={styles.card__info} gap={'small'}>
        <CustomerAvatar 
          className={styles.info__avatar} 
          shape='square' 
          size='large' 
          url={avatar} 
        />
        <div>
          <div>{login}</div>
          <div>{formatCreatedDate}</div>
        </div>
      </Flex>
      <Flex className={styles.card__tags} wrap gap={'small'}>
        {tags.map(tag => 
          <Tag key={tag.id}>{tag.name}</Tag>
        )}
      </Flex>
      <Image
        className={styles.card__image}
        src={image ? image : defaulImage}
        preview={false}
      />
      <div className={styles.card__text}>
        <h2>{header}</h2>
        <span onClick={openModal}>{description}</span>
      </div>
    </Card>
  );
};

export default PostCard;
