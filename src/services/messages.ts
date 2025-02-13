import api from "./api"

export const getLatestMessages = async(userId:string) => {
    try {
        const res = await api.get(`/api/user/message/resentchats/${userId}`)
        console.log(res,'res');
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const sendMessage = async (data:{ sender: string; receiver: string; content: string }) => {
    try {
        const res = await api.post(`/api/user/message/send`,data)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const personalMessage = async (user1:string,user2:string) => {
    try {
        const res = await api.get(`/api/user/message/chats/${user1}/${user2}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}