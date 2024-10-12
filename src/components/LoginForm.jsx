import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = ({ setCurrentForm }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Login</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium dark:text-white">Username</label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your username"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block mb-1 font-medium dark:text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-3 py-2 border rounded-md pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-500 dark:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => setCurrentForm('register')}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Don't have an account? Register
        </button>
      </div>
      <div className="mt-2 text-center">
        <button
          onClick={() => setCurrentForm('reset')}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;