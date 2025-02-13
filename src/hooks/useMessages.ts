import { getLatestMessages, personalMessage, sendMessage } from "@/services/messages"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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
  const queryClient = useQueryClient(); // Access the query client

  return useMutation({
    mutationFn: async (messageData: {
      sender: string;
      receiver: string;
      content: string;
    }) => {
      return await sendMessage(messageData); // Send the message to the backend
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["message", variables.sender] });
      queryClient.invalidateQueries({ queryKey: ["message", variables.receiver] });
      queryClient.invalidateQueries({ queryKey: ["personalChat", variables.sender, variables.receiver] });
      queryClient.invalidateQueries({ queryKey: ["personalChat", variables.receiver, variables.sender] });

      console.log("Message sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
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
