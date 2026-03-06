import api from './axiosConfig';

export const fetchConversations = (storeId) => api.get(`/conversations/${storeId}`);
export const sendMessage = (payload) => api.post('/messages/send', payload);

// For identifying products via SigLIP
export const identifyProduct = (formData) => api.post('/vision/identify', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});