import axios from 'axios';

export const TOKEN_KEY = 'foodshare_token';

// One axios instance for the whole app. The token is attached automatically.
const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Turn any failed request into a readable message.
export const errorMessage = (err) =>
  err.response?.data?.error || (err.request ? 'Cannot reach the server. Is the backend running?' : err.message);

export default api;
