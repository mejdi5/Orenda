import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://orenda.adaptable.app"

export const axiosInstance = axios.create({
    baseURL: baseUrl
})