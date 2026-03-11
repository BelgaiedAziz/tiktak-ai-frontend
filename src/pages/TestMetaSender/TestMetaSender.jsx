import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader, Search, ArrowRight, ChevronRight, ChevronLeft, X, MoreVertical, Phone, Video } from 'lucide-react';
import { sendPocMessage } from '../../api/metaApi';

const PAGE_NAME = 'Iconic Store';
const SHOP_ID = '1LXybpj';
const PAGE_AVATAR = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=150&q=80';

// Messenger color palette
const WA = {
    headerBg: '#FFFFFF',
    sidebarBg: '#FFFFFF',
    sidebarItem: '#F0F2F5',
    chatBg: '#FFFFFF',
    sentBubble: '#0084FF',
    recvBubble: '#F0F2F5',
    inputBg: '#F0F2F5',
    inputBar: '#FFFFFF',
    green: '#0084FF',
    greenLight: '#0084FF',
    textPrimary: '#050505',
    textSecond: '#65676B',
    border: '#E4E6EB',
    searchBg: '#F0F2F5',
};

// Rename palette to M for Messenger
const M = WA;

const STATE_META = {
    NEW_CONVERSATION:       { label: 'NEW',            color: 'bg-gray-100 text-gray-600'     },
    WAITING_USER_REPLY:     { label: 'WAITING REPLY',  color: 'bg-yellow-100 text-yellow-700' },
    WAITING_DISAMBIGUATION: { label: 'DISAMBIGUATION', color: 'bg-orange-100 text-orange-700' },
    COMPLETED:              { label: 'COMPLETED',      color: 'bg-green-100 text-green-700'   },
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
        <aside className="w-[300px] flex-shrink-0 flex flex-col overflow-hidden"
            style={{ backgroundColor: WA.sidebarBg, borderLeft: `1px solid ${WA.border}` }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${WA.border}` }}>
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
                    <span className="px-2.5 py-1 rounded-md font-semibold bg-purple-100 text-purple-700">
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
                                    <span style={{ color: '#0084FF' }}>{k}:</span> {v}
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
                                <span key={e} className="px-2 py-1 rounded-md font-medium bg-red-100 text-red-700 border border-red-200">{e}</span>
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
        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all"
        style={{ backgroundColor: isSelected ? WA.sidebarItem : 'transparent' }}
        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = WA.sidebarItem; }}
        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
        <div className="relative flex-shrink-0">
            <img src={PAGE_AVATAR} alt={PAGE_NAME} className="w-12 h-12 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: '#31A24C' }} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold truncate" style={{ color: WA.textPrimary }}>{PAGE_NAME}</p>
                <span className="text-[11px]" style={{ color: WA.textSecond }}>Test</span>
            </div>
            <p className="text-xs truncate mt-0.5 font-medium" style={{ color: '#0084FF' }}>Test API Meta</p>
        </div>
    </button>
);

/* ─────────────────────────── Message Bubble ─────────────────────── */
const MessageBubble = ({ msg, isClient }) => (
    <div className={`flex w-full mb-1 items-end gap-2 ${isClient ? 'justify-end' : 'justify-start'}`}>
        {!isClient && (
            <img src={PAGE_AVATAR} alt="bot" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1" />
        )}
        <div
            className="relative max-w-[65%] px-3 py-2"
            style={{
                backgroundColor: isClient ? WA.sentBubble : WA.recvBubble,
                borderRadius: isClient ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            }}
        >
            {msg.type === 'text' && (
                <p className="text-sm leading-snug" style={{ color: isClient ? '#FFFFFF' : WA.textPrimary }}>{msg.content}</p>
            )}
            {msg.type === 'image' && (
                <img src={msg.content} alt="Shared" className="max-w-full h-auto rounded-2xl max-h-64" />
            )}
            {msg.identifiedImageUrl && (
                <div className="mt-2 pt-2" style={{ borderTop: `1px solid rgba(0,0,0,0.08)` }}>
                    <p className="text-[10px] mb-1" style={{ color: isClient ? 'rgba(255,255,255,0.7)' : WA.textSecond }}>Produit identifié :</p>
                    <img src={msg.identifiedImageUrl} alt="Identified" className="max-w-full h-auto rounded-xl max-h-32" />
                </div>
            )}
            <span className="block text-right text-[10px] mt-0.5"
                style={{ color: isClient ? 'rgba(255,255,255,0.65)' : WA.textSecond }}>
                {msg.time}
            </span>
        </div>
    </div>
);

/* ─────────────────────────── Typing Indicator ─────────────────────── */
const TypingIndicator = () => (
    <div className="flex justify-start items-end gap-2 mb-2">
        <img src={PAGE_AVATAR} alt="bot" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
        <div className="px-4 py-3" style={{ backgroundColor: WA.recvBubble, borderRadius: '18px 18px 18px 4px' }}>
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
        <div className="flex h-screen w-full overflow-hidden bg-white">

            {/* ── LEFT PANEL ── */}
            <aside className="w-[320px] flex-shrink-0 flex flex-col" style={{ borderRight: `1px solid ${WA.border}` }}>

                {/* Messenger gradient title */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <span className="text-2xl font-bold" style={{
                        background: 'linear-gradient(135deg, #0084FF 0%, #A855F7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>Messenger</span>
                    <button className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: WA.sidebarItem }}>
                        <MoreVertical className="w-4 h-4" style={{ color: WA.textPrimary }} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full" style={{ backgroundColor: WA.searchBg }}>
                        <Search className="w-4 h-4 flex-shrink-0" style={{ color: WA.textSecond }} />
                        <input
                            type="text"
                            placeholder="Rechercher dans Messenger"
                            className="flex-1 text-sm bg-transparent border-0 focus:outline-none"
                            style={{ color: WA.textPrimary }}
                        />
                    </div>
                </div>

                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto px-2 pt-1">
                    <p className="text-[11px] font-semibold px-2 pb-1" style={{ color: WA.textSecond }}>Récents</p>
                    <ConversationItem isSelected={true} onClick={() => { }} />
                </div>
            </aside>

            {/* ── CENTER: Chat ── */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* Chat header */}
                <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
                    style={{ borderBottom: `1px solid ${WA.border}` }}>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={PAGE_AVATAR} alt={PAGE_NAME} className="w-10 h-10 rounded-full object-cover" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                                style={{ backgroundColor: '#31A24C' }} />
                        </div>
                        <div>
                            <p className="font-semibold text-sm" style={{ color: WA.textPrimary }}>{PAGE_NAME}</p>
                            <p className="text-xs font-medium" style={{ color: isLoading ? '#0084FF' : '#31A24C' }}>
                                {isLoading ? 'En train d\'écrire...' : 'Actif maintenant'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: WA.sidebarItem }}>
                            <Phone className="w-4 h-4" style={{ color: '#0084FF' }} />
                        </button>
                        <button className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: WA.sidebarItem }}>
                            <Video className="w-4 h-4" style={{ color: '#0084FF' }} />
                        </button>
                        <button
                            onClick={() => setShowDebug((v) => !v)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ml-1 transition-all"
                            style={{
                                background: showDebug
                                    ? 'linear-gradient(135deg, #0084FF, #A855F7)'
                                    : WA.sidebarItem,
                                color: showDebug ? '#fff' : WA.textSecond,
                            }}
                        >
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showDebug ? 'rotate-180' : ''}`} />
                            Debug
                        </button>
                    </div>
                </div>

                {/* User ID bar */}
                <div className="flex items-center gap-2 px-4 py-1.5 flex-shrink-0"
                    style={{ backgroundColor: WA.sidebarItem, borderBottom: `1px solid ${WA.border}` }}>
                    <span className="text-xs font-medium flex-shrink-0" style={{ color: WA.textSecond }}>User ID :</span>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="flex-1 text-xs border rounded-lg px-2 py-1 font-mono focus:outline-none"
                        style={{ backgroundColor: WA.chatBg, borderColor: WA.border, color: WA.textPrimary }}
                    />
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: WA.chatBg }}>
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} msg={msg} isClient={msg.sender === 'client'} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>

                {/* Image preview bar */}
                {imagePreview && (
                    <div className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
                        style={{ backgroundColor: WA.sidebarItem, borderTop: `1px solid ${WA.border}` }}>
                        <div className="relative flex-shrink-0">
                            <img src={imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-xl" />
                            <button
                                onClick={() => clearImage()}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow"
                                style={{ backgroundColor: '#fff', border: `1px solid ${WA.border}` }}
                            >
                                <X className="w-2.5 h-2.5" style={{ color: WA.textPrimary }} />
                            </button>
                        </div>
                        <p className="text-xs" style={{ color: WA.textSecond }}>Image prête à envoyer</p>
                    </div>
                )}

                {/* Input bar */}
                <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
                    style={{ borderTop: `1px solid ${WA.border}` }}>
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: imageFile ? '#E7F3FF' : WA.sidebarItem }}
                    >
                        <Paperclip className="w-4 h-4" style={{ color: imageFile ? '#0084FF' : WA.textSecond }} />
                    </button>
                    <div className="flex-1 flex items-center rounded-full px-4 py-2" style={{ backgroundColor: WA.inputBg }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={imageFile ? 'Ajouter un message...' : 'Aa'}
                            disabled={isLoading}
                            className="flex-1 text-sm bg-transparent border-0 focus:outline-none disabled:opacity-50"
                            style={{ color: WA.textPrimary }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={isLoading || (!input.trim() && !imageFile)}
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg, #0084FF, #A855F7)' }}
                    >
                        {isLoading
                            ? <Loader className="w-4 h-4 text-white animate-spin" />
                            : <Send className="w-4 h-4 text-white" />
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
