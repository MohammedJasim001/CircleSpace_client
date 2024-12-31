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
        return res.data
    }
    catch (error){
        console.error(error)
    }
}

export const followApi = async (userId:string,targetId:string) =>{
    try {
        const res = await api.post(`/user/follow`,{userId,targetId})
        return res.data
    } catch (error) {
        console.error(error)
    }
}