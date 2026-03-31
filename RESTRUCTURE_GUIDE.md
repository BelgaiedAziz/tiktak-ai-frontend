# 📋 Guide de Restructuration Progressive

Ce document explique comment continuer la restructuration du projet de manière progressive.

## ✅ Phase 1: Centralisez les services (COMPLÉTÉE)

### Ce qui a été fait:
- ✅ Consolidation des services CRM (conversations + leads)
- ✅ Création d'un point d'entrée API centralisé (`src/api/index.js`)
- ✅ Création de constantes globales (`src/constants.js`)
- ✅ Création de fonctions utilitaires (`src/utils.js`)
- ✅ Documentation de structure (`STRUCTURE.md`)
- ✅ **Le projet reste entièrement fonctionnel** - aucun changement de API publique

### Avantages:
- Imports plus clairs et plus faciles à maintenir
- Meilleure organisation du code
- Facilité à trouver les fonctions API

---

## 🔄 Phase 2: Réorganiser les Hooks (PROCHAINE)

### Objectif:
Créer un dossier `src/hooks/` et déplacer les hooks API personnalisés.

### Étapes:
1. Créer `src/hooks/` dossier
2. Déplacer `src/api/useTemplates.js` → `src/hooks/useTemplates.js`
3. Déplacer `src/api/useBotConfig.js` → `src/hooks/useBotConfig.js`
4. Créer `src/hooks/index.js` pour les réexports
5. Mettre à jour `src/api/index.js` pour les redirects

### Exemple de migration:

**AVANT:**
```javascript
import { useTemplates } from '../api/useTemplates';
```

**APRÈS (même import fonctionne):**
```javascript
import { useTemplates } from '../api';  // via redirect
// OU
import { useTemplates } from '../hooks'; // direct
```

---

## 📁 Phase 3: Créer des dossiers Features (À LONG TERME)

### Objectif:
Regrouper la logique par fonctionnalité pour faciliter la croissance.

### Structure cible:
```
src/features/
├── templates/
│   ├── api.js           (API pour templates)
│   ├── hooks.js         (Hooks pour templates)
│   ├── constants.js     (Constantes templates)
│   ├── types.js         (Types templates)
│   └── index.js         (Exports)
│
├── bot-config/
│   ├── api.js
│   ├── hooks.js
│   ├── constants.js
│   └── index.js
│
├── conversations/
│   ├── api.js
│   ├── hooks.js
│   └── index.js
│
└── leads/
    ├── api.js
    ├── hooks.js
    └── index.js
```

### Avantages:
- Chaque feature est auto-contenue
- Facile d'ajouter/supprimer une fonctionnalité
- Meilleure scalabilité

---

## 🎨 Phase 4: Organiser les Styles (OPTIONNEL)

### Actuel:
- `src/index.css` - Styles globaux
- `src/App.css` - Styles spécifiques

### Proposé:
```
src/styles/
├── index.css        (Global)
├── tailwind.css     (Tailwind imports)
├── variables.css    (Variables CSS)
└── utilities.css    (Utilitaires CSS)
```

---

## 📝 Phase 5: Ajouter Types/JSDoc (OPTIONNEL)

### Créer `src/types.js`:
```javascript
/**
 * @typedef {Object} Conversation
 * @property {number} id
 * @property {string} user_name
 * @property {string} last_message
 * @property {string} created_at
 */

/**
 * @typedef {Object} Lead
 * @property {number} id
 * @property {string} phone_number
 * @property {string} platform_id
 * @property {boolean} has_pending_order
 */

// ... plus de types
```

### Utilisation dans les composants:
```javascript
/**
 * @param {Conversation} conversation
 * @returns {JSX.Element}
 */
const ConversationItem = ({ conversation }) => {
  // ...
};
```

---

## 🚀 Comment Continuer

### Pour chaque phase:

1. **Créer une nouvelle branche:**
   ```bash
   git checkout -b refactor/phase-{number}-{description}
   ```

2. **Faire les changements:**
   - Créer les nouveaux dossiers/fichiers
   - Mettre à jour les imports progressivement
   - Ajouter des redirects pour la compatibilité

3. **Tester:**
   ```bash
   npm start
   npm test
   ```

4. **Commit et push:**
   ```bash
   git add .
   git commit -m "refactor: phase {number} - {description}"
   git push origin refactor/phase-{number}-{description}
   ```

5. **Créer une Pull Request** pour review

---

## ⚠️ Points Importants

### Backward Compatibility
- ✅ Garder les anciens chemins d'import avec des redirects
- ✅ Tester avec `npm start` après chaque changement
- ✅ Ne pas faire de changements de breaking API

### Exemple de Redirect:
```javascript
// src/api/useTemplates.js (ancien chemin)
export * from '../hooks/useTemplates'; // nouveau chemin
```

### Testing
```bash
# Avant chaque commit
npm start  # Vérifier qu'aucune erreur

# Bonus: si des tests existent
npm test
```

---

## 📊 Checklist pour Chaque Phase

- [ ] Branche créée
- [ ] Nouveaux fichiers/dossiers créés
- [ ] Imports mis à jour
- [ ] Redirects créés pour compatibilité
- [ ] `npm start` fonctionne sans erreur
- [ ] Tests passent (si applicable)
- [ ] Commit avec message clair
- [ ] PR créée et mergée

---

## 💡 Conseils pour la Refactorisation

1. **Petites étapes** - Faire une phase à la fois
2. **Tests fréquents** - Vérifier après chaque changement
3. **Commits clairs** - Messages descriptifs
4. **Documentation** - Mettre à jour `STRUCTURE.md`
5. **Compatibilité** - Toujours garder les anciens imports

---

**État du Projet**: Phase 1 ✅ Complétée | Phase 2-5 📋 À Venir

Dernière mise à jour: 31 Mars 2026
