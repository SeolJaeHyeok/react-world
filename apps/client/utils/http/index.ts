import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig,
    CustomParamsSerializer,
    InternalAxiosRequestConfig,
} from 'axios';
import { stringify } from 'qs';
import NProgress from '../n-progress';

const API_BASE_URL = process.env.NEXT_PUBLIC_REST_API_BASE_URL;

const defaultConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
    },
    // 배열 형식 매개 변수 직렬화（https://github.com/axios/axios/issues/5142）
    paramsSerializer: {
        serialize: stringify as unknown as CustomParamsSerializer,
    },
};
class HttpClient {
    private static readonly instance: HttpClient = new HttpClient();
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create(defaultConfig);

        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }

    private httpInterceptorsRequest(): void {
        this.axiosInstance.interceptors.request.use(
            this.handleRequestSuccess,
            this.handleRequestError,
        );
    }

    private httpInterceptorsResponse(): void {
        this.axiosInstance.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError,
        );
    }

    private handleRequestSuccess(
        config: InternalAxiosRequestConfig,
    ): InternalAxiosRequestConfig {
        console.log('Request Interceptor (Success):', config);
        NProgress.start();
        return config;
    }

    private handleRequestError(error: any): Promise<any> {
        console.error('Request Interceptor (Error):', error);

        return Promise.reject(error);
    }

    private handleResponseSuccess(response: AxiosResponse): AxiosResponse {
        console.log('Response Interceptor (Success):', response);
        NProgress.done();
        return response;
    }

    private handleResponseError(error: any): Promise<any> {
        console.error('Response Interceptor (Error):', error);
        NProgress.done();
        return Promise.reject(error);
    }

    public static getInstance(): HttpClient {
        return HttpClient.instance;
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> =
                await this.axiosInstance.request<T>(config);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    public async get<T, P>(url: string, params?: P): Promise<T> {
        return this.request<T>({ method: 'get', url, params });
    }

    public async post<T, P>(url: string, data?: P): Promise<T> {
        return this.request<T>({ method: 'post', url, data });
    }

    public async delete<T>(url: string): Promise<T> {
        return this.request<T>({ method: 'delete', url });
    }

    public async patch<T, P>(url: string, data?: P): Promise<T> {
        return this.request<T>({ method: 'patch', url, data });
    }
}

export const httpClient = HttpClient.getInstance();
