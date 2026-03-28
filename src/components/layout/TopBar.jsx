import React, { useState } from 'react';
import { Sun, Moon, Search, ShoppingCart, Eye } from 'lucide-react';

const TopBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 z-20">
      
      {/* Left side empty or reserved for future title */}
      <div className="flex-1" />

      {/* Right — Actions */}
      <div className="flex flex-row items-center gap-4">
        
        {/* Theme Toggles */}
        <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full p-1">
          <button 
            onClick={() => setIsDarkMode(false)} 
            className={`p-1.5 rounded-full transition-colors ${!isDarkMode ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsDarkMode(true)} 
            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
          <Search className="w-4 h-4" />
        </button>

        {/* Cart */}
        <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
          <ShoppingCart className="w-4 h-4" />
        </button>

        {/* View Shop */}
        <button className="ml-2 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <Eye className="w-4 h-4 text-gray-400" />
          View Shop
        </button>

      </div>
    </header>
  );
};

export default TopBar;
