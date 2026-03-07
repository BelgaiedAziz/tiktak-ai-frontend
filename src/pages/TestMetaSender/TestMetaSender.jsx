import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader, Search, ArrowRight, ChevronRight, ChevronLeft, X, MoreVertical, Phone, Video } from 'lucide-react';
import { sendPocMessage } from '../../api/metaApi';

const PAGE_NAME = 'Aura Boutique';
const SHOP_ID = '1LXybpj';
const PAGE_AVATAR = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=150&q=80';

// WhatsApp color palette
const WA = {
    headerBg: '#202C33',
    sidebarBg: '#111B21',
    sidebarItem: '#202C33',
    chatBg: '#0B141A',
    sentBubble: '#005C4B',
    recvBubble: '#202C33',
    inputBg: '#2A3942',
    inputBar: '#1F2C34',
    green: '#00A884',
    greenLight: '#25D366',
    textPrimary: '#E9EDEF',
    textSecond: '#8696A0',
    border: '#2A3942',
    searchBg: '#2A3942',
};

const STATE_META = {
    NEW_CONVERSATION: { label: 'NEW', color: 'bg-gray-700 text-gray-300' },
    WAITING_USER_REPLY: { label: 'WAITING REPLY', color: 'bg-yellow-900 text-yellow-300' },
    WAITING_DISAMBIGUATION: { label: 'DISAMBIGUATION', color: 'bg-orange-900 text-orange-300' },
    COMPLETED: { label: 'COMPLETED', color: 'bg-green-900 text-green-300' },
};

