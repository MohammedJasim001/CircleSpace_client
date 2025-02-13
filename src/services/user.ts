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

export const searchUserApi = async (query:string)=>{
    try {
        const res = await api.get(`/user/search?query=${query}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const editProfileApi = async (formData:FormData,userId:string) =>{
    try {
        const res = await api.put(`/user/editprofile/${userId}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
              }
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}