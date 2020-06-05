import axios from 'axios'


const api = axios.create({
    baseURL:'http://localhost:5000/api',
    withCredentials:true,
    headers:{
        'ACCESS-CONTROL-ALLOW-ORIGIN':'*'
    }
})

export default api