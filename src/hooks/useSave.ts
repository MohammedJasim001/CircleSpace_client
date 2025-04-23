import { savePostApi } from "@/services/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


interface SaveParams {
  userId: string;   
  postId: string;
}

interface SaveResponse{
    message:string
}

const useSave = () => {
  const queryClient = useQueryClient();

  return useMutation<SaveResponse, AxiosError<{ message: string }>, SaveParams>({
    mutationFn: async ({ userId, postId }: SaveParams): Promise<SaveResponse> => {
      return await savePostApi(userId, postId);
    },
    onSuccess: () => {
      // toast.success(response.message || "save status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update save status!";
      toast.error(errorMessage);
    },
  });

};

export default useSave;