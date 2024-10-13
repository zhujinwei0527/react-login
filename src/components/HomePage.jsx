import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../api/auth';
import { ThemeContext } from '../App';

/**
 * 主页组件
 *
 * 该组件展示了主页的基本布局和样式，包括欢迎信息、内容提示和登出按钮。
 *
 * @returns 返回渲染后的 JSX 元素
 */
const HomePage = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  /**
   * 处理用户登出操作
   *
   * @returns {void} 无返回值
   */
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page</h1>
        <p className="mb-4">This is a simple demo of the home page. You can customize it as needed.</p>
        <ul className="list-disc list-inside mb-4">
          <li>Add your main content here</li>
          <li>Include navigation to other parts of your application</li>
          <li>Display user-specific information</li>
        </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
