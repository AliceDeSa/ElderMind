/**
 * Constantes Globais do Sistema
 * Baseado no PROJECT_STANDARDS.md
 */

// ========================
// POLÍTICA DE Z-INDEX
// ========================

export const Z_INDEX = {
    BASE: 100,           // Elementos base (cards, tabelas)
    ACTIVE: 150,         // Elementos ativos (drag, hover)
    UI: 250,             // HUD, botões laterais
    MODAL: 1000,         // Modais, dialogs
    OVERLAY: 1050,       // Overlays de modais
    CRITICAL: 2100,      // Toasts, notificações
    DEBUG: 9000          // Dev tools
} as const;

// ========================
// CATEGORIAS DE DESPESAS
// ========================

export const EXPENSE_CATEGORIES = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Vestuário',
    'Outros'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

// ========================
// EVENTOS DO EVENTBUS
// ========================

export const EVENTS = {
    // Autenticação
    AUTH_STATE_CHANGED: 'AUTH:STATE_CHANGED',
    AUTH_LOGIN_SUCCESS: 'AUTH:LOGIN:SUCCESS',
    AUTH_LOGOUT: 'AUTH:LOGOUT',

    // Finanças
    FINANCE_DATA_UPDATED: 'FINANCE:DATA_UPDATED',
    INCOME_ADDED: 'FINANCE:INCOME:ADDED',
    INCOME_UPDATED: 'FINANCE:INCOME:UPDATED',
    INCOME_DELETED: 'FINANCE:INCOME:DELETED',

    EXPENSE_ADDED: 'FINANCE:EXPENSE:ADDED',
    EXPENSE_UPDATED: 'FINANCE:EXPENSE:UPDATED',
    EXPENSE_DELETED: 'FINANCE:EXPENSE:DELETED',

    CARD_ADDED: 'FINANCE:CARD:ADDED',
    GOAL_UPDATED: 'FINANCE:GOAL:UPDATED',
    BUDGET_UPDATED: 'FINANCE:BUDGET:UPDATED',

    // UI
    UI_MODAL_OPENED: 'UI:MODAL:OPENED',
    UI_MODAL_CLOSED: 'UI:MODAL:CLOSED',
    UI_NOTIFICATION: 'UI:NOTIFICATION',

    // Educação
    EDU_LESSON_COMPLETED: 'EDU:LESSON:COMPLETED',
    EDU_QUIZ_COMPLETED: 'EDU:QUIZ:COMPLETED'
} as const;

// ========================
// CONFIGURAÇÕES PADRÃO
// ========================

export const DEFAULT_BUDGET_ALLOCATION = [
    { id: 'fixed', name: 'Custos Fixos', value: 30, color: '#3b82f6' },
    { id: 'freedom', name: 'Liberdade Financeira', value: 25, color: '#818cf8' },
    { id: 'comfort', name: 'Conforto', value: 15, color: '#f472b6' },
    { id: 'goals', name: 'Metas', value: 15, color: '#7c3aed' },
    { id: 'pleasure', name: 'Prazeres', value: 10, color: '#f97316' },
    { id: 'knowledge', name: 'Conhecimento', value: 5, color: '#fbbf24' }
] as const;

// ========================
// LIMITES E VALIDAÇÃO
// ========================

export const LIMITS = {
    MAX_EXPENSE_AMOUNT: 1000000,
    MAX_INCOME_AMOUNT: 10000000,
    MIN_PASSWORD_LENGTH: 6,
    MAX_CARD_NAME_LENGTH: 50,
    MAX_EXPENSE_DESCRIPTION_LENGTH: 100
} as const;
