import api from "./api"

export const userSeggetionApi = async (userId:string) =>{
    try {
        const res = await api.get(`/user/suggestions/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const profileApi = async (userId:string) =>{
    try{
        const res = await api.get(`/user/profile/${userId}`)
        console.log(res.data,'res.dta');
        return res.data
    }
    catch (error){
        console.error(error)
    }
}