import axios, {AxiosResponse} from "axios";
import api from "./api.ts";

export const API_USERS_ME = '/api/users/me';

export interface User {
    id: number;
    nickname: string;
    email: string;
    emailConfirmedAt?: Date
}

export async function me(): Promise<User> {
    const response: AxiosResponse<User> = await api.get(API_USERS_ME);
    return response.data;
}


