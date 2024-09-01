import axios, {HttpStatusCode} from 'axios';
import {
    getAccessTokenFromLocalStorage,
    refreshAccessToken
} from './auth.ts';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
});

let isTokenRefreshing = false;
let suspendedRequestsDuringTokenRefresh = [];

const resumeSuspendedRequestsDuringTokenRefresh = (accessToken: string) => {
    suspendedRequestsDuringTokenRefresh.forEach(({resolve, reject, config}) => {
        setAuthorizationHeader(config, accessToken);
        resolve(config);
    });

    suspendedRequestsDuringTokenRefresh = [];
};

const createBearerTokenString = (accessToken: string): string => {
    return `Bearer ${accessToken}`;
}

const setAuthorizationHeader = (config, accessToken: string) => {
    config.headers.Authorization = createBearerTokenString(accessToken);
    return config;
};

api.interceptors.request.use(config => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
        setAuthorizationHeader(config, accessToken);
    }

    if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
            suspendedRequestsDuringTokenRefresh.push({resolve, reject, config});
        });
    }

    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === HttpStatusCode.Unauthorized && !isTokenRefreshing && !originalRequest._retry) {
            originalRequest._retry = true;
            isTokenRefreshing = true;
            refreshAccessToken().then((tokenResponse) => {
                isTokenRefreshing = false;
                resumeSuspendedRequestsDuringTokenRefresh(tokenResponse.data.accessToken);
            });
            return api(originalRequest);
        } else if (error.response.status === HttpStatusCode.Forbidden) {
            if (error.response.data.error === 'Email not confirmed') {
                window.location.href = '/confirm-email-info';
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export default api;