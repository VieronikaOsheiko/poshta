import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export class AxiosHttpClient {
    private axiosInstance: AxiosInstance;

    constructor(configs?: AxiosRequestConfig) {
        this.axiosInstance = axios.create({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...configs?.headers,
            },
            ...configs,
        });
        this.initInterceptors();
    }



    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "GET", url, ...config });
    }

    public async post<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ method: "POST", url, data, ...config });
    }

    public async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ method: "PUT", url, data, ...config });
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ method: "DELETE", url, ...config });
    }


   private async request<T>(config: AxiosRequestConfig): Promise<T> {
       const abortController = new AbortController();
       const signal = abortController.signal;

       try {

           const response = await this.axiosInstance.request<T>({
               ...config,
               signal,
           });

        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.info("Request canceled");
        } else if (error instanceof AxiosError) {
            console.error("Request error", error.response?.data.message || error.message || "Something went wrong");
        }else {
            console.error("Unexpected error",(error as Error).message);
           }
           return Promise.reject(error);
       } finally {
           abortController.abort("Reques was cancellad");
    }
    }
    

    private initInterceptors() {
  this.axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request failed to send", error);
      return Promise.reject(error);
    }
  );

  this.axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.error("Unauthorized request", error.response.data.message);
        // 1. Redirect to login page
        window.location.href = "/login?returnUrl=" + encodeURIComponent(window.location.pathname);
        // 2. Refresh token logic (uncomment if implemented)
        // const token = await refreshToken();
      }
      return Promise.reject(error);
    }
  );
}

}