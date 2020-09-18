import axios from 'axios'
import {config} from 'dotenv'
import path from 'path'

require('dotenv').config({ path: path.join(__dirname, '.env') })

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials:true,
})

export const apiUrl = process.env.REACT_APP_API_URL
export default api