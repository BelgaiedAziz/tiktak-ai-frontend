import axios from 'axios';

const TOKEN = process.env.REACT_APP_SHOP_TOKEN || '';

const crm = axios.create({
  baseURL: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  headers: {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
});

/** List leads, optionally filtered by shop and paginated. */
export const fetchLeads = (shopId, page) =>
  crm.get('/leads/', {
    params: {
      ...(shopId ? { shop_id: shopId } : {}),
      ...(page && page > 1 ? { page } : {}),
    },
  });

/** Partial update. */
export const updateLead = (id, data) => crm.patch(`/leads/${id}/`, data);

/** Delete a lead. */
export const deleteLead = (id) => crm.delete(`/leads/${id}/`);
