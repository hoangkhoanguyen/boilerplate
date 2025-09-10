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
export const adminApi = createAxiosInstance({
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
        onFulfilled: (res) => res.data || res,
        onRejected: (err) => {
            if (err && err instanceof AxiosError && err.response?.status === 401) {
                // handle unauthorized access, refresh token or redirect to login
            }
            return Promise.reject(err);
        },
    },
});

// Web instance with its own interceptors
export const webApi = createAxiosInstance({
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
            return Promise.reject(err);
        },
    },
});
