import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { createPostApi } from "@/services/post";
import { CreatePostResponse } from "@/types/posts";
import { ErrorResponse } from "@/types/comment";
import { useRouter } from "next/navigation";

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
      router.push('/')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || "Failed to create post!";
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};
