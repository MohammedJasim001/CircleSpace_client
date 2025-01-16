import { getLatestMessages, sendMessage } from "@/services/messages"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useLatestMessages = (userId:string) =>{
    return useQuery({
        queryKey:['message',userId],
        queryFn: async ()=>{
            if(!userId){
                throw new Error('userId is required')
            }
            return await getLatestMessages(userId)
        },
        enabled :!!userId
    })
}


export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (messageData: {
      sender: string;
      receiver: string;
      content: string;
    }) => {
      
      return await sendMessage(messageData) // Response from backend
    },
    onSuccess: (data) => {
      console.log('Message sent successfully:', data);
      // You can perform additional actions on success, such as logging or updating a cache
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      // Handle errors globally if required
    },
  });
};
