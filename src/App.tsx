import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { fetchWhoIsThis } from './redux/actionCreators/user';
import { AppDispatch } from './redux/store';
import AppRouter from './components/AppRouter';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(localStorage.length) {
      dispatch(fetchWhoIsThis());
    }
  }, [])

  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;
