import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const api = axios.create({
    baseURL: API_BASE,
    timeout: 12000,
    headers: {
        "Content-Type": "application/json"
    },
})

// Add auth token automatically if it exists
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })


// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         // Example: handle 401 (token expired)
//         if (error.response?.status === 401) {
//             // Your refresh logic here
//             localStorage.removeItem('token')
//             // redirect to login or something
//         }
//         return Promise.reject(error)
//     }

// export const api = {
//     get: <T>(endpoint: string) => base.get<T>(endpoint).then((res) => res.data),
//     post: <T>(endpoint: string, body: any) => base.post<T>(endpoint, body).then((res) => res.data),
//     put: <T>(endpoint: string, body: any) => base.put<T>(endpoint, body).then((res) => res.data),
//     patch: <T>(endpoint: string, body: any) => base.patch<T>(endpoint, body).then((res) => res.data),
//     delete: <T>(endpoint: string) => base.delete<T>(endpoint).then((res) => res.data),
// }






