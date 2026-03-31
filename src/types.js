// Configuration TypeScript / JSDoc Types
// Types et interfaces réutilisables dans l'application

/**
 * @typedef {Object} Template
 * @property {number} id
 * @property {string} template_type - Catégorie (response, missing_entity, etc.)
 * @property {string} intent - Sous-clé (GREETING, size, etc.)
 * @property {string} language - Langue (FR, AR, EN)
 * @property {string} content - Contenu du template avec {variables}
 * @property {boolean} is_default - True pour templates système
 * @property {string|null} shop_id - ID du shop pour templates custom
 */

/**
 * @typedef {Object} BotConfiguration
 * @property {string} shop_id
 * @property {string} [shop_name] - Nom du shop
 * @property {string} [language] - Langue (AUTO/FR/AR/EN)
 * @property {string} [ai_agent_name] - Nom du bot
 * @property {string} [appearance] - Configuration d'apparence
 * @property {string} [ai_personality] - Personnalité du bot
 */

/**
 * @typedef {Object} Conversation
 * @property {number} id
 * @property {string} user_name
 * @property {string} user_phone
 * @property {string} platform_id - WhatsApp, Instagram, etc.
 * @property {string} last_message
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Message
 * @property {number} id
 * @property {number} conversation_id
 * @property {string} sender - USER or AGENT
 * @property {string} text
 * @property {string} created_at
 * @property {string|null} image - URL de l'image optionnelle
 */

/**
 * @typedef {Object} Lead
 * @property {number} id
 * @property {string} phone_number
 * @property {string} platform_id
 * @property {string} [name]
 * @property {string} [address]
 * @property {boolean} has_pending_order
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} HookResult
 * @property {boolean} loading
 * @property {Error|null} error
 * @property {function} refetch - Fonction pour rafraîchir
 */

/**
 * @typedef {Object} TemplatesHookResult
 * @extends HookResult
 * @property {Array<Template>} templates
 * @property {function} create - Créer un template
 * @property {function} update - Mettre à jour un template
 * @property {function} remove - Supprimer un template
 * @property {function} findTemplates - Rechercher des templates
 * @property {function} getSystemTemplate - Obtenir le template système
 * @property {function} getCustomTemplate - Obtenir le template custom
 */

/**
 * @typedef {Object} BotConfigHookResult
 * @extends HookResult
 * @property {BotConfiguration|null} config
 * @property {function} updateConfig - Mise à jour complète
 * @property {function} patchConfig - Mise à jour partielle
 */

// API Response Types

/**
 * @typedef {Object} APIResponse
 * @property {*} data
 * @property {string} status
 * @property {number} statusCode
 */

/**
 * @typedef {Object} APIError
 * @property {number} statusCode
 * @property {string} message
 * @property {*} [detail]
 */
