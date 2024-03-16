import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(res => res, (error) => {
  const response = error.response
  toast.error(response.data.message)
}) 