import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
});

api.interceptors.request.use(
	(config) => {
		const { headers } = config;
		const token = localStorage.getItem('token');
		if (token !== null) {
			headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);
