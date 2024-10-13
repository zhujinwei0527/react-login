import axios from 'axios';

const API_URL = 'YOUR_API_BASE_URL'; // 替换为你的实际 API 基础 URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during login');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during registration');
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await api.post('/reset-password', { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during password reset');
  }
};

// 添加一个请求拦截器来为每个请求添加 token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;