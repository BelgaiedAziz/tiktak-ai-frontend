import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Greetings from './tabs/Greetings';
import AIPersonality from './tabs/AIPersonality';
import Complaints from './tabs/Complaints';
import Availability from './tabs/Availability';
import ProductInfo from './tabs/ProductInfo';
import OrderConfirmation from './tabs/OrderConfirmation';
import OutOfStock from './tabs/OutOfStock';
import Appearance from './tabs/Appearance';

// Icons
import {
  Settings as GenIcon,
  MessageSquare as GreetIcon,
  Sun as PersonIcon,
  CheckSquare as ConfirmIcon,
  AlertCircle as CompIcon,
  Truck as DelIcon,
  RefreshCcw as RefundIcon,
  Ban as OOSIcon,
  Image as AppIcon,
  Info as InfoIcon,
  Boxes as StockIcon
} from 'lucide-react';

const navItems = [
  { id: 'product_info', label: 'Product Info', icon: <InfoIcon className="w-4 h-4" />, path: 'product-info' },
  { id: 'availability', label: 'Availability', icon: <StockIcon className="w-4 h-4" />, path: 'availability' },
  { id: 'confirm', label: 'Order Flow', icon: <ConfirmIcon className="w-4 h-4" />, path: 'confirm' },
  { id: 'greetings', label: 'Greetings', icon: <GreetIcon className="w-4 h-4" />, path: 'greetings' },
  { id: 'personality', label: 'AI Personality', icon: <PersonIcon className="w-4 h-4" />, path: 'personality' },
  { id: 'complaints', label: 'Complaints', icon: <CompIcon className="w-4 h-4" />, path: 'complaints' },
  { id: 'oos', label: 'Out of Stock', icon: <OOSIcon className="w-4 h-4" />, path: 'oos' },
  { id: 'appearance', label: 'Appearance', icon: <AppIcon className="w-4 h-4" />, path: 'appearance' },
];

const AgentSettingsLayout = () => {
  const sidebarContent = (
    <div className="h-full flex flex-col pt-5">
      <div className="px-6 mb-8 flex items-center justify-between">
        <h2 className="text-[22px] font-extrabold text-[#1f2937]">Agent settings</h2>
      </div>

      <nav className="flex-1 w-full flex flex-col px-4 gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/settings/${item.path}`}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold text-[15px]
              ${isActive 
                ? 'bg-[#0f6885] text-white shadow-sm' 
                : 'text-gray-500 hover:text-[#0f6885] hover:bg-gray-50'
              }
            `}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <MainLayout secondarySidebar={sidebarContent}>
      <div className="h-full flex flex-col bg-white">
        <div className="px-10 py-8 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="product-info" replace />} />
            <Route path="product-info" element={<ProductInfo />} />
            <Route path="availability" element={<Availability />} />
            <Route path="confirm" element={<OrderConfirmation />} />
            <Route path="greetings" element={<Greetings />} />
            <Route path="personality" element={<AIPersonality />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="oos" element={<OutOfStock />} />
            <Route path="appearance" element={<Appearance />} />
          </Routes>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgentSettingsLayout;
