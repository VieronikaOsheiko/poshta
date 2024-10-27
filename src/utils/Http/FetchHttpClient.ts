export class FetchHttpClient {
  private baseUrl: string;
    private headers: HeadersInit;
    private signal: AbortSignal;

  constructor(configs: { baseUrl: string; headers?: HeadersInit, signal: AbortSignal }) {
    this.baseUrl = configs.baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...configs.headers,
      };
      this.signal = configs.signal;
  }

    public async get<T>(url: string, config: RequestInit): Promise<T> {
        const configs = config ?? {};
    return this.request<T>(url,{ method: "GET", ...config });
  }

  public async post<T, D = unknown>(
    url: string,
    data: D,
    config?: RequestInit
  ): Promise<T> {
      const configs = config ?? {};

      return this.request<T>(url, {
          method: "POST",
          body: JSON.stringify(data),
          ...config,
      });
  }


  public async put<T, D = unknown>(
    url: string,
    data: D,
    config?: RequestInit
  ): Promise<T> {
      const configs = config ?? {};

    return this.request<T>(url, {
          method: "PUT",
          body: JSON.stringify(data),
          ...config,
      });
  }

    public async delete<T>(url: string, config?: RequestInit): Promise<T> {
        const configs = config ?? {};

    return this.request<T>(url, { method: "DELETE", ...config });
  }

  private async request<T>(url: string, config: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...config,
        headers: {
          ...this.headers,
          ...config.headers,
        },
        signal: this.signal,
      });

      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
      } catch (error) {
    if ((error as Error).name === "AbortError") {
        console.info("Request was cancelled");
    } else {
        console.error(error);
        throw error;
        }
        return Promise.reject(error);
    } 
  }
}
