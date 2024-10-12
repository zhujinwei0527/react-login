import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-1/2 flex items-center justify-center p-12">
        <img
          src="https://source.unsplash.com/random/800x600?nature"
          alt="Nature"
          className="w-2/3 h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-12 relative">
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        {currentForm === 'login' && <LoginForm setCurrentForm={setCurrentForm} />}
        {currentForm === 'register' && <RegisterForm setCurrentForm={setCurrentForm} />}
        {currentForm === 'reset' && <ResetPasswordForm setCurrentForm={setCurrentForm} />}
      </div>
    </div>
  );
}

export default App;