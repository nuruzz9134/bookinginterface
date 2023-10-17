
const StoreToken = (value) =>{
    if (value) {
        console.log("Token Stored")
        const {access,refresh} = value
        localStorage.setItem('access_token',access)
        localStorage.setItem('refresh_token',refresh)
    }
}

const GetToken = ()=>{
    let access_token =  localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    return {access_token,refresh_token}
}

const RemoveToken = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export {StoreToken,GetToken,RemoveToken}