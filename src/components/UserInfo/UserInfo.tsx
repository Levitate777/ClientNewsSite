import { useEffect, useRef, useState } from 'react';

import { Button, Descriptions, Flex } from 'antd';

import CustomerAvatar from '../CustomerAvatar';
import UserPageModal from '../modals/UserPageModal';

import styles from './UserInfo.module.css'; 

interface IUserInfo {
	login: string,
	email: string,
	avatar: string | null,
	countPosts: number,
};

type typeModal = 'update' | 'add';

const UserInfo = ({
	login,
	email,
	avatar,
	countPosts,
}: IUserInfo) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(145);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<typeModal>('update');

	const handleToggleModal = (type: typeModal) => {
    setTypeModal(type);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (container.current) {
      setContainerHeight(container.current.offsetHeight);
    }
  }, []);

  return (
    <Flex 
			ref={container} 
			className={styles.info__container} 
			gap={'middle'}
		>
			<div>
				<CustomerAvatar  
					shape='square' 
					size={containerHeight} 
					url={avatar} 
				/>
			</div>
			<Descriptions className={styles.info__description} column={1} title="User Info">
				<Descriptions.Item label="Login">{login}</Descriptions.Item>
				<Descriptions.Item label="Email">{email}</Descriptions.Item>
				<Descriptions.Item label="Number of posts">{countPosts}</Descriptions.Item>
			</Descriptions>
			<div className={styles.info__button}>
				<Button type="primary" onClick={() => handleToggleModal('update')}>Edit Profile</Button>
				<Button type="primary" onClick={() => handleToggleModal('add')}>Add post</Button>
			</div>
			<UserPageModal
				typeModal={typeModal}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        confirmLoading={confirmLoading}
        changeConfirmLoading={setConfirmLoading}
			/>
    </Flex>
  );
};

export default UserInfo;
