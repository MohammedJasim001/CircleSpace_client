import { profileApi } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId], 
    queryFn: async () => {
      if (!userId) {
        throw new Error("userId is required");
      }
      return await profileApi(userId); 
    },
    enabled: !!userId, 
  });
};

export default useProfile;
