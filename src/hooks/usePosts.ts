import { getPostsApi } from "@/services/post";
import { GetPostResponse } from "@/types/posts";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
  return useQuery<GetPostResponse[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsApi(),
 
  });
};

export default usePosts;
