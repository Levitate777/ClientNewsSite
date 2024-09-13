import { Layout } from "antd"

import PostList from "./components/postComponents/PostList"
import NewsHeader from "./components/Header/NewsHeader";

function App() {

  return (
    <Layout>
      <NewsHeader></NewsHeader>
      <PostList/>
    </Layout>
  )
}

export default App
