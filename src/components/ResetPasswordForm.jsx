import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ResetPasswordForm = ({ setCurrentForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Reset Password</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium dark:text-white">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your username"
          />
        </div>
        <div className="relative">
          <label htmlFor="newPassword" className="block mb-1 font-medium dark:text-white">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-500 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="relative">
          <label htmlFor="confirmNewPassword" className="block mb-1 font-medium dark:text-white">Confirm New Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmNewPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-500 dark:text-gray-300"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Reset Password
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => setCurrentForm('login')}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;