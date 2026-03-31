/**
 * Validators - Fonctions de validation
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