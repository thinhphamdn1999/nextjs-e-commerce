import CustomError from "@/types/custom-error";
import { urlBuilder } from "@/utils/url-builder";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
  body?: any;
  [key: string]: any;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(method: string, endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { headers = {}, queryParams, body, ...otherOptions } = options;
    
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...otherOptions
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const url = urlBuilder(`${this.baseUrl}/${endpoint}`, queryParams);
      const response = await fetch(url, config);

      const data: T = response.status !== 204 ? await response.json() : null;

      if (!response.ok) {
        const errorMessage = data && typeof data === 'object' && 'error' in data ? (data as any).error : response.statusText;
        throw new CustomError(errorMessage, response.status);
      }

      return {
        data,
        error: null,
        status: response.status,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof CustomError ? error.message : 'An unknown error occurred',
        status: error instanceof CustomError ? error.status : 500
      };
    }
  }

  public async get<T>(endpoint: string, options: Omit<RequestOptions, 'body'> = {}): Promise<ApiResponse<T>> {    
    return this.request<T>('GET', endpoint, options);
  }

  public async post<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, options);
  }

  public async put<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, options);
  }

  public async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, options);
  }
}

const apiService = new ApiService();

export default apiService;
