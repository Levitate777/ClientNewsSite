import { FC } from "react";
import { useTypeSelector } from "../../store/hooks/useTypeSelector";

const PostList: FC = () => {
  const {posts, loading, error} = useTypeSelector(state => state.post)
  
  return (
    <div>
    
    </div>
  );
};

export default PostList;