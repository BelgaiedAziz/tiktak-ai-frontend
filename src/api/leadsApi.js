import axios from 'axios';

const crm = axios.create({
  baseURL: 'http://localhost/api/v1/crm',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchLeads   = (shopId, page) =>
  crm.get('/leads/', { params: { ...(shopId ? { shop_id: shopId } : {}), ...(page ? { page } : {}) } });

export const updateLead   = (id, data) => crm.patch(`/leads/${id}/`, data);
export const deleteLead   = (id)       => crm.delete(`/leads/${id}/`);
