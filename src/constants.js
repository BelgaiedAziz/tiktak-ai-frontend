// Application Constants
// Constantes globales et configurations statiques

// API Configuration
export const API_ENDPOINTS = {
  CRM: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  MESSENGER: process.env.REACT_APP_META_API_URL || 'http://localhost:8000/api/v1/gateway/messenger/poc',
};

// Response Types
export const RESPONSE_TYPES = {
  GREETING: 'GREETING',
  COMPLAINT: 'COMPLAINT',
  RESPONSE: 'RESPONSE',
  MISSING_ENTITY: 'MISSING_ENTITY',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
};

// Languages
export const LANGUAGES = {
  AUTO: 'AUTO',
  FR: 'FR',
  AR: 'AR',
  EN: 'EN',
};

// Page Routes
export const ROUTES = {
  DASHBOARD: '/',
  INBOX: '/inbox',
  LEADS: '/leads',
  AGENT_SETTINGS: '/settings',
  KNOWLEDGE_BASE: '/knowledge-base',
  ANALYTICS: '/analytics',
  CHAT: '/chat',
  MESSENGER: '/messenger',
  MESSAGES: '/messages',
  CLIENT_CHAT: '/chat',
  NOTIFICATIONS: '/notifications',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Une erreur réseau s\'est produite',
  LOAD_ERROR: 'Erreur lors du chargement des données',
  SAVE_ERROR: 'Erreur lors de l\'enregistrement',
  DELETE_ERROR: 'Erreur lors de la suppression',
  UNAUTHORIZED: 'Authentification requise',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Enregistré avec succès',
  DELETED: 'Supprimé avec succès',
  CREATED: 'Créé avec succès',
  UPDATED: 'Mis à jour avec succès',
};
