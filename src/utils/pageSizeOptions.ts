export const pageSizeOptions = () => {
	const array: number[] = new Array(5).fill(0).map((_, index) => {
			return ++index * import.meta.env.VITE_APP_COUNT_POSTS_ON_PAGE;
	});
	
	return array;
};
