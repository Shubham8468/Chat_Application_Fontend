import axios from 'axios'
// this are use for the call backend .Only need to "axiosInstance "
export const axiosInstance =axios.create({
    baseURL:"http://localhost:4800/api/v1",
    withCredentials:true,
})