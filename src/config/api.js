// API Configuration
export const API_CONFIG = {
  CRM_BASE_URL: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  MESSENGER_BASE_URL: process.env.REACT_APP_META_API_URL || 'http://localhost:8000/api/v1/gateway/messenger/poc',
  SHOP_TOKEN: process.env.REACT_APP_SHOP_TOKEN || '',
  SHOP_ID: process.env.REACT_APP_SHOP_ID || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export const REQUEST_CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};
