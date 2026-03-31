// Fichier de compatibilité - CRM API consolidé
// Les services CRM sont maintenant centralisés ici
// Les imports de src/api/crmApi.js continuent de fonctionner

import axios from 'axios';

const TOKEN = process.env.REACT_APP_SHOP_TOKEN || '';

const crmClient = axios.create({
  baseURL: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  headers: {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
});

// ─── Conversations ───────────────────────────────────────────────────────────

export const fetchConversations = (shopId) =>
  crmClient.get('/conversations/', { params: shopId ? { shop_id: shopId } : {} });

export const fetchMessages = (conversationId, page) =>
  crmClient.get(`/conversations/${conversationId}/messages/`, {
    params: page ? { page } : {},
  });

export const sendMessage = (conversationId, text) =>
  crmClient.post(`/conversations/${conversationId}/messages/`, { text, sender: 'AGENT' });

// ─── Leads ───────────────────────────────────────────────────────────────────

export const fetchLeads = (shopId, page) =>
  crmClient.get('/leads/', {
    params: {
      ...(shopId ? { shop_id: shopId } : {}),
      ...(page && page > 1 ? { page } : {}),
    },
  });

export const fetchLead = (id) =>
  crmClient.get(`/leads/${id}/`);

export const createLead = (payload) =>
  crmClient.post('/leads/', payload);

export const patchLead = (id, patch) =>
  crmClient.patch(`/leads/${id}/`, patch);

export const updateLead = (id, payload) =>
  crmClient.put(`/leads/${id}/`, payload);

export const deleteLead = (id) =>
  crmClient.delete(`/leads/${id}/`);

