import axios, {HttpStatusCode} from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST,
    withCredentials: true
});

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === HttpStatusCode.Forbidden) {
            if (error.response.data.error === 'Email not confirmed') {
                window.location.href = '/confirm-email-info';
            }
        }
    }
);

export default api;