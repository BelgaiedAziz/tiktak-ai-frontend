/**
 * Helpers - Fonctions utilitaires générales
 */

/**
 * Utilitaires globaux et helpers
 * Fonctions communes réutilisables dans toute l'application
 */

/**
 * Formate une date en format lisible
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale (ex: 'fr-FR', 'en-US')
 * @returns {string}
 */
export const formatDate = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Formate une date avec l'heure
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatDateTime = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleString(locale);
};

/**
 * Formate un nombre en devise
 * @param {number} amount - Montant
 * @param {string} currency - Code devise (ex: 'EUR', 'USD')
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'EUR', locale = 'fr-FR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Tronque un texte à une longueur spécifique
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Valide une adresse email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone (format flexible)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Génère un ID unique
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Utilitaires globaux et helpers
 * Fonctions communes réutilisables dans toute l'application
 */

/**
 * Formate une date en format lisible
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale (ex: 'fr-FR', 'en-US')
 * @returns {string}
 */
export const formatDate = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Formate une date avec l'heure
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatDateTime = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleString(locale);
};

/**
 * Formate un nombre en devise
 * @param {number} amount - Montant
 * @param {string} currency - Code devise (ex: 'EUR', 'USD')
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'EUR', locale = 'fr-FR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Tronque un texte à une longueur spécifique
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Valide une adresse email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone (format flexible)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Génère un ID unique
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clone un objet en profondeur
 * @param {Object} obj - Objet à cloner
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Utilitaires globaux et helpers
 * Fonctions communes réutilisables dans toute l'application
 */

/**
 * Formate une date en format lisible
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale (ex: 'fr-FR', 'en-US')
 * @returns {string}
 */
export const formatDate = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Formate une date avec l'heure
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatDateTime = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleString(locale);
};

/**
 * Formate un nombre en devise
 * @param {number} amount - Montant
 * @param {string} currency - Code devise (ex: 'EUR', 'USD')
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'EUR', locale = 'fr-FR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Tronque un texte à une longueur spécifique
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Valide une adresse email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone (format flexible)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Génère un ID unique
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clone un objet en profondeur
 * @param {Object} obj - Objet à cloner
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Vérifie si deux objets sont égaux
 * @param {*} obj1
 * @param {*} obj2
 * @returns {boolean}
 */
export const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Utilitaires globaux et helpers
 * Fonctions communes réutilisables dans toute l'application
 */

/**
 * Formate une date en format lisible
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale (ex: 'fr-FR', 'en-US')
 * @returns {string}
 */
export const formatDate = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Formate une date avec l'heure
 * @param {string | Date} date - Date à formatter
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatDateTime = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleString(locale);
};

/**
 * Formate un nombre en devise
 * @param {number} amount - Montant
 * @param {string} currency - Code devise (ex: 'EUR', 'USD')
 * @param {string} locale - Locale
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'EUR', locale = 'fr-FR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Tronque un texte à une longueur spécifique
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Valide une adresse email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone (format flexible)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Génère un ID unique
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clone un objet en profondeur
 * @param {Object} obj - Objet à cloner
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Vérifie si deux objets sont égaux
 * @param {*} obj1
 * @param {*} obj2
 * @returns {boolean}
 */
export const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Fusionne deux objets
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
export const mergeObjects = (target, source) => {
  return { ...target, ...source };