import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import HomePage from "./components/HomePage";

import signupImage from "./assets/signup.jpg";
import loginImage from "./assets/login.jpg";

export const ThemeContext = createContext();

/**
 * App组件
 *
 * 这是一个React组件，用于构建整个应用程序的主布局。它支持暗黑模式的切换，并提供了一个统一的认证页面布局组件。
 */
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  /**
   * 切换暗黑模式
   *
   * 调用该函数将切换暗黑模式的开关状态。如果当前是暗黑模式，则关闭暗黑模式；
   * 如果当前不是暗黑模式，则开启暗黑模式。
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentImage = currentForm === "register" ? loginImage : signupImage;

  /**
   * 认证页面布局组件
   *
   * @param children 子组件
   * @returns 返回一个认证页面布局组件
   */
  const AuthLayout = ({ children }) => (
    <div className={`min-h-screen flex ${darkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full h-0 pb-[66.67%] relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={currentImage}
            alt={currentForm === "register" ? "Register" : "Login/Reset"}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative">
        {children}
      </div>
    </div>
  );

  /**
   * 切换暗色模式的按钮组件
   *
   * @returns 返回切换暗色模式的按钮组件
   */
  const DarkModeToggle = () => (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 z-10"
    >
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className={darkMode ? "dark" : ""}>
          <DarkModeToggle />
          <Routes>
            <Route path="/login" element={
              <AuthLayout>
                <LoginForm setCurrentForm={setCurrentForm} />
              </AuthLayout>
            } />
            <Route path="/register" element={
              <AuthLayout>
                <RegisterForm setCurrentForm={setCurrentForm} />
              </AuthLayout>
            } />
            <Route path="/reset-password" element={
              <AuthLayout>
                <ResetPasswordForm setCurrentForm={setCurrentForm} />
              </AuthLayout>
            } />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
