import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Bell, CheckCircle2, AlertCircle, MessageSquare, CreditCard, Loader2 } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'system', title: 'System Update', message: 'Tiktak AI engine has been updated to v2.1. Faster response times!', time: '10m ago', unread: true, icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, type: 'message', title: 'New Unanswered Question', message: 'Sarah asked: "Do you ship to Tunisia?" - Please provide an answer in Knowledge Base.', time: '1h ago', unread: true, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 3, type: 'billing', title: 'Invoice Available', message: 'Your monthly invoice for March #INV-2024 is now available for download.', time: '2h ago', unread: false, icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 4, type: 'success', title: 'WooCommerce Sync Complete', message: 'Successfully synced 1,245 products to your AI brain.', time: '1d ago', unread: false, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 5, type: 'system', title: 'Welcome to Tiktak AI', message: 'Get started by configuring your agent settings and uploading data.', time: '2d ago', unread: false, icon: Bell, color: 'text-[#0f6885]', bg: 'bg-[#eef6f9]' },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulate network request with a loader animation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filter]);

  const displayed = notifications.filter(n => filter === 'all' || (filter === 'unread' && n.unread));

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const secondarySidebar = (
    <div className="h-full flex flex-col pt-5">
      <div className="px-6 mb-8">
        <h2 className="text-[22px] font-extrabold text-[#1f2937] flex items-center gap-2">
          Notifications <Bell className="w-5 h-5 text-[#0f6885] animate-bounce" />
        </h2>
      </div>

      <div className="px-4 flex flex-col gap-1">
         <button onClick={() => setFilter('all')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${filter === 'all' ? 'bg-[#0f6885] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>All Notifications</button>
         <button onClick={() => setFilter('unread')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors flex justify-between items-center ${filter === 'unread' ? 'bg-[#0f6885] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            Unread
            {notifications.some(n => n.unread) && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${filter === 'unread' ? 'bg-white text-[#0f6885]' : 'bg-[#f97316] text-white'}`}>New</span>
            )}
         </button>
      </div>
    </div>
  );

  return (
    <MainLayout secondarySidebar={secondarySidebar}>
      <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-y-auto px-10 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight transition-all">Your Activity</h1>
          <button onClick={markAllRead} className="text-sm font-bold text-[#0f6885] hover:text-[#0c5973] hover:underline transition-all">
            Mark all as read
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-[#0f6885] animate-pulse">
             <Loader2 className="w-8 h-8 animate-spin" />
             <span className="text-sm font-bold">Loading notifications...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 bg-white rounded-2xl border border-gray-100 shadow-sm border-dashed">
                 <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" />
                 <span className="text-gray-500 font-medium">You're all caught up!</span>
              </div>
            ) : (
              displayed.map((notif, idx) => {
                const Icon = notif.icon;
                return (
                  // Staggered fade in animation using standard tailwind transition utilities along with a custom style delay
                  <div 
                    key={notif.id} 
                    className={`relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-start gap-4 animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Unread dot indicator */}
                    {notif.unread && (
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#f97316] animate-pulse shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-transparent transition-transform hover:scale-110 ${notif.bg} ${notif.color}`}>
                       <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex flex-col flex-1 pr-6">
                       <h3 className={`text-[15px] font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h3>
                       <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">{notif.message}</p>
                       <span className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-wide">{notif.time}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default Notifications;
