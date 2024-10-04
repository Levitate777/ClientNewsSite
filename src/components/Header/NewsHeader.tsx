import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { useTypeSelector } from '../../redux/hooks/useTypeSelector';
import { AppDispatch } from '../../redux/store';
import AuthModal from '../modals/AuthModal';

import styles from './NewsHeader.module.css' ;


const NewsHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [type, setType] = useState('LOG');

  const dispatch: AppDispatch = useDispatch();

  const handleToggleModal = (type: string) => {
    setType(type);
    setModalOpen(!modalOpen);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>NewsSite</div>
      <Button ghost onClick={() => handleToggleModal('LOG')}>Login</Button>
      <Button ghost onClick={() => handleToggleModal('REG')}>Register</Button>
      <AuthModal 
        type={type}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        confirmLoading={confirmLoading}
        changeConfirmLoading={setConfirmLoading}
      />
    </Header>
  );
};

export default NewsHeader;
