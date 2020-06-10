import axios from 'axios'


const api = axios.create({
    baseURL:process.env.API_URL,
    withCredentials:true,
})

export const apiUrl = process.env.API_URL
export default api