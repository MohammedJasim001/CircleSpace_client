import { useState } from "react";
import { addCommentApi } from "@/services/post";
import { CreateCommentResponse } from "@/types/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useComment = (postId:string) => {
  const [newComment, setNewComment] = useState<string>(""); // State for managing the comment content
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation<CreateCommentResponse, AxiosError, { postId: string; authorId: string; content: string }>({
    mutationFn: async ({ postId, authorId, content }) => {
      const response = await addCommentApi(authorId, postId, content);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Comment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["post",postId ] });  // Invalidate post queries to fetch updated data
      setNewComment(""); // Clear the comment input after successful submission
    },
    onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as { message: string })?.message || "Failed to create comment!";
        toast.error(errorMessage);
      },
  });

  return {
    mutate: addCommentMutation.mutate, // Provide direct access to `mutate`
    newComment,
    setNewComment,
  };
};

export default useComment;
