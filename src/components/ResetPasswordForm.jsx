import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * 将所有输入框设置为必填项（添加了 required 属性）。
 * 添加了 isFormValid 状态来跟踪表单的有效性。
 * 使用 useEffect hook 来检查表单是否有效，确保所有字段都已填写且新密码和确认密码相匹配。
 * 根据 isFormValid 状态来启用或禁用 "重置密码" 按钮。
 * 更新了按钮的样式，当表单无效时显示为禁用状态。
 * 添加了 handleSubmit 函数来处理表单提交。
 * @returns 
 */
const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 检查表单是否有效
    const isValid = username.trim() !== '' &&
                    password.trim() !== '' &&
                    confirmPassword.trim() !== '' &&
                    password === confirmPassword;
    setIsFormValid(isValid);
  }, [username, password, confirmPassword]);

  /**
   * 处理用户名更改事件
   *
   * @param e 事件对象
   */
  const handleUsernameChange = (e) => {
    const value = e.target.value.replace(/[^a-z0-9]/g, '');
    setUsername(value);
  };
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // 在这里处理密码重置逻辑
      console.log('密码重置表单提交');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Reset Password</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium dark:text-white">username</label>
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
          <label htmlFor="newPassword" className="block mb-1 font-medium dark:text-white">new password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter new password"
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
          <label htmlFor="confirmNewPassword" className="block mb-1 font-medium dark:text-white">confirm new password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmNewPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter new password again"
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
            isFormValid ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          Reset Password
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/login')}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Return Login
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
