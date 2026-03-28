import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Icons placeholder
const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const ChatSidebar = ({ conversations, selected, onSelect, search, setSearch }) => {
  const filters = ['Pickup', 'Recents', 'Awaiting Confirmation'];

  // Example mappings matching the UI based on conversation attributes
  // For the sake of the mock, we can hardcode some properties if they don't exist yet, 
  // or use the real lead_details.
  
  return (
    <div className="h-full flex flex-col pt-5">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-[#1f2937]">Chat List</h2>
        <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500">
           <EditIcon />
        </button>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search or start a new chat"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6885]/30 focus:border-[#0f6885] transition-colors placeholder-gray-400 text-gray-800 shadow-sm"
          />
        </div>
      </div>

      {/* Pills */}
      <div className="px-6 mb-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((f, i) => (
          <button
            key={f}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
              i === 1 // Mock 'Recents' is selected in image, wait image shows 'Recents' is blue? Let's check image... Image shows Pickup white, Recents blue, Awaiting Confirmation white.
                ? 'bg-[#0f6885] text-white border-[#0f6885]'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto mt-2">
        {conversations.map((conv) => {
          const isSelected = selected?.id === conv.id;
          const lead = conv.lead_details || {};
          const name = lead.name || `Conversation #${conv.id}`;
          
          // Generate deterministic avatar from id
          const avatarUrl = `https://i.pravatar.cc/150?u=${conv.id}`;
          
          // Mock data for preview and unread count matching the image roughly
          const preview = conv.last_message || "You: livreur Itawa la jeni";
          const time = new Date(conv.updated_at).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false});
          const unreadCount = conv.unread_count > 0 ? conv.unread_count : null; 
          
          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors relative border-l-4 ${
                isSelected 
                  ? 'bg-gray-50/80 border-[#0f6885]' 
                  : 'bg-transparent border-transparent hover:bg-gray-50'
              }`}
            >
              <img src={avatarUrl} alt={name} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-sm text-gray-800 truncate pr-2">{name}</span>
                  <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">{time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs truncate ${unreadCount ? 'text-gray-800 font-semibold' : 'text-gray-500 font-medium'}`}>
                    {preview}
                  </span>
                  {unreadCount && (
                    <span className="ml-2 flex-shrink-0 w-4 h-4 rounded-full bg-[#f97316] text-white flex items-center justify-center text-[9px] font-bold pb-px">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
