import axios from "axios"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://your-backend.onrender.com/api/items"

})
export default api;