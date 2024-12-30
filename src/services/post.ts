import { GetPostResponse } from "@/types/posts";
import api from "./api";
import { AxiosError } from "axios";

export const getPostsApi = async (): Promise<GetPostResponse[]> => {
  try {
    const res = await api.get(`/user/post`);
    return res.data.data 
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw Error("Failed to fetch posts"); // Propagate the error for proper handling in the calling code
  }
};

export const createPostApi = async (formData: FormData ,id:string)=>{

  try {
      const res = await api.post (`/user/post/${id}`, formData,{
          headers:{
              "Content-Type":"multipart/form-data"
            }
      })
      return res.data
  } catch (err) {
      if (err instanceof AxiosError) {
        // Return the error message or any other relevant error information
        return {
          message: err.response?.data?.message || 'Something went wrong during registration',
        };
      } else {
        // Handle non-Axios errors
        return {
          success: false,
          message: 'An unknown error occurred',
        };
      }
    }
}


export const likeToggleApi = async (userId:string,postId:string)=>{
  try {
    const res = await api.post('/user/posts/like',{userId,postId})
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const addCommentApi = async ( authorId: string,postId: string, content: string)=>{
  try {
    const res =await api.post('/user/comment',{authorId,postId,content})
    console.log(res);
    return res.data
  } catch (err) {
    if (err instanceof AxiosError) {
      // Return the error message or any other relevant error information
      return {
        message: err.response?.data?.message || 'Something went wrong during registration',
      };
    } else {
      // Handle non-Axios errors
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  }
}
