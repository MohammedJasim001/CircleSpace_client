import { editProfileApi, profileApi } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useProfile = (userId: string | null) => {
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

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, currentUserId }: { formData: FormData; currentUserId: string  }) =>
      editProfileApi(formData, currentUserId),
    onSuccess: (data) => {
      // ✅ Invalidate user query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast.success(data?.message);
      console.log(data);
    },
    onError: (error: AxiosError<{message:string}>) => {
      console.log(error, "error message");

      const errorMessage =
        error?.response?.data?.message|| "Failed to update profile";

      toast.error(errorMessage);
    },
  });
};

