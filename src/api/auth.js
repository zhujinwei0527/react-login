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

/**
 * 用户登录函数
 *
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Promise<Object>} 返回一个包含登录结果的Promise对象
 * @throws {Error} 如果在登录过程中发生错误，则抛出异常
 */
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

/**
 * 用户注册函数
 *
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Promise<Object>} 返回一个包含注册结果的Promise对象
 * @throws {Error} 如果在注册过程中发生错误，则抛出异常
 */
export const register = async (username, password) => {
  try {
    const response = await api.post('/register', { username, password });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * 重置密码函数
 *
 * @param {string} username 用户名
 * @param {string} newPassword 新密码
 * @returns {Promise<Object>} 返回一个包含重置密码结果的Promise对象
 * @throws {Error} 如果在重置密码过程中发生错误，则抛出异常
 */
export const resetPassword = async (username, newPassword) => {
  try {
    const response = await api.post('/resetPassword', { username, newPassword });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * 设置本地存储中的token
 *
 * @param {string} token - 需要存储的token值
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * 从localStorage中获取token
 *
 * @returns {string|null} token字符串，若未找到则返回null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * 移除存储在localStorage中的token
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * 处理API错误，返回错误信息
 *
 * @param {Object} error API错误对象
 * @returns {string} 错误信息
 */
export const handleApiError = (error) => {
  return error.msg || '未知错误，请稍后重试';
};
