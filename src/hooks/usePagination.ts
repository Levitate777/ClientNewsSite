import { useState } from "react";

import { IPost } from "../types/postTypes";

const usePagination = (posts: IPost[], countPostsOnPage: number) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const postsOnPage: IPost[] = posts.slice(
		(currentPage - 1) * countPostsOnPage,
		currentPage * countPostsOnPage
	);

	return [postsOnPage, setCurrentPage] as const;
};

export default usePagination;
