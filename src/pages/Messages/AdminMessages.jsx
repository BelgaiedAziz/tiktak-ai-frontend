import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, MessageSquare, Loader, RefreshCw,
  User, Package, Phone, MapPin, Hash, AlertCircle, Send
} from 'lucide-react';
import { fetchConversations, fetchMessages, sendMessage } from '../../api/crmApi';

/* ─── State badge ─────────────────────────────────────────────────── */
const STATE_CONFIG = {
  NEW_CONVERSATION:       { label: 'Nouveau',        cls: 'bg-gray-100 text-gray-600' },
  WAITING_USER_REPLY:     { label: 'En attente',      cls: 'bg-yellow-100 text-yellow-700' },
  WAITING_DISAMBIGUATION: { label: 'Disambiguation',  cls: 'bg-orange-100 text-orange-700' },
  COMPLETED:              { label: 'Terminé',         cls: 'bg-green-100 text-green-700' },
};

const StateBadge = ({ state }) => {
  const cfg = STATE_CONFIG[state] || { label: state, cls: 'bg-gray-100 text-gray-500' };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
};

/* ─── Platform icons ──────────────────────────────────────────────── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#25D366"/>
    <path d="M16 7.5C11.31 7.5 7.5 11.31 7.5 16c0 1.5.4 2.9 1.1 4.1L7.5 24.5l4.5-1.08A8.45 8.45 0 0016 24.5c4.69 0 8.5-3.81 8.5-8.5S20.69 7.5 16 7.5zm4.6 11.9c-.2.55-1.14 1.06-1.56 1.1-.42.04-.43.32-2.7-.62-2.68-1.1-4.38-3.85-4.51-4.03-.13-.18-1.08-1.44-1.08-2.74s.68-1.94.92-2.2c.24-.27.53-.33.7-.33l.5.01c.17 0 .38-.06.6.46.22.52.74 1.82.81 1.95.07.13.11.28.02.45-.09.17-.14.27-.27.42-.13.15-.27.33-.39.45-.12.12-.25.25-.11.49.15.24.65 1.06 1.39 1.71.95.84 1.75 1.1 2 1.22.25.12.4.1.55-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.13z" fill="white"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#ig-grad)"/>
    <rect x="9" y="9" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="16" r="3.5" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="21" cy="11" r="1" fill="white"/>
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ms-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0099FF"/>
        <stop offset="100%" stopColor="#A033FF"/>
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#ms-grad)"/>
    <path d="M16 7C11.03 7 7 10.8 7 15.5c0 2.6 1.3 4.94 3.36 6.53V25l3.02-1.66A9.3 9.3 0 0016 24c4.97 0 9-3.8 9-8.5S20.97 7 16 7zm.9 11.44l-2.3-2.44-4.47 2.44 4.93-5.22 2.35 2.44 4.42-2.44-4.93 5.22z" fill="white"/>
  </svg>
);

const PLATFORM_ICON = {
  whatsapp:   <WhatsAppIcon />,
  instagram:  <InstagramIcon />,
  messenger:  <MessengerIcon />,
  facebook:   <MessengerIcon />,
};

const PlatformBadge = ({ platform }) => {
  if (!platform) return null;
  const key = platform.toLowerCase();
  const icon = PLATFORM_ICON[key];
  if (!icon) return null;
  return (
    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ring-2 ring-white">
      {icon}
    </span>
  );
};

/* ─── Conversation list item ──────────────────────────────────────── */
const ConvItem = ({ conv, isSelected, onClick }) => {
  const lead = conv.lead_details;
  const name = lead?.name || lead?.platform_id || `#${conv.id}`;
  const date = new Date(conv.updated_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const platform = conv.platform || conv.channel || lead?.channel || lead?.platform || null;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-gray-50 border-b border-gray-100
        ${isSelected ? 'bg-[#eef6f9] border-l-4 border-l-[#0f6885]' : 'border-l-4 border-l-transparent'}`}
    >
      <div className="relative w-11 h-11 flex-shrink-0">
        <div className="w-11 h-11 rounded-full bg-[#0f6885]/10 flex items-center justify-center">
          <User className="w-5 h-5 text-[#0f6885]" />
        </div>
        <PlatformBadge platform={platform} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm font-semibold truncate ${isSelected ? 'text-[#0f6885]' : 'text-gray-800'}`}>
            {name}
          </span>
          <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">{date}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-gray-500 truncate">{conv.shop_id}</p>
          <StateBadge state={conv.state} />
        </div>
      </div>
    </button>
  );
};

