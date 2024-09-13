import { UserOutlined } from '@ant-design/icons';
import { Flex, Avatar, Card, Tag, Image } from 'antd';

import { IPost } from "../../types/postTypes";
import { formatDate } from "../../utils/formatDate";
import waaaaghImage from '../../images/Waaaaaaagh.webp';
import './style.css'


interface IPostItemProps {
  post: IPost,
  openModal: () => void,
}

const PostItem = ({post, openModal}: IPostItemProps) => {

  const createdData = formatDate(post.createdAt);

  return (
    <Card className='post-item-card' hoverable={true}>
      <Flex className='post-item-info' gap={'small'}>
        <Avatar className='post-item-avatar' shape="square" size='large' icon={post.user.avatar ? post.user.avatar : <UserOutlined />} />
        <div>
          <div>{post.user.login}</div>
          <div>{createdData}</div>
        </div>
      </Flex>
      <Flex className='post-item-tags' wrap gap={'small'}>
        {post.tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
      </Flex>
      <Image
        className='post-item-image'
        src={waaaaghImage}
        preview={false}
      />
      <div className='post-item-text'>
        <h2>{post.header}</h2>
        <span onClick={openModal}>{post.description}</span>
      </div>
    </Card>
  );
};

export default PostItem;
