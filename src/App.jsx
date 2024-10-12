import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

import signupImage from "./assets/signup.jpg";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* <div className="w-1/2 flex items-center justify-center p-12">
      <img
          src={signupImage}
          alt="Signup"
          className="w-2/3 h-2/3 object-cover rounded-lg shadow-lg"
        />
      </div> */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full h-0 pb-[66.67%] relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={signupImage}
            alt="Signup"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative">
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
