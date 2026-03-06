import React from 'react';
import { Home, BarChart2, User, Calendar, Zap, Bell, Settings } from 'lucide-react';
import logoTiktak from '../../assets/images/logoTiktak.png';

const Sidebar = () => {
    return (
        <div className="w-20 bg-white border-r border-gray-200 h-screen flex flex-col items-center py-6 flex-shrink-0 z-10">
            {/* Logo Area */}
            <div className="mb-10 w-12 h-12 flex items-center justify-center">
                <img src={logoTiktak} alt="Tiktak Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>

            {/* Top Icons */}
            <nav className="flex-1 w-full flex flex-col items-center space-y-8">
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <Home className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <BarChart2 className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <User className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors relative">
                    <Calendar className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <Zap className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors relative">
                    <Bell className="w-6 h-6" />
                </a>
            </nav>

            {/* Bottom Icons */}
            <div className="w-full flex flex-col items-center space-y-6 mt-auto">
                <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors">
                    <Settings className="w-6 h-6" />
                </a>
                <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-100 focus:outline-none">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User profile"
                        className="w-full h-full object-cover"
                    />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
