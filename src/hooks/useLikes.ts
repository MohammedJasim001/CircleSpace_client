import { likeToggleApi } from "@/services/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


interface LikeParams {
  userId: string;   
  postId: string;
}

interface LikeResponse{
    message:string
}

const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeResponse, AxiosError<{ message: string }>, LikeParams>({
    mutationFn: async ({ userId, postId }: LikeParams): Promise<LikeResponse> => {
      return await likeToggleApi(userId, postId);
    },
    onSuccess: (response, { userId }) => {
      console.log(response,'response');
      toast.success(response.message || "Like status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["post",userId] });
    //   queryClient.invalidateQueries({ queryKey: ["suggestionsProfiles", userId] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update Like status!";
      toast.error(errorMessage);
    },
  });

};

export default useLike;