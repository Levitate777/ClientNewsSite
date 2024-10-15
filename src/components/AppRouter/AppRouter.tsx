import { Routes, Route, Navigate } from 'react-router-dom';

import { useTypeSelector } from '../../redux/hooks/useTypeSelector';
import { IUser } from '../../types/userTypes';
import MainPage from '../../pages/MainPage';
import UserPage from '../../pages/UserPage';

const AppRouter = () => {
  const currentUser: IUser | null = useTypeSelector((state) => state.user.currentUser);

  return (
    <Routes>
      {currentUser ? (
        <Route element={<UserPage />} path={`${import.meta.env.VITE_APP_USERPAGE_ROUTE}/:id`} />
      ) : (
        <Route path="*" element={<Navigate to={import.meta.env.VITE_APP_MAINPAGE_ROUTE} />} />
      )}
			<Route element={<MainPage/>} path={import.meta.env.VITE_APP_MAINPAGE_ROUTE}/>
    </Routes>
  );
};

export default AppRouter;
