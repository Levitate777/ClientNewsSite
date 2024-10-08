import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Layout, Pagination, PaginationProps } from 'antd';

import { useTypeSelector } from '../redux/hooks/useTypeSelector';
import { AppDispatch } from '../redux/store';
import { fetchPosts } from '../redux/actionCreators/post';
import { pageSizeOptions } from '../utils/pageSizeOptions';
import { IPost } from '../types/postTypes';
import useFilter from '../hooks/useFilter';
import usePagination from '../hooks/usePagination';
import NewsHeader from '../components/Header';
import PostList from '../components/postComponents/PostList';
import FilterInputs from '../components/FilterInputs';

const MainPage = () => {
  const [countPostsOnPage, setCountPostsOnPage] = useState<number>(import.meta.env.VITE_APP_COUNT_POSTS_ON_PAGE);

  const posts: IPost[] = useTypeSelector(state => state.post.posts);
  const isLoading: boolean = useTypeSelector(state => state.post.isLoading);
  const error: string | null = useTypeSelector(state => state.post.error);
  
  const dispatch: AppDispatch = useDispatch();

  const [filterPosts, filter, setFilter] = useFilter(posts);
  const [postsOnPage, setCurrentPage] = usePagination(filterPosts, countPostsOnPage);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
    setCountPostsOnPage(pageSize);
  };

  const handleCurrentPage: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  return (
    <Layout>
      <NewsHeader/>
      <FilterInputs
        filter={filter}
        setFilter={setFilter}
      />
      <PostList
        posts={postsOnPage}
        isLoading={isLoading}
        error={error}
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
    </Layout>
  );
};

export default MainPage;
