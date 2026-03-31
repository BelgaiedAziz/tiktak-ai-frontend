// API Index - Point d'entrée centralisé pour tous les services API
// Cette structure permet d'organiser les imports de manière claire

// CRM Services (Conversations, Leads)
export * from './crmApi';
export * from './leadsApi';

// Messenger/Meta API
export * from './metaApi';

// Bot Configuration
export * from './botConfigService';

// Templates
export * from './templatesService';

// Hooks
export { useTemplates } from './useTemplates';
export { useBotConfig } from './useBotConfig';

// Types (via JSDoc)
export * from '../types';
