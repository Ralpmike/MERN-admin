import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export class TokenService {
  private static readonly KEY = "token";

  static getToken(): string | null {
    try {
      return localStorage.getItem(this.KEY)
    } catch {
      return null;
    }
  }

  static setToken(token: string): void {
    localStorage.setItem(this.KEY, token)
  }

  static removeToken(): void {
    localStorage.removeItem(this.KEY)
  }

};


const axiosApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})



axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenService.getToken()
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}, (error: AxiosError) => {
  console.error("Request Interceptor Error:", error);
  return Promise.reject(error);
});

axiosApi.interceptors.response.use((response: AxiosResponse) => response, async (error: AxiosError) => {
  if (error.response?.status === 401) {
    TokenService.removeToken()

  }
  return Promise.reject(error)
})

export default axiosApi;