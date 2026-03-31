# 📁 TikTak AI Frontend - Structure du Projet

## Vue d'ensemble

Ce projet est organisé suivant une structure claire et maintenable pour faciliter la navigation, la collaboration et la scalabilité.

## Structure des Dossiers

```
src/
├── components/              ← Composants React réutilisables
│   ├── layout/             (Sidebar, Navbar, MainLayout)
│   ├── chat/               (Composants liés au chat)
│   └── Toast.jsx           (Notifications)
│
├── pages/                   ← Pages complètes/écrans
│   ├── Dashboard/
│   ├── Analytics/
│   ├── Inbox/
│   ├── Leads/
│   ├── Messages/
│   ├── AgentSettings/       (Configuration de l'agent avec onglets)
│   ├── KnowledgeBase/       (Base de connaissances)
│   └── MessengerInbox/      (Boîte de réception Messenger)
│
├── api/                     ← Services API et données
│   ├── crmApi.js           (Conversations, Leads - CRM)
│   ├── leadsApi.js         (Leads)
│   ├── metaApi.js          (Messenger/Meta)
│   ├── botConfigService.js (Configuration Bot)
│   ├── templatesService.js (Templates)
│   ├── useTemplates.js     (Hook pour Templates)
│   ├── useBotConfig.js     (Hook pour Bot Config)
│   └── index.js            (Index centralisé)
│
├── constants.js             ← Constantes globales
├── App.js                   ← Composant principal
├── index.js                 ← Point d'entrée
└── index.css                ← Styles globaux
```

## 🎯 Guide d'Utilisation

### Importer un composant

```javascript
// ✅ BON
import Dashboard from './pages/Dashboard/Dashboard';
import MainLayout from './components/layout/MainLayout';

// ❌ MAUVAIS
import * as Dashboard from './pages/Dashboard';
```

### Importer une fonction API

```javascript
// ✅ BON - Import spécifique
import { fetchLeads, fetchConversations } from './api/crmApi';

// ✅ BON AUSSI - Via l'index
import { fetchLeads, fetchConversations } from './api';

// ❌ MAUVAIS
import * from './api/crmApi';
```

### Importer une constante

```javascript
// ✅ BON
import { ROUTES, LANGUAGES } from './constants';
```

### Utiliser un hook API

```javascript
// ✅ BON
import { useTemplates } from './api/useTemplates';

const MyComponent = () => {
  const { data: templates } = useTemplates();
  // ...
};
```

## 📦 Service API (api/)

### crmApi.js
Gère toutes les interactions CRM:
- **Conversations**: `fetchConversations`, `fetchMessages`, `sendMessage`
- **Leads**: `fetchLeads`, `fetchLead`, `createLead`, `patchLead`, `updateLead`, `deleteLead`

### metaApi.js
Gère les interactions avec Messenger/Meta:
- `fetchPocConversations`
- `fetchPocMessages`
- `sendPocMessage` (supporte texte et images)

### botConfigService.js
Gère la configuration du bot:
- `getBotConfig`
- `updateBotConfig`
- `patchBotConfig`

### templatesService.js
Gère les templates de réponse:
- `getTemplates`
- `getTemplate`
- `createTemplate`
- `updateTemplate`
- `deleteTemplate`
- `previewTemplate`

### Hooks

#### useTemplates.js
Hook React pour les templates:
```javascript
const { data, isLoading, error } = useTemplates(filters);
```

#### useBotConfig.js
Hook React pour la configuration bot:
```javascript
const { data, isLoading, error } = useBotConfig();
```

## 🎨 Styles

Les styles globaux sont dans `index.css` et les styles spécifiques à l'app dans `App.css`.

Pour ajouter des styles locaux à un composant:
```javascript
// Dans le même dossier que le composant
// MyComponent.jsx
// MyComponent.css (imported in MyComponent.jsx)
import './MyComponent.css';
```

## 🔧 Environnement

Les variables d'environnement doivent être définies dans `.env`:
```
REACT_APP_CRM_API_URL=http://localhost:8000/api/v1/crm
REACT_APP_META_API_URL=http://localhost:8000/api/v1/gateway/messenger/poc
REACT_APP_SHOP_TOKEN=votre_token
```

## 📝 Règles de Nommage

- **Composants**: `PascalCase` (ex: `Dashboard.jsx`, `MainLayout.jsx`)
- **Fichiers utilitaires**: `camelCase` (ex: `crmApi.js`, `useTemplates.js`)
- **Dossiers**: `kebab-case` ou `PascalCase` (ex: `components/layout`, `pages/Dashboard`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `API_ENDPOINTS`, `DEFAULT_PAGE_SIZE`)

## 🚀 Commandes Utiles

```bash
# Démarrer le serveur de développement
npm start

# Construire pour la production
npm build

# Lancer les tests
npm test

# Restructurer la base de code (future)
npm run restructure
```

## 💡 Bonnes Pratiques

1. **Séparation des préoccupations**: Garder la logique API séparée des composants UI
2. **Réutilisabilité**: Créer des composants génériques et réutilisables
3. **Types**: Documenter les props des composants avec des commentaires JSDoc
4. **Async/Await**: Préférer async/await aux callbacks ou .then()
5. **Error Handling**: Toujours gérer les cas d'erreur dans les appels API

## 🔄 Flux de Données

```
Pages (ex: Leads.jsx)
  ↓
  Hooks API (ex: useTemplates)
  ↓
  Services API (ex: crmApi.fetchLeads())
  ↓
  Axios Client (configurations et appels HTTP)
  ↓
  Backend API
```

---

**Last Updated**: 2026-03-31
**Version**: 1.0
