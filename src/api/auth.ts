import {AxiosResponse} from 'axios';
import api from "./api.ts";

export const API_AUTH_LOGIN = '/api/auth/login';
export const API_AUTH_REGISTER = '/api/auth/register';
export const API_AUTH_LOGOUT = '/api/auth/logout';
export const API_AUTH_CONFIRM_EMAIL = '/api/auth/confirm-email';
export const API_AUTH_USER_WITH_EMAIL_EXISTS = '/api/auth/user-with-email-exists';
export const API_AUTH_USER_WITH_NICKNAME_EXISTS = '/api/auth/user-with-nickname-exists';

export async function login(email: string, password: string): Promise<void> {
    const response: AxiosResponse<void> = await api.post(API_AUTH_LOGIN, {email, password});
    return response.data;
}

export async function register(nickname: string, email: string, password: string): Promise<void> {
    const response: AxiosResponse<void> = await api.post(API_AUTH_REGISTER, {nickname, email, password});
    return response.data;
}

export async function logout(): Promise<void> {
    const response: AxiosResponse<void> = await api.post(API_AUTH_LOGOUT);
    navigateToLoginUrl();
    return response.data;
}

export async function confirmEmail(token: string): Promise<void> {
    return await api.post(`${API_AUTH_CONFIRM_EMAIL}?token=${token}`);
}

export async function userWithEmailExists(email: string): Promise<{ exists: boolean }> {
    const response = await api.post(`${API_AUTH_USER_WITH_EMAIL_EXISTS}?email=${email}`);
    return response.data;
}

export async function userWithNicknameExists(nickname: string): Promise<{ exists: boolean }> {
    const response = await api.post(`${API_AUTH_USER_WITH_NICKNAME_EXISTS}?nickname=${nickname}`);
    return response.data;
}

export function navigateToLoginUrl() {
    window.location.href = '/login';
}