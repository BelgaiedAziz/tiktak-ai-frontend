import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, MessageCircle, Users } from 'lucide-react';

const navCls = ({ isActive }) =>
  `p-3 rounded-2xl transition-colors mb-2 ${isActive
    ? 'text-[#0f6885] bg-[#eef6f9]'
    : 'text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9]'
  }`;

const Sidebar = () => {
  return (
    <div className="w-[72px] bg-white border-r border-gray-100 h-full flex flex-col items-center py-6 flex-shrink-0 z-30 relative">
      {/* Logo */}
      <div className="mb-8 w-11 h-11 flex items-center justify-center bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden border border-gray-100 transform transition-transform hover:scale-105">
        <img src="/logo.png" alt="Tiktak AI Logo" className="w-full h-full object-cover p-1" />
      </div>

      {/* Primary Top Icons */}
      <nav className="flex-1 w-full flex flex-col items-center">
        <NavLink to="/" end className={navCls} title="Dashboard">
          <Home className="w-5 h-5" />
        </NavLink>
        <NavLink to="/messenger" className={navCls} title="Messenger">
          <MessageCircle className="w-5 h-5" />
        </NavLink>
        <NavLink to="/leads" className={navCls} title="Leads">
          <Users className="w-5 h-5" />
        </NavLink>
      </nav>

      {/* Bottom Icons */}
      <nav className="w-full flex flex-col items-center pb-2">
        <NavLink to="/settings" className={navCls} title="Settings">
          <Settings className="w-5 h-5" />
        </NavLink>

        {/* Avatar Placeholder */}
        <button className="mt-4 rounded-full overflow-hidden w-9 h-9 border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#0f6885]">
          <img src="https://i.pravatar.cc/150?img=47" alt="User Profile" className="w-full h-full object-cover" />
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
