import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, RefreshCw, Loader, Trash2, Edit3, X, Save,
  ChevronLeft, ChevronRight, User, Package, Phone,
  MapPin, Hash, CheckCircle, Clock, AlertCircle,
  Users, SearchX, WifiOff, ShoppingBag, Tag
} from 'lucide-react';
import { fetchLeads, updateLead, deleteLead } from '../../api/leadsApi';

const SHOP_ID = '1LXybpj';

/* ─── Platform badge ─────────────────────────────────────────────── */
const PlatformBadge = ({ platformId }) => {
  if (!platformId) return null;
  const lower = platformId.toLowerCase();
  if (lower.startsWith('whatsapp')) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <svg viewBox="0 0 16 16" className="w-3 h-3 fill-green-600" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1C4.14 1 1 4.14 1 8c0 1.23.33 2.38.9 3.37L1 15l3.74-.87A7 7 0 1 0 8 1zm3.68 9.8c-.16.44-.93.86-1.28.9-.34.03-.35.26-2.2-.51C5.88 10.3 4.5 8 4.39 7.86c-.1-.14-.88-1.17-.88-2.23s.55-1.58.75-1.79c.2-.22.43-.27.57-.27h.41c.14 0 .31-.05.49.37.18.43.6 1.49.66 1.59.06.1.09.23.02.37-.07.14-.11.22-.22.34-.1.12-.22.27-.31.37-.1.1-.2.2-.09.4.12.2.53.87 1.13 1.4.77.68 1.42.89 1.63 1 .2.1.32.08.44-.05.11-.13.49-.57.62-.77.13-.2.26-.16.44-.1.18.06 1.14.54 1.34.64.2.1.32.15.37.23.05.08.05.47-.11.92z"/>
        </svg>
        WhatsApp
      </span>
    );
  }
  if (lower.startsWith('instagram')) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
        Instagram
      </span>
    );
  }
  if (lower.startsWith('messenger') || lower.startsWith('facebook')) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
        Messenger
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
      {platformId.split(':')[0]}
    </span>
  );
};

