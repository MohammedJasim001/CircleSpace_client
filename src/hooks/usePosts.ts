
import { createPostApi, getPostsApi } from "@/services/post";
import { ErrorResponse } from "@/types/common";
import { CreatePostResponse, GetPostResponse } from "@/types/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const usePosts = () => {
  return useQuery<GetPostResponse[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsApi(),
    staleTime: 5000,
  });
};


export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation<
    CreatePostResponse,
    AxiosError<ErrorResponse>,
    { userId: string; formData: FormData }
  >({
    mutationFn: async ({ userId, formData }) => {
      const response = await createPostApi(formData, userId);

      return response;
    },
    onSuccess: (response ) => {
      // toast.success(response?.message || "Post created successfully!");
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["posts"]});
      router?.push("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to create post!";
      toast.error(errorMessage);
    },
  });

};


