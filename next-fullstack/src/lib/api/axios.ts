import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

type Interceptor<T> = {
    onFulfilled?: (value: T) => T | Promise<T>;
    onRejected?: (error: unknown) => unknown;
};

type AxiosInterceptors = {
    request?: Interceptor<InternalAxiosRequestConfig>;
    response?: Interceptor<AxiosResponse>;
};

function createAxiosInstance(interceptors?: AxiosInterceptors): AxiosInstance {
    const instance = axios.create({});

    // request interceptors
    if (interceptors?.request?.onFulfilled) {
        instance.interceptors.request.use(interceptors.request.onFulfilled, interceptors.request.onRejected);
    }

    // response interceptors (keep a default rejection handler)
    instance.interceptors.response.use(interceptors?.response?.onFulfilled ?? ((r) => r), interceptors?.response?.onRejected ?? ((e) => Promise.reject(e)));

    return instance;
}

// Admin instance with its own interceptors

// Web instance with its own interceptors
export const api = createAxiosInstance({
    request: {
        onFulfilled: (config) => {
            if (typeof window !== "undefined") {
                // do something before request is sent
            }
            return config;
        },
        onRejected: (err) => Promise.reject(err),
    },
    response: {
        onFulfilled: (res) => {
            // web-specific response processing (e.g. strip wrappers)
            return res;
        },
        onRejected: (err) => {
            // e.g. show toast for web errors
            if (err instanceof AxiosError) {
                console.error("API error:", err.response?.data ?? err.message);
            }
            return Promise.reject(err);
        },
    },
});
