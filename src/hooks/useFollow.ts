import { followApi } from "@/services/user";
import { FollowResponse } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify";

interface FollowParams {
    userId: string;   // Current user's ID
    targetId: string; // Target user's ID to follow/unfollow
  }

const useFollow = () =>{
    const queryClient = useQueryClient()
    return useMutation<FollowResponse,AxiosError<{message:string}>,FollowParams>({
        mutationFn:async ({userId,targetId}:FollowParams):Promise<FollowResponse> =>{
            return await followApi(userId,targetId)
        },
        onSuccess:(response,{userId}) =>{
             toast.success(response.message || "follow status updated successfully!");
             queryClient.invalidateQueries({ queryKey: ["profile",userId] });
             queryClient.invalidateQueries({ queryKey: ["suggestion",userId] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage =
              error?.response?.data?.message || "Failed to update follow status!";
            toast.error(errorMessage);
          },
    })
}
export default useFollow