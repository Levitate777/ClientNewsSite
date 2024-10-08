import { Layout } from "antd";

import { useTypeSelector } from "../redux/hooks/useTypeSelector";
import { IUser } from "../types/userTypes";
import NewsHeader from "../components/Header";
import UserInfo from "../components/UserInfo";
import ErrorModal from "../components/modals/ErrorModal";

const UserPage = () => {

	const currentUser: IUser | null = useTypeSelector((state) => state.auth.currentUser);

  return (
    <Layout>
      <NewsHeader/>
			{currentUser !== null ? (
				<UserInfo
					id={currentUser?.id}
					login={currentUser?.login}
					email={currentUser?.email}
					avatar={currentUser?.avatar}
				/>
			) : (
				<ErrorModal error={'Что-то пошло не так'}/>
			)}
    </Layout>
  );
};

export default UserPage;
