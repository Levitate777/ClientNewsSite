import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Modal, Tag, Image } from "antd";

import { IPost } from "../../../types/postTypes";
import { formatDate } from "../../../utils/formatDate";
import waaaaghImage from '../../../images/Waaaaaaagh.webp';
import './style.css'

interface IPostItemProps {
  post: IPost | null,
  modalOpen: boolean,
  closeModal: () => void,
}

const PostItemModal = ({post, modalOpen, closeModal}: IPostItemProps) => {
  const createdData = post ? formatDate(post.createdAt) : 'February 3, 2011 at 12:12 PM';

  return (
    <>
      {
        post ? (
          <Modal 
            className='post-modal'
            centered
            open={modalOpen}
            onCancel={closeModal}
            footer={<></>}
          >
          <Flex className='post-modal__info' gap={'small'}>
            <Avatar className='post-modal__avatar' shape="square" size='large' icon={post.user.avatar ? post.user.avatar : <UserOutlined/>} />
            <div>
              <div className='post-modal__user-login'>{post.user.login}</div>
              <div className='post-modal__post-date'>{createdData}</div>
            </div>
          </Flex>
          <Flex className='post-modal__tags' wrap gap={'small'}>
            {post.tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
          </Flex>
          <div className='post-modal__image'>
            <Image
              className='post-modal__image-item'
              src={waaaaghImage}
            />
          </div>

          <div className='post-modal__text'>
            <h2>{post.header}</h2>
            <span>{post.description}</span>
          </div>
        </Modal>
        ) : (
          <Modal></Modal>
        )
      }
    </>
  );
};

export default PostItemModal;
