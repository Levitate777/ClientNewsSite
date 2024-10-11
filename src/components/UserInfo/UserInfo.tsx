import { useEffect, useRef, useState } from 'react';

import { Button, Descriptions, Flex } from 'antd';

import CustomerAvatar from '../CustomerAvatar';

import styles from './UserInfo.module.css'; 

interface IUserInfo {
	login: string,
	email: string,
	avatar: string | null,
	countPosts: number,
};

const UserInfo = ({
	login,
	email,
	avatar,
	countPosts,
}: IUserInfo) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(145);

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
				<Button type="primary" >Edit Profile</Button>
				<Button type="primary" >Add post</Button>
			</div>
    </Flex>
  );
};

export default UserInfo;
