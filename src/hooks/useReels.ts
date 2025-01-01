import { getVideoApi } from "@/services/post";
import { useQuery } from "@tanstack/react-query";

const useReels = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      return await getVideoApi();
    }
  });
};

export default useReels;