/* ─── Intent colour map ───────────────────────────────────────────── */
const INTENT_COLOURS = {
  // Orders
  order_status:        { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500'    },
  place_order:         { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500'    },
  cancel_order:        { bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500'     },
  track_order:         { bg: 'bg-indigo-100',  text: 'text-indigo-700',  dot: 'bg-indigo-500'  },
  // Products
  product_inquiry:     { bg: 'bg-violet-100',  text: 'text-violet-700',  dot: 'bg-violet-500'  },
  product_info:        { bg: 'bg-violet-100',  text: 'text-violet-700',  dot: 'bg-violet-500'  },
  availability:        { bg: 'bg-purple-100',  text: 'text-purple-700',  dot: 'bg-purple-500'  },
  price_inquiry:       { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', dot: 'bg-fuchsia-500' },
  // Support
  complaint:           { bg: 'bg-red-100',     text: 'text-red-700',     dot: 'bg-red-500'     },
  return_request:      { bg: 'bg-orange-100',  text: 'text-orange-700',  dot: 'bg-orange-500'  },
  refund_request:      { bg: 'bg-orange-100',  text: 'text-orange-700',  dot: 'bg-orange-500'  },
  delivery_issue:      { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500'   },
  // General
  greeting:            { bg: 'bg-green-100',   text: 'text-green-700',   dot: 'bg-green-500'   },
  goodbye:             { bg: 'bg-green-100',   text: 'text-green-700',   dot: 'bg-green-500'   },
  human_handoff:       { bg: 'bg-rose-100',    text: 'text-rose-700',    dot: 'bg-rose-500'    },
  escalate:            { bg: 'bg-rose-100',    text: 'text-rose-700',    dot: 'bg-rose-500'    },
  payment:             { bg: 'bg-teal-100',    text: 'text-teal-700',    dot: 'bg-teal-500'    },
  shipping_info:       { bg: 'bg-cyan-100',    text: 'text-cyan-700',    dot: 'bg-cyan-500'    },
  promotion:           { bg: 'bg-yellow-100',  text: 'text-yellow-700',  dot: 'bg-yellow-500'  },
  feedback:            { bg: 'bg-sky-100',     text: 'text-sky-700',     dot: 'bg-sky-500'     },
  faq:                 { bg: 'bg-slate-100',   text: 'text-slate-700',   dot: 'bg-slate-500'   },
};
const DEFAULT_INTENT_COLOUR = { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };

const IntentPill = ({ intent, isBot }) => {
  if (!intent) return null;
  const key = intent.toLowerCase().replace(/[\s-]/g, '_');
  const c = INTENT_COLOURS[key] || DEFAULT_INTENT_COLOUR;
  const label = intent.replace(/_/g, ' ');
  if (isBot) {
    return (
      <span className="text-[10px] font-medium text-white/70">{label}</span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {label}
    </span>
  );
};

/* ─── Message bubble ──────────────────────────────────────────────── */
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?$/i;

// Deduplicate repeated text within a single message (handles \n or \n\n separator)
const dedupeText = (text) => {
  if (!text) return text;
  const t = text.trim();
  // Try \n\n separator
  const parts2 = t.split(/\n\n+/);
  if (parts2.length === 2 && parts2[0].trim() === parts2[1].trim()) return parts2[0].trim();
  // Try \n separator (even number of lines, first half === second half)
  const parts1 = t.split('\n');
  const mid = Math.floor(parts1.length / 2);
  if (parts1.length >= 2 && parts1.length % 2 === 0) {
    const first  = parts1.slice(0, mid).join('\n').trim();
    const second = parts1.slice(mid).join('\n').trim();
    if (first === second) return first;
  }
  return text;
};

// Deduplicate consecutive identical messages from the same sender
const dedupeMsgs = (msgs) =>
  msgs.filter((msg, i) => {
    if (i === 0) return true;
    const prev = msgs[i - 1];
    return !(
      prev.sender === msg.sender &&
      (prev.text || '').trim() === (msg.text || '').trim()
    );
  });

// Returns true when the text is a backend image placeholder with no real URL (e.g. "[Image: None]")
const isImagePlaceholder = (text) =>
  !!text && /^\[image:\s*none\s*\]/i.test(text.trim());

// Extract a real URL from "[Image: https://...]" — safe for long URLs
const parseImageTag = (text) => {
  if (!text) return null;
  if (!/^\[image:/i.test(text.trimStart())) return null;
  const colonIdx = text.indexOf(':');
  if (colonIdx === -1) return null;
  let srcStart = colonIdx + 1;
  while (srcStart < text.length && text[srcStart] === ' ') srcStart++;
  const closingIdx = text.indexOf(']', srcStart);
  const src = closingIdx !== -1
    ? text.slice(srcStart, closingIdx).trim()
    : text.slice(srcStart).trim();
  return /^https?:\/\//i.test(src) ? src : null;
};

const MsgBubble = ({ msg }) => {
  const isBot = msg.sender === 'BOT' || msg.sender === 'AGENT';
  const time  = new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  // Deduplicate repeated text from backend
  const rawText = dedupeText(msg.text);

  const imageUrl =
    parseImageTag(rawText) ||
    msg.identified_image_url || msg.image_url || msg.media_url || msg.attachment_url || msg.image ||
    (rawText && IMAGE_EXT.test(rawText) ? rawText : null);

  const isPlaceholder = isImagePlaceholder(rawText);
  // Don't render the raw "[Image: ...]" tag as text
  const hasText = rawText && !isPlaceholder && !imageUrl && !IMAGE_EXT.test(rawText);

  return (
    <div className={`flex flex-col w-full mb-3 ${isBot ? 'items-end' : 'items-start'}`}>
      <div className={`max-w-[60%] rounded-2xl overflow-hidden ${
        isBot
          ? 'bg-[#0f6885] text-white rounded-br-none'
          : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
      }`}>

        {/* Real image */}
        {imageUrl && (
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt="media"
              className="w-full max-h-64 object-cover block"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </a>
        )}

        {/* Image placeholder (backend processed image but URL not stored) */}
        {isPlaceholder && !imageUrl && (
          <div className={`flex items-center gap-2 px-4 py-3 ${
            isBot ? 'text-white/70' : 'text-gray-400'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
            </svg>
            <span className="text-sm italic">Image</span>
          </div>
        )}

        {/* Text + meta */}
        <div className="px-4 py-2.5">
          {hasText && <p className="text-sm leading-snug whitespace-pre-wrap">{rawText}</p>}
          <div className="flex items-center justify-between gap-2 mt-1.5">
            {msg.extracted_intent
              ? <IntentPill intent={msg.extracted_intent} isBot={isBot} />
              : <span />}
            <span className={`text-[11px] flex-shrink-0 ${isBot ? 'text-white/60' : 'text-gray-400'}`}>{time}</span>
          </div>
          {/* Entities */}
          {msg.extracted_entities && Object.keys(msg.extracted_entities).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-white/20">
              {Object.entries(msg.extracted_entities).map(([k, v]) => (
                <span key={k} className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isBot ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {k}: {v}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

/* ─── Lead detail card ────────────────────────────────────────────── */
const LeadCard = ({ lead }) => {
  if (!lead) return null;
  const fields = [
    { icon: <User className="w-3.5 h-3.5" />,    label: 'Nom',       value: lead.name },
    { icon: <Phone className="w-3.5 h-3.5" />,   label: 'Téléphone', value: lead.phone_number },
    { icon: <Package className="w-3.5 h-3.5" />, label: 'Produit',   value: lead.product_id },
    { icon: <Hash className="w-3.5 h-3.5" />,    label: 'Couleur',   value: lead.color },
    { icon: <Hash className="w-3.5 h-3.5" />,    label: 'Taille',    value: lead.size },
    { icon: <Hash className="w-3.5 h-3.5" />,    label: 'Quantité',  value: lead.quantity },
    { icon: <MapPin className="w-3.5 h-3.5" />,  label: 'Adresse',   value: lead.address },
  ].filter((f) => f.value !== null && f.value !== undefined && f.value !== '');

  return (
    <div className="px-5 py-4 border-b border-gray-100 bg-[#fafafa]">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Détails du lead</p>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-1.5 text-xs">
            <span className="text-[#0f6885]">{f.icon}</span>
            <span className="text-gray-500">{f.label} :</span>
            <span className="text-gray-800 font-medium">{String(f.value)}</span>
          </div>
        ))}
        {lead.agent_confirmation_pending && (
          <div className="flex items-center gap-1.5 text-xs text-orange-600">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="font-medium">Confirmation agent en attente</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main page ───────────────────────────────────────────────────── */
const AdminMessages = () => {
  const SHOP_ID = '1LXybpj';

  const [conversations, setConversations] = useState([]);
  const [convsLoading, setConvsLoading]   = useState(true);
  const [convsError, setConvsError]       = useState(null);

  const [selected, setSelected]           = useState(null);
  const [messages, setMessages]           = useState([]);
  const [msgsLoading, setMsgsLoading]     = useState(false);
  const [msgsError, setMsgsError]         = useState(null);

  const [search, setSearch]   = useState('');
  const [draft, setDraft]       = useState('');
  const [sending, setSending]   = useState(false);
  const messagesEndRef          = useRef(null);
  const inputRef                = useRef(null);

  /* ── Load conversations ── */
  const loadConversations = useCallback(async () => {
    setConvsLoading(true);
    setConvsError(null);
    try {
      const { data } = await fetchConversations(SHOP_ID);
      setConversations(data.results ?? data);
    } catch (err) {
      setConvsError(err?.response?.data?.detail ?? err.message);
    } finally {
      setConvsLoading(false);
    }
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  /* ── Load messages for selected conversation ── */
  const loadMessages = useCallback(async (convId) => {
    setMsgsLoading(true);
    setMsgsError(null);
    setMessages([]);
    try {
      const { data } = await fetchMessages(convId);
      const raw = data.results ?? data;
      // eslint-disable-next-line no-console
      if (process.env.NODE_ENV === 'development') console.log('[messages raw]', raw.slice(0, 3));
      setMessages(dedupeMsgs(raw));
    } catch (err) {
      setMsgsError(err?.response?.data?.detail ?? err.message);
    } finally {
      setMsgsLoading(false);
    }
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
      extracted_intent: null,
      extracted_entities: {},
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft('');
    try {
      await sendMessage(selected.id, text);
      loadMessages(selected.id);
    } catch (_) {
      // keep optimistic message visible, user can retry
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
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
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      c.shop_id?.toLowerCase().includes(search.toLowerCase()) ||
      String(c.id).includes(search)
    );
  });

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#fafafa]">

      {/* ── Left panel ── */}
      <aside className="w-[340px] min-h-0 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">

        {/* Header */}
        <div className="px-5 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#0f6885]" />
              <h1 className="text-lg font-bold text-gray-800">Messages</h1>
              {!convsLoading && (
                <span className="bg-[#0f6885] text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {conversations.length}
                </span>
              )}
            </div>
            <button
              onClick={loadConversations}
              disabled={convsLoading}
              className="p-2 text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9] rounded-lg transition-colors disabled:opacity-40"
              title="Rafraîchir"
            >
              <RefreshCw className={`w-4 h-4 ${convsLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un client..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f6885]/30 focus:border-[#0f6885] text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {convsLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <Loader className="w-8 h-8 animate-spin text-[#0f6885]" />
              <p className="text-sm">Chargement...</p>
            </div>
          ) : convsError ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-sm text-red-500 font-medium">Erreur de connexion</p>
              <p className="text-xs text-gray-400">{convsError}</p>
              <button
                onClick={loadConversations}
                className="mt-2 px-4 py-2 bg-[#0f6885] text-white text-sm rounded-lg hover:bg-[#0c5973] transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <MessageSquare className="w-10 h-10 opacity-30" />
              <p className="text-sm">Aucune conversation trouvée</p>
            </div>
          ) : (
            filtered.map((conv) => (
              <ConvItem
                key={conv.id}
                conv={conv}
                isSelected={selected?.id === conv.id}
                onClick={() => handleSelect(conv)}
              />
            ))
          )}
        </div>
      </aside>

      {/* ── Right panel ── */}
      {selected ? (
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0f6885]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#0f6885]" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {selected.lead_details?.name || selected.lead_details?.platform_id || `Conversation #${selected.id}`}
                </p>
                <p className="text-xs text-gray-400">
                  {selected.lead_details?.platform_id}
                </p>
              </div>
              <StateBadge state={selected.state} />
            </div>
            <button
              onClick={() => loadMessages(selected.id)}
              disabled={msgsLoading}
              className="p-2 text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9] rounded-lg transition-colors disabled:opacity-40"
              title="Rafraîchir les messages"
            >
              <RefreshCw className={`w-4 h-4 ${msgsLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Lead details bar */}
          <LeadCard lead={selected.lead_details} />

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 bg-[#f0f2f5]">
            {msgsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                <Loader className="w-8 h-8 animate-spin text-[#0f6885]" />
                <p className="text-sm">Chargement des messages...</p>
              </div>
            ) : msgsError ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                <AlertCircle className="w-10 h-10 text-red-400" />
                <p className="text-sm text-red-500 font-medium">Erreur</p>
                <p className="text-xs text-gray-400">{msgsError}</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
                <MessageSquare className="w-10 h-10 opacity-30" />
                <p className="text-sm">Aucun message</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MsgBubble key={msg.id} msg={msg} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* ── Send bar ── */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 px-5 py-3">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Écrire un message… (Entrée pour envoyer)"
                className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f6885]/30 focus:border-[#0f6885] transition-colors max-h-32 overflow-y-auto"
                style={{ lineHeight: '1.5' }}
              />
              <button
                onClick={handleSend}
                disabled={!draft.trim() || sending}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0f6885] text-white hover:bg-[#0c5973] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0 shadow-sm"
              >
                {sending
                  ? <Loader className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 ml-1">Shift+Entrée pour saut de ligne</p>
          </div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
          <div className="w-20 h-20 rounded-full bg-[#eef6f9] flex items-center justify-center">
            <MessageSquare className="w-9 h-9 text-[#0f6885] opacity-60" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-600">Sélectionnez une conversation</p>
            <p className="text-sm mt-1 text-gray-400">Choisissez une conversation dans la liste pour voir les messages.</p>
          </div>
        </main>
      )}
    </div>
  );
};

export default AdminMessages;
