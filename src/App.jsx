import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

import signupImage from "./assets/signup.jpg";
import loginImage from "./assets/login.jpg";

function App() {
  // 状态管理：控制深色模式和当前显示的表单
  const [darkMode, setDarkMode] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  // 切换深色/浅色模式的函数
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 根据当前表单选择要显示的图片
  const currentImage = currentForm === "register" ? loginImage : signupImage;

  return (
    // 主容器：根据深色模式状态应用不同的背景色
    <div
      className={`min-h-screen flex ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* 左侧图片区域 */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full h-0 pb-[66.67%] relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={currentImage}
            alt={currentForm === "register" ? "Register" : "Login/Reset"}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>

      {/* 右侧表单区域 */}
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative">
        {/* 深色模式切换按钮 */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>

        {/* 根据当前状态渲染不同的表单组件 */}
        {currentForm === "login" && (
          <LoginForm setCurrentForm={setCurrentForm} />
        )}
        {currentForm === "register" && (
          <RegisterForm setCurrentForm={setCurrentForm} />
        )}
        {currentForm === "reset" && (
          <ResetPasswordForm setCurrentForm={setCurrentForm} />
        )}
      </div>
    </div>
  );
}

export default App;