/* ─── Edit modal ─────────────────────────────────────────────────── */
const EditModal = ({ lead, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name:         lead.name         || '',
    phone_number: lead.phone_number || '',
    address:      lead.address      || '',
    color:        lead.color        || '',
    size:         lead.size         || '',
    quantity:     lead.quantity     || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState(null);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const { data } = await updateLead(lead.id, form);
      onSaved(data);
    } catch (e) {
      setError('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: 'name',         label: 'Nom',          icon: User,    type: 'text'   },
    { name: 'phone_number', label: 'Téléphone',     icon: Phone,   type: 'text'   },
    { name: 'address',      label: 'Adresse',       icon: MapPin,  type: 'text'   },
    { name: 'color',        label: 'Couleur',       icon: Package, type: 'text'   },
    { name: 'size',         label: 'Taille',        icon: Hash,    type: 'text'   },
    { name: 'quantity',     label: 'Quantité',      icon: Hash,    type: 'number' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Modifier le lead</h2>
            <p className="text-xs text-gray-400 mt-0.5">{lead.platform_id}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-4 space-y-3">
          {fields.map(({ name, label, icon: Icon, type }) => (
            <div key={name}>
              <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#0f6885] transition-colors">
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handle}
                  className="flex-1 text-sm text-gray-800 bg-transparent border-0 focus:outline-none"
                />
              </div>
            </div>
          ))}
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0f6885] hover:bg-[#0d5a72] rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Delete confirm modal ───────────────────────────────────────── */
const DeleteModal = ({ lead, onClose, onConfirm, deleting }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && !deleting) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, deleting]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget && !deleting) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Icon */}
        <div className="flex flex-col items-center px-6 pt-8 pb-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-1">Supprimer ce lead&nbsp;?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Vous êtes sur le point de supprimer&nbsp;
            <span className="font-semibold text-gray-700">{lead.name || `#${lead.id}`}</span>.
            Cette action est irréversible.
          </p>
          {/* Lead card preview */}
          <div className="mt-4 w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-700 truncate">{lead.name || '—'}</p>
              <p className="text-[11px] text-gray-400 truncate">{lead.platform_id}</p>
            </div>
            <PlatformBadge platformId={lead.platform_id} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-50"
          >
            {deleting
              ? <Loader className="w-4 h-4 animate-spin" />
              : <Trash2 className="w-4 h-4" />}
            {deleting ? 'Suppression…' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main page ──────────────────────────────────────────────────── */
const Leads = () => {
  const [leads,   setLeads]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [search,  setSearch]  = useState('');
  const [page,    setPage]    = useState(1);
  const [total,   setTotal]   = useState(0);
  const [editing,  setEditing]  = useState(null);
  const [toDelete,  setToDelete] = useState(null);
  const [deleting,  setDeleting] = useState(false);

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchLeads(SHOP_ID, p > 1 ? p : undefined);
      setLeads(data.results || data);
      setTotal(data.count || (data.results || data).length);
    } catch {
      setError('Impossible de charger les leads.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const handleSaved = (updated) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteLead(toDelete.id);
      setLeads((prev) => prev.filter((l) => l.id !== toDelete.id));
      setTotal((t) => t - 1);
      setToDelete(null);
    } catch {
      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      !q ||
      l.name?.toLowerCase().includes(q) ||
      l.platform_id?.toLowerCase().includes(q) ||
      l.phone_number?.includes(q) ||
      l.address?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">

      {/* ── Header bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-base font-bold text-gray-800">Leads</h1>
          <p className="text-xs text-gray-400">
            {total} prospect{total !== 1 ? 's' : ''} au total
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-60">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom, téléphone, adresse…"
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 border-0 focus:outline-none w-full"
            />
          </div>
          {/* Refresh */}
          <button
            onClick={() => load(page)}
            className="p-2 text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9] rounded-xl transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        {error ? (
          /* ── Error state ── */
          <div className="flex flex-col items-center justify-center h-full gap-5 px-6 py-16">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
              <WifiOff className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-1">Impossible de charger les leads</p>
              <p className="text-xs text-gray-400 max-w-xs">{error}</p>
            </div>
            <button
              onClick={() => load(page)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0f6885] hover:bg-[#0d5a72] rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </button>
          </div>
        ) : loading && leads.length === 0 ? (
          /* ── Skeleton loader ── */
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
              <tr>
                {['Prospect', 'Plateforme', 'Contact', 'Commande', 'Produit', 'Statut', ''].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 7 }).map((_, i) => (
                <tr key={i} className="bg-white">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-2.5 w-10 bg-gray-100 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" /></td>
                  <td className="px-4 py-3">
                    <div className="space-y-1.5">
                      <div className="h-3 w-28 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-2.5 w-20 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="h-3 w-32 bg-gray-200 rounded-full animate-pulse" /></td>
                  <td className="px-4 py-3">
                    <div className="space-y-1.5">
                      <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-2.5 w-12 bg-gray-100 rounded-full animate-pulse" />
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="h-5 w-24 bg-gray-200 rounded-full animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-7 w-16 bg-gray-100 rounded-lg animate-pulse" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : leads.length === 0 ? (
          /* ── Empty state — no data at all ── */
          <div className="flex flex-col items-center justify-center h-full gap-5 px-6 py-16">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-[#eef6f9] flex items-center justify-center">
                <Users className="w-10 h-10 text-[#0f6885]/40" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-white">
                <span className="text-sm">0</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-1">Aucun lead pour le moment</p>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Les prospects détectés par le bot apparaîtront ici dès qu'une conversation démarrera.
              </p>
            </div>
            <button
              onClick={() => load(1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0f6885] bg-[#eef6f9] hover:bg-[#dceef5] rounded-xl transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Actualiser
            </button>
          </div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
              <tr>
                {['Prospect', 'Plateforme', 'Contact', 'Commande', 'Produit', 'Statut', ''].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center gap-4 py-16">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <SearchX className="w-7 h-7 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-600 mb-1">Aucun résultat pour « {search} »</p>
                        <p className="text-xs text-gray-400">Essayez un autre nom, téléphone ou adresse.</p>
                      </div>
                      <button
                        onClick={() => setSearch('')}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Effacer la recherche
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((lead) => (
                <tr key={lead.id} className="bg-white hover:bg-gray-50 transition-colors group">

                  {/* Prospect name + ID */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0f6885]/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-[#0f6885]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 leading-tight">{lead.name || '—'}</p>
                        <p className="text-[11px] text-gray-400">#{lead.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="px-4 py-3">
                    <PlatformBadge platformId={lead.platform_id} />
                    <p className="text-[10px] text-gray-400 mt-1 max-w-[140px] truncate">
                      {lead.platform_id?.split(':')[1] || lead.platform_id}
                    </p>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      {lead.phone_number && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {lead.phone_number}
                        </div>
                      )}
                      {lead.address && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {lead.address}
                        </div>
                      )}
                      {!lead.phone_number && !lead.address && <span className="text-xs text-gray-300">—</span>}
                    </div>
                  </td>

                  {/* Order reference */}
                  <td className="px-4 py-3">
                    {lead.pending_order_reference ? (
                      <div>
                        <p className="text-xs font-mono font-semibold text-[#0f6885]">{lead.pending_order_reference}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {new Date(lead.pending_order_created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">Aucune</span>
                    )}
                  </td>

                  {/* Product details */}
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      {lead.color && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-gray-400">Couleur:</span> {lead.color}
                        </div>
                      )}
                      {lead.size && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-gray-400">Taille:</span> {lead.size}
                        </div>
                      )}
                      {lead.quantity && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-gray-400">Qté:</span> {lead.quantity}
                        </div>
                      )}
                      {!lead.color && !lead.size && !lead.quantity && (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {lead.has_pending_order && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-yellow-500" />
                          <span className="text-[10px] font-semibold text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                            Commande en attente
                          </span>
                        </div>
                      )}
                      {lead.agent_confirmation_pending && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-orange-500" />
                          <span className="text-[10px] font-semibold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-full">
                            Confirmation agent
                          </span>
                        </div>
                      )}
                      {!lead.has_pending_order && !lead.agent_confirmation_pending && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                            OK
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditing(lead)}
                        className="p-1.5 text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9] rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setToDelete(lead)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Page {page} / {totalPages} · {total} leads
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9] rounded-lg transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                    p === page
                      ? 'bg-[#0f6885] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 text-gray-400 hover:text-[#0f6885] hover:bg-[#eef6f9] rounded-lg transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Edit modal ── */}
      {editing && (
        <EditModal
          lead={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}

      {/* ── Delete confirm modal ── */}
      {toDelete && (
        <DeleteModal
          lead={toDelete}
          deleting={deleting}
          onClose={() => setToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Leads;
