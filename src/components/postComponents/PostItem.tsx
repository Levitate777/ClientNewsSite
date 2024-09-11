import { IPost } from "../../types/postTypes";

interface IPostItemProps {
  post: IPost
}

const PostItem = ({post}: IPostItemProps) => {
  return (
    <div>
      <div>{post.id}</div>
      <div>{post.user.login}</div>
      <div>{post.createdAt}</div>
      <div>{post.header}</div>
      <div>{post.description}</div>
      <div>{post.image}</div>
    </div>
  );
};

export default PostItem;
