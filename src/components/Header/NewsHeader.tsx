import { Button } from "antd";
import { Header } from "antd/es/layout/layout";

import './style.css'

const NewsHeader = () => {
  return (
    <Header className='header'>
      <div className='logo'>NewsSite</div>
      <Button ghost>Login</Button>
    </Header>
  );
};

export default NewsHeader;
