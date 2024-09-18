import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';

import styles from './NewsHeader.module.css' ;

const NewsHeader = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.logo}>NewsSite</div>
      <Button ghost>Login</Button>
    </Header>
  );
};

export default NewsHeader;
