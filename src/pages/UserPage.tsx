import { useState } from "react";

import { Layout, Pagination, PaginationProps } from "antd";

import { useTypeSelector } from "../redux/hooks/useTypeSelector";
import { IPost } from "../types/postTypes";
import { IUser } from "../types/userTypes";
import { pageSizeOptions } from "../utils/pageSizeOptions";
import useFilter from '../hooks/useFilter';
import usePagination from '../hooks/usePagination';
import NewsHeader from "../components/Header";
import UserInfo from "../components/UserInfo";
import ErrorModal from "../components/modals/ErrorModal";
import PostList from "../components/postComponents/PostList";
import FilterInputs from "../components/FilterInputs";

const UserPage = () => {
	const [countPostsOnPage, setCountPostsOnPage] = useState<number>(import.meta.env.VITE_APP_COUNT_POSTS_ON_PAGE);

	const currentUser: IUser | null = useTypeSelector((state) => state.auth.currentUser);
	const error: string | null = useTypeSelector(state => state.auth.error);
	const posts: IPost[] = useTypeSelector((state) => state.auth.posts);
	const isLoading: boolean = useTypeSelector((state) => state.auth.isLoading);

  const [filterPosts, filter, setFilter] = useFilter(posts);
  const [postsOnPage, setCurrentPage] = usePagination(filterPosts, countPostsOnPage);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
    setCountPostsOnPage(pageSize);
  };

  const handleCurrentPage: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

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
			<div>
				<FilterInputs
					filter={filter}
					setFilter={setFilter}
				/>
				<PostList
					posts={postsOnPage}
					isLoading={isLoading}
					error={error}
					user={currentUser}
      	/>
				<Pagination
					showSizeChanger
					onShowSizeChange={onShowSizeChange}
					onChange={handleCurrentPage}
					align='center'
					defaultPageSize={import.meta.env.VITE_APP_COUNT_POSTS_ON_PAGE}
					pageSizeOptions={pageSizeOptions()}
					defaultCurrent={1}
					total={posts.length}
      	/>
			</div>
    </Layout>
  );
};

export default UserPage;
