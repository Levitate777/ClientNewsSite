import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { AppDispatch } from '../../redux/store';
import { useTypeSelector } from '../../redux/hooks/useTypeSelector';
import { logoutUser } from '../../redux/actionCreators/user';
import { IUser } from '../../types/userTypes';
import AuthModal from '../modals/AuthModal';
import CustomerAvatar from '../CustomerAvatar';

import styles from './NewsHeader.module.css';

type typeModal = 'login' | 'registration';

const NewsHeader = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<typeModal>('login');
  const navigate = useNavigate();
  
  const dispatch: AppDispatch = useDispatch();
  const currentUser: IUser | null = useTypeSelector((state) => state.user.currentUser);

  const handleToggleModal = (type: typeModal) => {
    setTypeModal(type);
    setModalOpen(!modalOpen);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate(import.meta.env.VITE_APP_MAINPAGE_ROUTE);
  };

  return (
    <Header className={styles.header}>
      <Link to={`${import.meta.env.VITE_APP_MAINPAGE_ROUTE}`}>
        <div className={styles.logo}>NewsSite</div>
      </Link>
      {currentUser === null ? (
        <div className={styles.auth}>
          <Button ghost onClick={() => handleToggleModal('login')}>Login</Button>
          <Button ghost onClick={() => handleToggleModal('registration')}>Register</Button>
        </div>
        ) : (
          <Link 
            to={`${import.meta.env.VITE_APP_USERPAGE_ROUTE}/${currentUser.id}`} 
            className={styles.user}
          >
            <span className={styles.user__login}>{currentUser.login}</span>
            <CustomerAvatar 
              className={styles.info__avatar} 
              shape='square' 
              size='large' 
              url={currentUser.avatar} 
            />
            <Button ghost onClick={removeToken}>LogOut</Button>
          </Link>
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
