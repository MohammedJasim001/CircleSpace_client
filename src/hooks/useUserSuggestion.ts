import { userSeggetionApi } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useUserSuggestion = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId], 
    queryFn: async () => {
      if (!userId) {
        throw new Error("userId is required");
      }
      return await userSeggetionApi(userId); 
    },
    enabled: !!userId, 
  });
};

export default useUserSuggestion;
