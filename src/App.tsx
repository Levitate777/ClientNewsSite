import { Layout } from 'antd';

import MainPage from './pages/MainPage';
import NewsHeader from './components/Header';

const App = () => {

  return (
    <Layout>
      <NewsHeader/>
      <MainPage/>
    </Layout>
  );
};

export default App;
