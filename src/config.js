// Application Configuration
// Centralise toutes les configurations et paramètres de l'application

// Environment & API Configuration
export const API_CONFIG = {
  CRM_BASE_URL: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  MESSENGER_BASE_URL: process.env.REACT_APP_META_API_URL || 'http://localhost:8000/api/v1/gateway/messenger/poc',
  SHOP_TOKEN: process.env.REACT_APP_SHOP_TOKEN || '',
  SHOP_ID: process.env.REACT_APP_SHOP_ID || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Request Configuration
export const REQUEST_CONFIG = {
  TIMEOUT: 30000, // 30 secondes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 seconde
};

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 3000, // 3 secondes
  MODAL_ANIMATION_DURATION: 300, // ms
  DEBOUNCE_DELAY: 500, // Pour les recherches
  PAGINATION_DEFAULT_SIZE: 20,
};

// Feature Flags
export const FEATURES = {
  ENABLE_MESSENGER: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_LEADS_MANAGEMENT: true,
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
  TEMPLATE_MAX_LENGTH: 500,
};

// Date Format Configuration
export const DATE_FORMATS = {
  SHORT_DATE: 'DD/MM/YYYY',
  LONG_DATE: 'DD MMMM YYYY',
  TIME_24H: 'HH:mm',
  DATETIME: 'DD/MM/YYYY HH:mm',
};

// Cache Configuration
export const CACHE_CONFIG = {
  TEMPLATES_TTL: 5 * 60 * 1000, // 5 minutes
  CONFIG_TTL: 10 * 60 * 1000, // 10 minutes
  LEADS_TTL: 3 * 60 * 1000, // 3 minutes
};
