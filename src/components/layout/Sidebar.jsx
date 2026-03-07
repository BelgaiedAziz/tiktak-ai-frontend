import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Users } from 'lucide-react';
import logoTiktak from '../../assets/images/logoTiktak.png';

const navCls = ({ isActive }) =>
    `p-2.5 rounded-xl transition-colors ${isActive
        ? 'text-[#0f6885] bg-[#eef6f9]'
        : 'text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9]'
    }`;

const Sidebar = () => {
    return (
        <div className="w-20 bg-white border-r border-gray-200 h-full flex flex-col items-center py-6 flex-shrink-0 z-30 relative">
            {/* Logo */}
            <div className="mb-10 w-12 h-12 flex items-center justify-center">
                <img src={logoTiktak} alt="Tiktak Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>

            {/* Icons */}
            <nav className="flex-1 w-full flex flex-col items-center space-y-4">
                <NavLink to="/" end className={navCls} title="Accueil">
                    <Home className="w-6 h-6" />
                </NavLink>
                <NavLink to="/messages" className={navCls} title="Messages">
                    <MessageSquare className="w-6 h-6" />
                </NavLink>
                <NavLink to="/leads" className={navCls} title="Leads">
                    <Users className="w-6 h-6" />
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
