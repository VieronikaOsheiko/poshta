// src/infra/AxiosHttpClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export class AxiosHttpClient {
  private axiosInstance: AxiosInstance;

  constructor(configs?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:5000/api",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...configs?.headers,
      },
    });
    this.initInterceptors();
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "GET", url, ...config });
  }

  public async post<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "POST", url, data, ...config });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Request error", error.response?.data || error.message);
      }
      return Promise.reject(error);
    }
  }

  private initInterceptors() {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      console.error("Request failed to send", error);
      return Promise.reject(error);
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }
}
