import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { AppDispatch } from '../../redux/store';
import { useTypeSelector } from '../../redux/hooks/useTypeSelector';
import { logoutUser } from '../../redux/actionCreators/auth';
import { IUser } from '../../types/userTypes';
import AuthModal from '../modals/AuthModal';
import CustomerAvatar from '../CustomerAvatar';

import styles from './NewsHeader.module.css';

const NewsHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [typeModal, setTypeModal] = useState('login');
  
  const dispatch: AppDispatch = useDispatch();
  const currentUser: IUser | null = useTypeSelector((state) => state.auth.currentUser);

  const handleToggleModal = (type: string) => {
    setTypeModal(type);
    setModalOpen(!modalOpen);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
  };

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>NewsSite</div>
      {currentUser === null ? (
        <div className={styles.auth}>
          <Button ghost onClick={() => handleToggleModal('login')}>Login</Button>
          <Button ghost onClick={() => handleToggleModal('registration')}>Register</Button>
        </div>
        ) : (
          <div className={styles.user}>
            <span className={styles.user__login}>{currentUser.login}</span>
            <CustomerAvatar 
              className={styles.info__avatar} 
              shape='square' 
              size='large' 
              url={null} 
            />
            <Button ghost onClick={removeToken}>LogOut</Button>
          </div>
        )
      }
      <AuthModal 
        typeModal={typeModal}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        confirmLoading={confirmLoading}
        changeConfirmLoading={setConfirmLoading}
      />
    </Header>
  );
};

export default NewsHeader;
