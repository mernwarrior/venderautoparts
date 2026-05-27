import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://eco-node-revm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance