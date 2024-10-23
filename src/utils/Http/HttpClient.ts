import axios, { AxiosInstance, CancelTokenSource, AxiosRequestConfig, AxiosError } from "axios";

export class HttpClient {
    private axiosInstance: AxiosInstance;
    private cancelTokenSource: CancelTokenSource | null = null;

    constructor(configs?: AxiosRequestConfig) {
        this.axiosInstance = axios.create({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...configs?.headers,
            },
            ...configs,
        });
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
       try {
           this.cancelTokenSource = axios.CancelToken.source();

           const response = await this.axiosInstance.request<T>({
               ...config,
               cancelToken: this.cancelTokenSource.token,
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
           this.cancelRequest();
    }
}


    private cancelRequest() {
        if (this.cancelTokenSource) {
            this.cancelTokenSource.cancel("Request cancel by user");
            this.cancelTokenSource = null;
        }
    }
}