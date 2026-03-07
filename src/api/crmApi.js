import axios from 'axios';

const crm = axios.create({
  baseURL: 'http://localhost/api/v1/crm',
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Fetch paginated list of conversations.
 * @param {string} [shopId] - Optional shop filter
 */
export const fetchConversations = (shopId) =>
  crm.get('/conversations/', { params: shopId ? { shop_id: shopId } : {} });

/**
 * Fetch message history for a given conversation.
 * @param {number} conversationId
 * @param {number} [page]
 */
export const fetchMessages = (conversationId, page) =>
  crm.get(`/conversations/${conversationId}/messages/`, {
    params: page ? { page } : {},
  });

/**
 * Send a message as AGENT in a conversation.
 * @param {number} conversationId
 * @param {string} text
 */
export const sendMessage = (conversationId, text) =>
  crm.post(`/conversations/${conversationId}/messages/`, { text, sender: 'AGENT' });
