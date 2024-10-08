import { Routes, Route } from 'react-router-dom';

import { useTypeSelector } from '../../redux/hooks/useTypeSelector';
import { IUser } from '../../types/userTypes';
import MainPage from '../../pages/MainPage';
import UserPage from '../../pages/UserPage';

const AppRouter = () => {
  const currentUser: IUser | null = useTypeSelector((state) => state.auth.currentUser);

  return (
    <Routes>
			{currentUser !== null &&
				<Route element={<UserPage/>} path={import.meta.env.VITE_APP_USERPAGE_ROUTE}/>
			}
			<Route element={<MainPage/>} path={import.meta.env.VITE_APP_MAINPAGE_ROUTE}/>
    </Routes>
  );
};

export default AppRouter;
