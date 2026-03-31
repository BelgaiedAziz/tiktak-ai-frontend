const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');

console.log('\n🔧 PHASE 6: RESTRUCTURATION PAR DOSSIERS\n');

// ═════════════════════════════════════════════════════════════════════════════
// 1. Créer la structure de dossiers
// ═════════════════════════════════════════════════════════════════════════════

const DIRS = [
  // API Services
  'api/services',
  
  // Hooks
  'hooks',
  
  // Utils
  'utils',
  
  // Constants
  'constants',
  
  // Config
  'config',
  
  // Types
  'types',
  
  // Styles
  'styles',
  
  // Composants (déjà existants mais on s'assure)
  'components/common',
];

console.log('📁 Création des dossiers...\n');

DIRS.forEach(dir => {
  const fullPath = path.join(SRC, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  ✓ src/${dir}`);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
// 2. Déplacer et réorganiser les fichiers
// ═════════════════════════════════════════════════════════════════════════════

console.log('\n📦 Déplacement des fichiers...\n');

// Styles: index.css → styles/index.css
if (fs.existsSync(path.join(SRC, 'styles.css'))) {
  const content = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
  fs.writeFileSync(path.join(SRC, 'styles', 'index.css'), content);
  console.log('  ✓ styles.css → styles/index.css');
}

// Utils: Séparer utils.js en plusieurs fichiers
const utilsContent = fs.readFileSync(path.join(SRC, 'utils.js'), 'utf8');

// formatters.js
const formattersContent = `/**
 * Formatters - Fonctions de formatage
 */

${utilsContent.match(/\/\*\*[\s\S]*?export const formatDate[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const formatDateTime[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const formatCurrency[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const truncateText[\s\S]*?};/)?.[0] || ''}
`;

fs.writeFileSync(path.join(SRC, 'utils', 'formatters.js'), formattersContent.trim());
console.log('  ✓ Créé utils/formatters.js');

// validators.js
const validatorsContent = `/**
 * Validators - Fonctions de validation
 */

${utilsContent.match(/\/\*\*[\s\S]*?export const isValidEmail[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const isValidPhone[\s\S]*?};/)?.[0] || ''}
`;

fs.writeFileSync(path.join(SRC, 'utils', 'validators.js'), validatorsContent.trim());
console.log('  ✓ Créé utils/validators.js');

// helpers.js
const helpersContent = `/**
 * Helpers - Fonctions utilitaires générales
 */

${utilsContent.match(/\/\*\*[\s\S]*?export const generateId[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const deepClone[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const isEqual[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const mergeObjects[\s\S]*?};/)?.[0] || ''}

${utilsContent.match(/\/\*\*[\s\S]*?export const delay[\s\S]*?};/)?.[0] || ''}
`;

fs.writeFileSync(path.join(SRC, 'utils', 'helpers.js'), helpersContent.trim());
console.log('  ✓ Créé utils/helpers.js');

// utils/index.js
const utilsIndex = `// Utils - Exports centralisés
export * from './formatters';
export * from './validators';
export * from './helpers';
`;

fs.writeFileSync(path.join(SRC, 'utils', 'index.js'), utilsIndex);
console.log('  ✓ Créé utils/index.js');

// ═════════════════════════════════════════════════════════════════════════════
// 3. Constants: Séparer constants.js
// ═════════════════════════════════════════════════════════════════════════════

const constantsContent = fs.readFileSync(path.join(SRC, 'constants.js'), 'utf8');

// routes.js
const routesContent = `// Routes de l'application
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
`;

fs.writeFileSync(path.join(SRC, 'constants', 'routes.js'), routesContent);
console.log('  ✓ Créé constants/routes.js');

// api.js
const apiConstantsContent = `// API Configuration Constants
export const API_ENDPOINTS = {
  CRM: process.env.REACT_APP_CRM_API_URL || 'http://localhost:8000/api/v1/crm',
  MESSENGER: process.env.REACT_APP_META_API_URL || 'http://localhost:8000/api/v1/gateway/messenger/poc',
};
`;

fs.writeFileSync(path.join(SRC, 'constants', 'api.js'), apiConstantsContent);
console.log('  ✓ Créé constants/api.js');

// messages.js
const messagesContent = `// Messages d'erreur et de succès
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Une erreur réseau s\\'est produite',
  LOAD_ERROR: 'Erreur lors du chargement des données',
  SAVE_ERROR: 'Erreur lors de l\\'enregistrement',
  DELETE_ERROR: 'Erreur lors de la suppression',
  UNAUTHORIZED: 'Authentification requise',
};

export const SUCCESS_MESSAGES = {
  SAVED: 'Enregistré avec succès',
  DELETED: 'Supprimé avec succès',
  CREATED: 'Créé avec succès',
  UPDATED: 'Mis à jour avec succès',
};
`;

fs.writeFileSync(path.join(SRC, 'constants', 'messages.js'), messagesContent);
console.log('  ✓ Créé constants/messages.js');

// app.js
const appConstantsContent = `// Constantes applicatives
export const RESPONSE_TYPES = {
  GREETING: 'GREETING',
  COMPLAINT: 'COMPLAINT',
  RESPONSE: 'RESPONSE',
  MISSING_ENTITY: 'MISSING_ENTITY',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
};

export const LANGUAGES = {
  AUTO: 'AUTO',
  FR: 'FR',
  AR: 'AR',
  EN: 'EN',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};
`;

fs.writeFileSync(path.join(SRC, 'constants', 'app.js'), appConstantsContent);
console.log('  ✓ Créé constants/app.js');

// constants/index.js
const constantsIndex = `// Constants - Exports centralisés
export * from './routes';
export * from './api';
export * from './messages';
export * from './app';
`;

fs.writeFileSync(path.join(SRC, 'constants', 'index.js'), constantsIndex);
console.log('  ✓ Créé constants/index.js');

// ═════════════════════════════════════════════════════════════════════════════
// 4. Config: Séparer config.js
// ═════════════════════════════════════════════════════════════════════════════

// api.js
const apiConfigContent = `// API Configuration
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
`;

fs.writeFileSync(path.join(SRC, 'config', 'api.js'), apiConfigContent);
console.log('  ✓ Créé config/api.js');

// ui.js
const uiConfigContent = `// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  PAGINATION_DEFAULT_SIZE: 20,
};

export const DATE_FORMATS = {
  SHORT_DATE: 'DD/MM/YYYY',
  LONG_DATE: 'DD MMMM YYYY',
  TIME_24H: 'HH:mm',
  DATETIME: 'DD/MM/YYYY HH:mm',
};
`;

fs.writeFileSync(path.join(SRC, 'config', 'ui.js'), uiConfigContent);
console.log('  ✓ Créé config/ui.js');

// features.js
const featuresContent = `// Feature Flags
export const FEATURES = {
  ENABLE_MESSENGER: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_LEADS_MANAGEMENT: true,
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
  TEMPLATE_MAX_LENGTH: 500,
};

export const CACHE_CONFIG = {
  TEMPLATES_TTL: 5 * 60 * 1000,
  CONFIG_TTL: 10 * 60 * 1000,
  LEADS_TTL: 3 * 60 * 1000,
};
`;

fs.writeFileSync(path.join(SRC, 'config', 'features.js'), featuresContent);
console.log('  ✓ Créé config/features.js');

// config/index.js
const configIndex = `// Config - Exports centralisés
export * from './api';
export * from './ui';
export * from './features';
`;

fs.writeFileSync(path.join(SRC, 'config', 'index.js'), configIndex);
console.log('  ✓ Créé config/index.js');

// ═════════════════════════════════════════════════════════════════════════════
// 5. Hooks: Déplacer les hooks
// ═════════════════════════════════════════════════════════════════════════════

// Copier useTemplates.js
if (fs.existsSync(path.join(SRC, 'api', 'useTemplates.js'))) {
  const content = fs.readFileSync(path.join(SRC, 'api', 'useTemplates.js'), 'utf8');
  fs.writeFileSync(path.join(SRC, 'hooks', 'useTemplates.js'), content);
  console.log('  ✓ api/useTemplates.js → hooks/useTemplates.js');
}

// Copier useBotConfig.js
if (fs.existsSync(path.join(SRC, 'api', 'useBotConfig.js'))) {
  const content = fs.readFileSync(path.join(SRC, 'api', 'useBotConfig.js'), 'utf8');
  fs.writeFileSync(path.join(SRC, 'hooks', 'useBotConfig.js'), content);
  console.log('  ✓ api/useBotConfig.js → hooks/useBotConfig.js');
}

// hooks/index.js
const hooksIndex = `// Hooks - Exports centralisés
export { useTemplates } from './useTemplates';
export { useBotConfig } from './useBotConfig';
`;

fs.writeFileSync(path.join(SRC, 'hooks', 'index.js'), hooksIndex);
console.log('  ✓ Créé hooks/index.js');

// ═════════════════════════════════════════════════════════════════════════════
// 6. Services API: Copier dans api/services
// ═════════════════════════════════════════════════════════════════════════════

const apiFiles = ['crmApi.js', 'leadsApi.js', 'metaApi.js', 'botConfigService.js', 'templatesService.js'];

apiFiles.forEach(file => {
  const sourcePath = path.join(SRC, 'api', file);
  const targetPath = path.join(SRC, 'api', 'services', file);
  
  if (fs.existsSync(sourcePath)) {
    const content = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(targetPath, content);
    console.log(`  ✓ api/${file} → api/services/${file}`);
  }
});

// api/services/index.js
const servicesIndex = `// API Services - Exports centralisés
export * from './crmApi';
export * from './leadsApi';
export * from './metaApi';
export * from './botConfigService';
export * from './templatesService';
`;

fs.writeFileSync(path.join(SRC, 'api', 'services', 'index.js'), servicesIndex);
console.log('  ✓ Créé api/services/index.js');

// Mettre à jour api/index.js
const apiIndexContent = `// API - Exports centralisés
// Services
export * from './services';

// Hooks (redirection vers src/hooks)
export { useTemplates, useBotConfig } from '../hooks';
`;

fs.writeFileSync(path.join(SRC, 'api', 'index.js'), apiIndexContent);
console.log('  ✓ Mis à jour api/index.js');

console.log('\n✅ RESTRUCTURATION PAR DOSSIERS COMPLÉTÉE!\n');
console.log('📊 Nouvelle structure:');
console.log('   src/');
console.log('   ├── api/services/    (Services API)');
console.log('   ├── hooks/           (Custom Hooks)');
console.log('   ├── utils/           (Utilitaires)');
console.log('   ├── constants/       (Constantes)');
console.log('   ├── config/          (Configuration)');
console.log('   └── styles/          (Styles)\n');
