import axios from "axios";
import { BASE_URL } from "../utilities/constant";



const api = axios.create({
    baseURL:BASE_URL,
})

api.interceptors.request.use((config)=>{
    // const token = localStorage.getItem('token')
    // if(token){
    //     config['headers']['Authorization'] = `Bearer ${token}`
    // }
    return config

},(err)=>Promise.reject(err))

api.interceptors.response.use((response)=>response,async (error)=>{
 // if refresh token logic implemented
    // const originalRequeset = error.config
    // // If the token has expired, try refreshing the token

    // if(error.response && error.response.status===401 &&  !originalRequeset._retry){
    //     originalRequeset._retry = true;

    //     try{
    //         const refreshToken = localStorage.getItem("refreshToken")
    //         // const response = await axios.post("/refresh-token",{token:refreshToken})
    //         // const newToken = response.data.data;

    //         // originalRequeset.headers['Authorization'] = `Bearer ${newToken}`

    //       return  api(originalRequeset)

    //     }
    //     catch(refreshError){
    //         console.error('Refresh token failed',refreshError)

    //         localStorage.removeItem('token')
    //         localStorage.removeItem('refreshToken')
    //         window.location.href='/login'
    //     }
    // }
    return Promise.reject(error)
})
export {api}