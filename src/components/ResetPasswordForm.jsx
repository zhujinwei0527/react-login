import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { resetPassword, handleApiError } from '../api/auth';

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = username.trim() !== '' &&
                    password.trim() !== '' &&
                    confirmPassword.trim() !== '' &&
                    password === confirmPassword;
    setIsFormValid(isValid);
  }, [username, password, confirmPassword]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('密码不匹配');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('密码不匹配');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsLoading(true);
      try {
        const response = await resetPassword(username, password);
        if (response.code === 200) {
          setMessage('密码重置成功');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setMessage(response.msg || '密码重置失败，请稍后重试');
        }
      } catch (error) {
        setMessage(handleApiError(error));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">重置密码</h2>
      {message && (
        <div className={`mb-4 p-2 text-center rounded ${message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium dark:text-white">用户名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="输入您的用户名"
            required
          />
        </div>
        <div className="relative">
          <label htmlFor="newPassword" className="block mb-1 font-medium dark:text-white">新密码</label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="输入新密码"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-10 text-gray-500 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="relative">
          <label htmlFor="confirmNewPassword" className="block mb-1 font-medium dark:text-white">确认新密码</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmNewPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="确认新密码"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-10 text-gray-500 dark:text-gray-300"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 ${
            isFormValid && !isLoading ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? '处理中...' : '重置密码'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/login')}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          返回登录
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