/* ─────────────────────────── Debug Panel ─────────────────────────── */
const DebugPanel = ({ debug, onClose }) => {
    if (!debug) return (
        <aside className="w-[300px] flex-shrink-0 flex flex-col items-center justify-center gap-3" style={{ backgroundColor: WA.sidebarBg, borderLeft: `1px solid ${WA.border}` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: WA.searchBg }}>
                <ChevronLeft className="w-5 h-5" style={{ color: WA.textSecond }} />
            </div>
            <p className="text-xs text-center px-4" style={{ color: WA.textSecond }}>Envoie un message pour voir le debug de la réponse</p>
        </aside>
    );

    const { intent_detected, entities_extracted, accumulated_context, previous_state, new_state, missing_entities } = debug;
    const stateInfo = STATE_META[new_state] || { label: new_state, color: 'bg-gray-700 text-gray-300' };
    const prevInfo = STATE_META[previous_state] || { label: previous_state, color: 'bg-gray-700 text-gray-300' };

    return (
        <aside className="w-[300px] flex-shrink-0 flex flex-col overflow-hidden" style={{ backgroundColor: WA.sidebarBg, borderLeft: `1px solid ${WA.border}` }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: WA.headerBg, borderBottom: `1px solid ${WA.border}` }}>
                <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: WA.textSecond }}>Debug Interne</h2>
                <button onClick={onClose} className="p-1 rounded-full transition-colors hover:opacity-70">
                    <X className="w-4 h-4" style={{ color: WA.textSecond }} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-xs">

                {/* State transition */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: WA.textSecond }}>État</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded-md font-semibold text-[11px] ${prevInfo.color}`}>{prevInfo.label}</span>
                        <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: WA.textSecond }} />
                        <span className={`px-2 py-1 rounded-md font-bold text-[11px] ${stateInfo.color}`}>{stateInfo.label}</span>
                    </div>
                </div>

                {/* Intent */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: WA.textSecond }}>Intent détecté</p>
                    <span className="px-2.5 py-1 rounded-md font-semibold bg-purple-900 text-purple-300">
                        {intent_detected || '—'}
                    </span>
                </div>

                {/* Entities extracted */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: WA.textSecond }}>Entités extraites</p>
                    {entities_extracted && Object.keys(entities_extracted).length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {Object.entries(entities_extracted).map(([k, v]) => (
                                <span key={k} className="px-2 py-1 rounded-md font-medium" style={{ backgroundColor: WA.searchBg, color: WA.textPrimary }}>
                                    <span style={{ color: WA.green }}>{k}:</span> {v}
                                </span>
                            ))}
                        </div>
                    ) : <span style={{ color: WA.textSecond }}>Aucune entité</span>}
                </div>

                {/* Missing entities */}
                {missing_entities && missing_entities.length > 0 && (
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: WA.textSecond }}>Entités manquantes</p>
                        <div className="flex flex-wrap gap-1.5">
                            {missing_entities.map((e) => (
                                <span key={e} className="px-2 py-1 rounded-md font-medium bg-red-900 text-red-300 border border-red-800">{e}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Accumulated context */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: WA.textSecond }}>Contexte accumulé</p>
                    {accumulated_context && Object.keys(accumulated_context).length > 0 ? (
                        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: WA.searchBg, border: `1px solid ${WA.border}` }}>
                            {Object.entries(accumulated_context).map(([k, v], i, arr) => (
                                <div key={k} className={`flex justify-between items-center px-3 py-2 ${i < arr.length - 1 ? 'border-b' : ''}`} style={{ borderColor: WA.border }}>
                                    <span className="font-medium" style={{ color: WA.textSecond }}>{k}</span>
                                    <span className="font-semibold text-right max-w-[55%] truncate" style={{ color: WA.textPrimary }}>{String(v)}</span>
                                </div>
                            ))}
                        </div>
                    ) : <span style={{ color: WA.textSecond }}>Vide</span>}
                </div>

            </div>
        </aside>
    );
};

/* ─────────────────────────── Conversation Item ─────────────────────── */
const ConversationItem = ({ isSelected, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
        style={{ backgroundColor: isSelected ? WA.sidebarItem : 'transparent' }}
        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#2A3942'; }}
        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
        <div className="relative flex-shrink-0">
            <img src={PAGE_AVATAR} alt={PAGE_NAME} className="w-12 h-12 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2" style={{ backgroundColor: WA.greenLight, borderColor: WA.sidebarBg }} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate" style={{ color: WA.textPrimary }}>{PAGE_NAME}</p>
                <span className="text-[11px]" style={{ color: WA.textSecond }}>Test</span>
            </div>
            <p className="text-xs truncate mt-0.5" style={{ color: WA.textSecond }}>Test API Meta</p>
        </div>
    </button>
);

/* ─────────────────────────── Message Bubble ─────────────────────── */
const MessageBubble = ({ msg, isClient }) => (
    <div className={`flex w-full mb-1 ${isClient ? 'justify-end' : 'justify-start'}`}>
        <div
            className="relative max-w-[65%] rounded-lg px-3 py-2 shadow-sm"
            style={{
                backgroundColor: isClient ? WA.sentBubble : WA.recvBubble,
                borderRadius: isClient ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
            }}
        >
            {msg.type === 'text' && (
                <p className="text-sm leading-snug pr-12" style={{ color: WA.textPrimary }}>{msg.content}</p>
            )}
            {msg.type === 'image' && (
                <img src={msg.content} alt="Shared" className="max-w-full h-auto rounded-md max-h-64" />
            )}
            {msg.identifiedImageUrl && (
                <div className="mt-2 pt-2" style={{ borderTop: `1px solid rgba(255,255,255,0.1)` }}>
                    <p className="text-[10px] mb-1" style={{ color: WA.textSecond }}>Produit identifié :</p>
                    <img src={msg.identifiedImageUrl} alt="Identified" className="max-w-full h-auto rounded-md max-h-32" />
                </div>
            )}
            {/* Timestamp + ticks */}
            <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[11px]" style={{ color: isClient ? '#8CABAA' : WA.textSecond }}>{msg.time}</span>
                {isClient && (
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                        <path d="M1 5.5L5 9.5L15 1.5" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 5.5L9 9.5" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
        </div>
    </div>
);

/* ─────────────────────────── Typing Indicator ─────────────────────── */
const TypingIndicator = () => (
    <div className="flex justify-start mb-2">
        <div className="px-4 py-2.5 rounded-lg shadow-sm" style={{ backgroundColor: WA.recvBubble, borderRadius: '8px 8px 8px 2px' }}>
            <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: WA.textSecond, animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: WA.textSecond, animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: WA.textSecond, animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
);

/* ─────────────────────────── Main Component ─────────────────────── */
const TestMetaSender = () => {
    const getTime = () => {
        const d = new Date();
        return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    const [userId, setUserId] = useState('whatsapp:+21612345678');
    const [imageFile, setImageFile] = useState(null);  // File object
    const [imagePreview, setImagePreview] = useState(null);  // object URL for display
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastDebug, setLastDebug] = useState(null);
    const [showDebug, setShowDebug] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Revoke previous preview URL to avoid memory leaks
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        e.target.value = '';
    };

    const clearImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text && !imageFile) return;

        const userMsg = {
            id: Date.now(),
            sender: 'client',
            content: imagePreview || text,
            type: imageFile ? 'image' : 'text',
            time: getTime(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        const sentFile = imageFile;
        clearImage();
        setIsLoading(true);

        const payload = {
            user_id: userId,
            shop_id: SHOP_ID,
            ...(text && { text }),
            ...(sentFile && { imageFile: sentFile }),
        };

        try {
            const { data } = await sendPocMessage(payload);
            const debug = data?.bot_response?.internal_debug ?? null;
            const botText = data?.bot_response?.text ?? '...';
            const identifiedImageUrl = data?.bot_response?.identified_image_url ?? null;
            setLastDebug(debug);
            setShowDebug(true);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, sender: 'bot', content: botText, type: 'text', identifiedImageUrl, time: getTime() },
            ]);
        } catch (error) {
            console.error('POC API error:', error);
            const status = error?.response?.status;
            const errMsg = error?.response?.data?.message ?? error.message;
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, sender: 'bot', content: `❌ Erreur ${status ?? ''}: ${errMsg}`, type: 'text', time: getTime() },
            ]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: WA.sidebarBg }}>

            {/* ── LEFT PANEL ── */}
            <aside className="w-[320px] flex-shrink-0 flex flex-col" style={{ backgroundColor: WA.sidebarBg, borderRight: `1px solid ${WA.border}` }}>
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: WA.headerBg }}>
                    <img src={PAGE_AVATAR} alt="You" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex items-center gap-3">
                        <MoreVertical className="w-5 h-5 cursor-pointer" style={{ color: WA.textSecond }} />
                    </div>
                </div>
                {/* Search */}
                <div className="px-3 py-2" style={{ backgroundColor: WA.sidebarBg }}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: WA.searchBg }}>
                        <Search className="w-4 h-4 flex-shrink-0" style={{ color: WA.textSecond }} />
                        <input
                            type="text"
                            placeholder="Rechercher ou commencer une nouvelle discussion"
                            className="flex-1 text-sm bg-transparent border-0 focus:outline-none placeholder-opacity-60"
                            style={{ color: WA.textPrimary }}
                            onFocus={e => e.target.style.caretColor = WA.green}
                        />
                    </div>
                </div>
                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto" style={{ borderTop: `1px solid ${WA.border}` }}>
                    <ConversationItem isSelected={true} onClick={() => { }} />
                </div>
            </aside>

            {/* ── CENTER: Chat ── */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* Chat header */}
                <div className="flex items-center justify-between px-4 py-2 flex-shrink-0" style={{ backgroundColor: WA.headerBg }}>
                    <div className="flex items-center gap-3">
                        <img src={PAGE_AVATAR} alt={PAGE_NAME} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-sm" style={{ color: WA.textPrimary }}>{PAGE_NAME}</p>
                            <p className="text-xs" style={{ color: WA.green }}>
                                {isLoading ? 'en train d\'écrire...' : 'en ligne'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Video className="w-5 h-5 cursor-pointer" style={{ color: WA.textSecond }} />
                        <Phone className="w-5 h-5 cursor-pointer" style={{ color: WA.textSecond }} />
                        <button
                            onClick={() => setShowDebug((v) => !v)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-opacity hover:opacity-80"
                            style={{ backgroundColor: showDebug ? WA.green : WA.searchBg, color: showDebug ? '#fff' : WA.textSecond }}
                        >
                            <ChevronRight className={`w-4 h-4 transition-transform ${showDebug ? 'rotate-180' : ''}`} />
                            Debug
                        </button>
                        <MoreVertical className="w-5 h-5 cursor-pointer" style={{ color: WA.textSecond }} />
                    </div>
                </div>

                {/* User ID bar */}
                <div className="flex items-center gap-2 px-4 py-1.5 flex-shrink-0" style={{ backgroundColor: WA.chatBg, borderBottom: `1px solid ${WA.border}` }}>
                    <span className="text-xs font-medium flex-shrink-0" style={{ color: WA.textSecond }}>User ID :</span>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="flex-1 text-xs border rounded px-2 py-1 font-mono focus:outline-none"
                        style={{ backgroundColor: WA.searchBg, borderColor: WA.border, color: WA.textPrimary }}
                    />
                </div>

                {/* Messages area — WA background */}
                <div
                    className="flex-1 overflow-y-auto px-6 py-4"
                    style={{
                        backgroundColor: WA.chatBg,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23ffffff' fill-opacity='0.01'/%3E%3C/svg%3E")`,
                    }}
                >
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} msg={msg} isClient={msg.sender === 'client'} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>

                {/* Image preview bar — shown when a file is selected */}
                {imagePreview && (
                    <div className="flex items-center gap-3 px-4 py-2 flex-shrink-0" style={{ backgroundColor: WA.inputBg, borderTop: `1px solid ${WA.border}` }}>
                        <div className="relative flex-shrink-0">
                            <img src={imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-lg" />
                            <button
                                onClick={() => clearImage()}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: WA.recvBubble, border: `2px solid ${WA.inputBg}` }}
                            >
                                <X className="w-2.5 h-2.5" style={{ color: WA.textPrimary }} />
                            </button>
                        </div>
                        <p className="text-xs" style={{ color: WA.textSecond }}>Image prête à envoyer</p>
                    </div>
                )}

                {/* Input bar */}
                <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ backgroundColor: WA.inputBar }}>
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                    {/* Paperclip button triggers file picker */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-shrink-0 transition-opacity hover:opacity-70"
                    >
                        <Paperclip className="w-5 h-5" style={{ color: imageFile ? WA.green : WA.textSecond }} />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={imageFile ? 'Ajouter un message (optionnel)...' : 'Tapez un message'}
                        disabled={isLoading}
                        className="flex-1 text-sm rounded-lg px-4 py-2.5 border-0 focus:outline-none disabled:opacity-50"
                        style={{ backgroundColor: WA.inputBg, color: WA.textPrimary }}
                    />
                    <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={isLoading || (!input.trim() && !imageFile)}
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-opacity disabled:opacity-40 hover:opacity-80"
                        style={{ backgroundColor: WA.green }}
                    >
                        {isLoading
                            ? <Loader className="w-5 h-5 text-white animate-spin" />
                            : <Send className="w-5 h-5 text-white" />
                        }
                    </button>
                </div>
            </main>

            {/* ── RIGHT PANEL: Debug ── */}
            {showDebug && (
                <DebugPanel debug={lastDebug} onClose={() => setShowDebug(false)} />
            )}
        </div>
    );
};

export default TestMetaSender;
