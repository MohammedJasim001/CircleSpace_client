export const getUserId = async () =>{
    try {
        const user =await JSON.parse(sessionStorage.getItem("user") as string);
      const userId = user?.id;
      return userId
    } catch (error) {
        console.log(error)
    }
}