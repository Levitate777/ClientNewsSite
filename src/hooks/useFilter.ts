import { useMemo, useState } from "react";

import { IPost } from "../types/postTypes";

export type SortState = 'all' | 'text' | 'title' | 'tag' | 'author'

export interface IFilterState {
  query: string;
  sort: SortState; 
}

const FindOnPost = (field: string, text: string) => {
  console.log(field, text);
  if (field === undefined) return false;
  return field.toLowerCase().includes(text.toLowerCase());
}

const useFilter = (posts: IPost[]) => {
  const [filter, setFilter] = useState<IFilterState>({query: '', sort: 'all'});
  
  const filteredPosts = useMemo(() => {
    const resultFiltered = posts.filter((post) => {
      if(FindOnPost(post.header, filter.query)) return true;
      if(FindOnPost(post.description, filter.query)) return true;
      if(post.tags.some(tag => FindOnPost(tag.name, filter.query))) return true;
      if(FindOnPost(post.user.login, filter.query)) return true;
      return false;
    });
    return resultFiltered;
  }
  , [filter, posts]);

  return [filteredPosts, filter, setFilter] as const;
};

export default useFilter;
