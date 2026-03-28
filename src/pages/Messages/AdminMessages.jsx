import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare, Loader,
  AlertCircle, Send, Paperclip, Smile, RefreshCw, Copy, ThumbsDown
} from 'lucide-react';
import { fetchConversations, fetchMessages, sendMessage } from '../../api/crmApi';
import MainLayout from '../../components/layout/MainLayout';
import ChatSidebar from './ChatSidebar';

// Icons placeholder
const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="22"></line>
  </svg>
);

const ChipIcon = () => (
  <div className="w-8 h-8 rounded-full bg-[#f0f4f8] flex items-center justify-center border border-[#e5e7eb] flex-shrink-0">
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#0f6885]">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  </div>
);

const SpeakerIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600 cursor-pointer">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const RefreshIcon = () => (
   <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600 cursor-pointer">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
   </svg>
);

const dedupeText = (text) => {
  if (!text) return text;
  const t = text.trim();
  const parts2 = t.split(/\n\n+/);
  if (parts2.length === 2 && parts2[0].trim() === parts2[1].trim()) return parts2[0].trim();
  const parts1 = t.split('\n');
  const mid = Math.floor(parts1.length / 2);
  if (parts1.length >= 2 && parts1.length % 2 === 0) {
    const first  = parts1.slice(0, mid).join('\n').trim();
    const second = parts1.slice(mid).join('\n').trim();
    if (first === second) return first;
  }
  return text;
};

const dedupeMsgs = (msgs) =>
  msgs.filter((msg, i) => {
    if (i === 0) return true;
    const prev = msgs[i - 1];
    return !(
      prev.sender === msg.sender &&
      (prev.text || '').trim() === (msg.text || '').trim()
    );
  });

const MsgBubble = ({ msg }) => {
  const isBot = msg.sender === 'BOT' || msg.sender === 'AGENT';
  // Time extracted and mapped appropriately
  const time  = new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const rawText = dedupeText(msg.text);

  if (isBot) {
    return (
      <div className="flex items-start gap-4 mb-6">
        <ChipIcon />
        <div className="flex flex-col gap-2 max-w-[65%]">
           <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm overflow-hidden p-1 pb-2">
             {/* If we had an image it would be rendered here. For now we just render text or mock image if it contains it */}
             {rawText && /https?:\/\//i.test(rawText) ? (
                 <div className="p-3 bg-gray-50 rounded-xl mb-2 flex items-center justify-center">
                    <img src={rawText.match(/https?:\/\/[^\s]+/i)?.[0]} className="rounded-lg object-cover max-h-64" alt="Media view" />
                 </div>
             ) : null}
             <div className="px-4 py-2 flex flex-col">
               <span className="text-gray-800 text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                 {rawText?.replace(/https?:\/\/[^\s]+/ig, '').trim() || '*No text*'}
               </span>
               {(msg.confidence_score !== undefined || msg.fallback_triggered) && (
                 <div className="mt-2.5 flex flex-wrap gap-2 items-center">
                   {msg.confidence_score !== undefined && (
                     <span className="bg-blue-50 text-[#0f6885] text-[10px] font-bold px-2 py-0.5 rounded border border-[#0f6885]/20 uppercase tracking-widest">
                       Score: {msg.confidence_score}
                     </span>
                   )}
                   {msg.fallback_triggered && (
                     <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-widest flex items-center gap-1">
                       <AlertCircle className="w-3 h-3" /> Fallback
                     </span>
                   )}
                 </div>
               )}
               <div className="w-full flex justify-end items-center mt-2">
                 <span className="text-[11px] text-gray-400 font-medium tracking-wide">{time}</span>
                 <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none" className="ml-1 text-gray-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
               </div>
             </div>
           </div>
           
           {/* Action Icons underneath AI message */}
           <div className="flex items-center gap-3 ml-2 mt-1">
             <SpeakerIcon />
             <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
             <RefreshIcon />
             <ThumbsDown className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
           </div>
        </div>
      </div>
    );
  }

  // Client Msg
  return (
    <div className="flex justify-end gap-3 mb-6">
      <div className="bg-[#0f6885] text-white rounded-2xl rounded-tr-sm shadow-sm px-5 py-3 max-w-[65%] flex flex-col">
        <span className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{rawText}</span>
        <div className="w-full flex justify-end items-center mt-2.5">
          <span className="text-[11px] text-white/70 font-medium tracking-wide">{time}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none" className="ml-1 text-white">
             <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      <img src="https://i.pravatar.cc/150?u=client" alt="client" className="w-8 h-8 rounded-full border border-gray-100 object-cover mt-1" />
    </div>
  );
};

