// API Configuration Constants
export const API_ENDPOINTS = {
  CRM: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  MESSENGER: process.env.REACT_APP_META_API_URL || 'http://localhost:8000/api/v1/gateway/messenger/poc',
};
