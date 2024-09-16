import { Layout } from 'antd';

import NewsHeader from '../components/Header';
import PostList from '../components/postComponents/PostList';

function MainPage() {

  return (
    <Layout>
      <NewsHeader/>
      <PostList/>
    </Layout>
  );
};

export default MainPage;