const AdminMessages = () => {
  const SHOP_ID = '1LXybpj';
  const [conversations, setConversations] = useState([]);
  const [convsLoading, setConvsLoading]   = useState(true);
  
  const [selected, setSelected]           = useState(null);
  const [messages, setMessages]           = useState([]);
  const [msgsLoading, setMsgsLoading]     = useState(false);
  
  const [search, setSearch]   = useState('');
  const [draft, setDraft]       = useState('');
  const [sending, setSending]   = useState(false);
  const messagesEndRef          = useRef(null);

  const loadConversations = useCallback(async () => {
    setConvsLoading(true);
    try {
      const { data } = await fetchConversations(SHOP_ID);
      setConversations(data.results ?? data);
    } catch (err) { } 
    finally { setConvsLoading(false); }
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  const loadMessages = useCallback(async (convId) => {
    setMsgsLoading(true);
    setMessages([]);
    try {
      const { data } = await fetchMessages(convId);
      const raw = data.results ?? data;
      setMessages(dedupeMsgs(raw));
    } catch (err) { } 
    finally { setMsgsLoading(false); }
  }, []);

  const handleSelect = (conv) => {
    setSelected(conv);
    setDraft('');
    loadMessages(conv.id);
  };

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || !selected || sending) return;
    setSending(true);
    const optimistic = {
      id: `tmp-${Date.now()}`,
      sender: 'AGENT',
      text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft('');
    try {
      await sendMessage(selected.id, text);
      loadMessages(selected.id);
    } catch (_) {} 
    finally { setSending(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, msgsLoading]);

  const filtered = conversations.filter((c) => {
    const name = c.lead_details?.name || c.lead_details?.platform_id || '';
    return name.toLowerCase().includes(search.toLowerCase()) || String(c.id).includes(search);
  });

  const sidebarContent = (
     <ChatSidebar 
        conversations={filtered} 
        selected={selected} 
        onSelect={handleSelect}
        search={search}
        setSearch={setSearch}
     />
  );

  return (
    <MainLayout secondarySidebar={sidebarContent}>
      {selected ? (
        <div className="flex-1 flex flex-col h-full bg-[#f8fafc]">
          
          {/* Main Chat Area */}
          <div className="flex-1 overflow-y-auto px-8 py-8 relative">
            <div className="flex justify-center mb-8">
               <div className="bg-gray-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-md">
                 Fri, 22 Fev
               </div>
            </div>

            {msgsLoading ? (
               <div className="flex justify-center py-10"><Loader className="w-8 h-8 animate-spin text-[#0f6885]" /></div>
            ) : (
               <>
                 {messages.map((msg) => <MsgBubble key={msg.id} msg={msg} />)}
               </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-6 bg-[#f8fafc] border-t border-transparent shrink-0 flex justify-center pb-8">
             <div className="bg-white border border-gray-200 rounded-[28px] w-[95%] shadow-sm px-4 py-3 flex items-center justify-between transition-all focus-within:ring-2 focus-within:ring-[#0f6885]/20 focus-within:border-[#0f6885]">
                
                <div className="flex items-center flex-1">
                   <Paperclip className="w-5 h-5 text-gray-400 rotate-[-45deg] mr-3 cursor-pointer hover:text-gray-600" />
                   <input
                     value={draft}
                     onChange={(e) => setDraft(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Message to Street Wear Agent..."
                     className="w-full bg-transparent text-[15px] font-medium placeholder-gray-400 text-gray-800 outline-none"
                   />
                </div>

                <div className="flex items-center gap-4 border-l border-gray-100 pl-4 w-auto shrink-0">
                   <Smile className="w-[22px] h-[22px] text-gray-400 cursor-pointer hover:text-gray-600" />
                   <MicIcon />
                   <button
                     onClick={handleSend}
                     disabled={!draft.trim() || sending}
                     className="bg-[#0f6885] hover:bg-[#0c5973] transition-colors rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-white shadow-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <span className="font-semibold text-sm">Send</span>
                     {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                   </button>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
           Select a chat to view messages
        </div>
      )}
    </MainLayout>
  );
};

export default AdminMessages;
