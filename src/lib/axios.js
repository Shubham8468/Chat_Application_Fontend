import axios from 'axios'
// this are use for the call backend .Only need to "axiosInstance "
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://chat-application-backend-rust.vercel.app/api/v1" : "http://localhost:4800/api/v1");

export const axiosInstance =axios.create({
    baseURL: API_BASE_URL,
    withCredentials:true,
})