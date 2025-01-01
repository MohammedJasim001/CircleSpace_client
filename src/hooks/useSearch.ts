import { searchUserApi } from "@/services/user";
import { useQuery } from "@tanstack/react-query"

const useSearch = (query:string) =>{
    return useQuery({
        queryKey: ["search",query], 
            queryFn: async () => {
              if (!query) {
                throw new Error("userId is required");
              }
              return await searchUserApi(query); 
            },
            enabled: !!query, 
    })
}

export default useSearch