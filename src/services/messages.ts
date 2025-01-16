import api from "./api"

export const getLatestMessages = async(userId:string) => {
    try {
        const res = await api.get(`user/message/resentchats/${userId}`)
        console.log(res,'res');
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const sendMessage = async (data:{ sender: string; receiver: string; content: string }) => {
    try {
        const res = await api.post(`user/message/send`,data)
        return res.data
    } catch (error) {
        console.error(error)
    }
}