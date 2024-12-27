// hooks/useProfileImageUpload.ts

import { profileImageApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useProfileImageUpload = () => {
  return useMutation({
    mutationFn: profileImageApi, // The function to call the API
    onSuccess: (data) => {
        toast.success(data.message)
      console.log("Image uploaded successfully", data);
    },
    onError: (error) => {
        toast.warn(error.message)
      console.error("Error uploading image:", error);
    },
  });

 
};
