import { getLatestMessages, personalMessage, sendMessage } from "@/services/messages"
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
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });
};

export const useGetPersonalChat = (user1: string, user2: string) => {
  return useQuery({
    queryKey: ['personalChat', user1, user2], 
    queryFn: async () => {
      if (!user1 || !user2) throw new Error('Both user1 and user2 are required');
      return await personalMessage(user1, user2);
    },
    enabled: !!user1 && !!user2, 
  });
};
