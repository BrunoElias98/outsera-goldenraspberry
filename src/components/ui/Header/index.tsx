import React from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";

interface HeaderProps {
  moduleName: string;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ moduleName, onToggleSidebar }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-gray-700 text-2xl focus:outline-none"
      >
        <FaBars />
      </button>

      <h1 className="text-lg font-bold text-gray-700">{moduleName}</h1>

      <div className="flex items-center">
        <FaUserCircle className="text-gray-400" size={32} />
      </div>
    </div>
  );
};

export default Header;
