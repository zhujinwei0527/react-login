import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login, handleApiError } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

/**
 * 登录表单组件
 *
 * @returns {JSX.Element} 返回登录表单的JSX元素
 */
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * 处理用户名更改事件
   *
   * @param e 事件对象
   */
  const handleUsernameChange = (e) => {
    const value = e.target.value.replace(/[^a-z0-9]/g, '');
    setUsername(value);
  };

  /**
   * 处理密码变更的函数
   *
   * @param {Event} e - DOM事件对象
   * @returns {void} 无返回值
   *
   * @description 当密码输入框的值发生变化时，该函数会被触发，并更新应用的状态来反映新的密码值
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * 提交表单并处理登录逻辑
   *
   * @param {Event} e - 表单提交事件对象
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(username, password);
      if (response.code === 200) {
        // 登录成功，跳转到首页
        navigate('/home');
      } else {
        setError(response.msg || '登录失败，请重试');
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium dark:text-white">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block mb-1 font-medium dark:text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/register" className="text-blue-500 hover:underline dark:text-blue-400">
          Don't have an account? Register
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link to="/reset-password" className="text-blue-500 hover:underline dark:text-blue-400">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
