import { getLatestMessages, personalMessage } from "@/services/messages"
import {  useQuery } from "@tanstack/react-query"

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

export const useGetPersonalChat = (user1: string, user2: string) => {
  return useQuery({
    queryKey: ['message', user1, user2], 
    queryFn: async () => {
      if (!user1 || !user2) throw new Error('Both user1 and user2 are required');
      return await personalMessage(user1, user2);
    },
    enabled: !!user1 && !!user2, 
  });
};
