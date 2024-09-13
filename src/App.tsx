import { Layout } from 'antd'

import PostList from './components/postComponents/PostList'
import NewsHeader from './components/Header';

function App() {

  return (
    <Layout>
      <NewsHeader/>
      <PostList/>
    </Layout>
  )
}

export default App
