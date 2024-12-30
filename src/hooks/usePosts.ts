import { createPostApi, getPostsApi } from "@/services/post";
import { ErrorResponse } from "@/types/comment";
import { CreatePostResponse, GetPostResponse } from "@/types/posts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const usePosts = () => {
  return useQuery<GetPostResponse[]>({
    queryKey: ["posts"],
    queryFn: () => getPostsApi(),
  });
};


export const useCreatePost = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    CreatePostResponse,
    AxiosError<ErrorResponse>,
    { userId: string; formData: FormData }
  >({
    mutationFn: async ({ userId, formData }) => {
      const response = await createPostApi(formData, userId);

      return response;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Post created successfully!");
      router.push("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to create post!";
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};


