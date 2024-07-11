import axios, {AxiosResponse} from 'axios';

const authApi = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
});

export const API_AUTH_REFRESH = '/api/auth/refresh';
export const API_AUTH_LOGIN = '/api/auth/login';
export const API_AUTH_REGISTER = '/api/auth/register';
export const API_AUTH_REVOKE_REFRESH_TOKEN = '/api/auth/revoke-refresh-token';

export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'access_token';
export const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refresh_token';

interface RefreshToken {
    userId: number;
    refreshToken: string;
    createdAt: string;
    expiresAt: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: RefreshToken;
}

export async function login(username: string, password: string): Promise<TokenResponse> {
    const response: AxiosResponse<TokenResponse> = await authApi.post(API_AUTH_LOGIN, {username, password});
    storeAccessAndRefreshTokens(response.data.accessToken, response.data.refreshToken.refreshToken);
    return response.data;
}

export async function register(username: string, password: string): Promise<TokenResponse> {
    const response: AxiosResponse<TokenResponse> = await authApi.post(API_AUTH_REGISTER, {username, password});
    return response.data;
}

export async function refreshAccessToken(): Promise<AxiosResponse<TokenResponse>> {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    return authApi.post(API_AUTH_REFRESH, {refreshToken: refreshToken}).then(response => {
        storeAccessAndRefreshTokens(response.data.accessToken, response.data.refreshToken.refreshToken);
        return response;
    }).catch(reason => {
        navigateToLoginUrl();
        return reason;
    });
}

export async function logout(): Promise<TokenResponse> {
    const response: AxiosResponse<TokenResponse> =
        await authApi.post(API_AUTH_REVOKE_REFRESH_TOKEN, {refreshToken: getRefreshTokenFromLocalStorage()});
    removeAccessAndRefreshTokens();
    navigateToLoginUrl();
    return response.data;
}

function storeAccessAndRefreshTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
}

function removeAccessAndRefreshTokens() {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
}

export function getAccessTokenFromLocalStorage(): string {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    if (!accessToken) {
        navigateToLoginUrl();
    }
    return accessToken;
}

export function getRefreshTokenFromLocalStorage(): string {
    return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
}

export function navigateToLoginUrl() {
    window.location.href = '/login';
}