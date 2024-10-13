import axios from 'axios';

const API_URL = 'http://127.0.0.1:18888'; // 请替换为实际的 API URL

// 创建 axios 实例
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response?.data || { code: 500, msg: '网络错误，请稍后重试' });
  }
);

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    if (response.code === 200 && response.token) {
      setToken(response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const handleApiError = (error) => {
  return error.msg || '未知错误，请稍后重试';
};
