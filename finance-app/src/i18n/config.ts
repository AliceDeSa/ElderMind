/**
 * i18n Configuration
 * Configures i18next for multi-language support
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import commonPT from './locales/pt-BR/common.json';
import authPT from './locales/pt-BR/auth.json';
import dashboardPT from './locales/pt-BR/dashboard.json';
import financePT from './locales/pt-BR/finance.json';
import educationPT from './locales/pt-BR/education.json';
import goalsPT from './locales/pt-BR/goals.json';
import groceryPT from './locales/pt-BR/grocery.json';

import commonEN from './locales/en-US/common.json';
import authEN from './locales/en-US/auth.json';
import dashboardEN from './locales/en-US/dashboard.json';
import financeEN from './locales/en-US/finance.json';
import educationEN from './locales/en-US/education.json';
import goalsEN from './locales/en-US/goals.json';
import groceryEN from './locales/en-US/grocery.json';

const resources = {
    'pt-BR': {
        common: commonPT,
        auth: authPT,
        dashboard: dashboardPT,
        finance: financePT,
        education: educationPT,
        goals: goalsPT,
        grocery: groceryPT
    },
    'en-US': {
        common: commonEN,
        auth: authEN,
        dashboard: dashboardEN,
        finance: financeEN,
        education: educationEN,
        goals: goalsEN,
        grocery: groceryEN
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'pt-BR',
        defaultNS: 'common',
        ns: ['common', 'auth', 'dashboard', 'finance', 'education', 'goals', 'grocery'],

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },

        interpolation: {
            escapeValue: false // React already escapes
        },

        react: {
            useSuspense: false
        }
    });

export default i18n;
