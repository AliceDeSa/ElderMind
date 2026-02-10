import { Achievement } from '../types/achievements';

export const ACHIEVEMENTS: Achievement[] = [
    // Milestones
    {
        key: 'first_steps',
        title_pt: 'Primeiros Passos',
        title_en: 'First Steps',
        description_pt: 'Complete sua primeira lição na Árvore de Investimentos',
        description_en: 'Complete your first lesson in the Investment Tree',
        icon: '🌱',
        category: 'milestone',
        requirement: { type: 'nodes_completed', value: 1 }
    },
    {
        key: 'bookworm',
        title_pt: 'Traça de Livros',
        title_en: 'Bookworm',
        description_pt: 'Leia seu primeiro trecho na Biblioteca',
        description_en: 'Read your first excerpt in the Library',
        icon: '📖',
        category: 'milestone',
        requirement: { type: 'excerpts_read', value: 1 }
    },
    {
        key: 'focused',
        title_pt: 'Focado',
        title_en: 'Focused',
        description_pt: 'Complete 5 lições',
        description_en: 'Complete 5 lessons',
        icon: '🎯',
        category: 'milestone',
        requirement: { type: 'nodes_completed', value: 5 }
    },
    {
        key: 'scholar',
        title_pt: 'Estudioso',
        title_en: 'Scholar',
        description_pt: 'Complete 10 lições',
        description_en: 'Complete 10 lessons',
        icon: '🏆',
        category: 'milestone',
        requirement: { type: 'nodes_completed', value: 10 }
    },
    {
        key: 'well_read',
        title_pt: 'Bem Lido',
        title_en: 'Well Read',
        description_pt: 'Leia 25 trechos',
        description_en: 'Read 25 excerpts',
        icon: '📚',
        category: 'milestone',
        requirement: { type: 'excerpts_read', value: 25 }
    },
    {
        key: 'graduate',
        title_pt: 'Graduado',
        title_en: 'Graduate',
        description_pt: 'Leia 100 trechos',
        description_en: 'Read 100 excerpts',
        icon: '🎓',
        category: 'milestone',
        requirement: { type: 'excerpts_read', value: 100 }
    },
    {
        key: 'master',
        title_pt: 'Mestre',
        title_en: 'Master',
        description_pt: 'Complete 60 lições',
        description_en: 'Complete 60 lessons',
        icon: '👑',
        category: 'milestone',
        requirement: { type: 'nodes_completed', value: 60 }
    },
    {
        key: 'completionist',
        title_pt: 'Complecionista',
        title_en: 'Completionist',
        description_pt: 'Leia todos os 180 trechos',
        description_en: 'Read all 180 excerpts',
        icon: '💎',
        category: 'milestone',
        requirement: { type: 'excerpts_read', value: 180 }
    },

    // Streaks
    {
        key: 'on_fire',
        title_pt: 'Em Chamas',
        title_en: 'On Fire',
        description_pt: 'Mantenha uma sequência de 3 dias',
        description_en: 'Maintain a 3-day streak',
        icon: '🔥',
        category: 'streak',
        requirement: { type: 'streak_days', value: 3 }
    },
    {
        key: 'consistent',
        title_pt: 'Consistente',
        title_en: 'Consistent',
        description_pt: 'Mantenha uma sequência de 7 dias',
        description_en: 'Maintain a 7-day streak',
        icon: '⚡',
        category: 'streak',
        requirement: { type: 'streak_days', value: 7 }
    },
    {
        key: 'dedicated',
        title_pt: 'Dedicado',
        title_en: 'Dedicated',
        description_pt: 'Mantenha uma sequência de 14 dias',
        description_en: 'Maintain a 14-day streak',
        icon: '💪',
        category: 'streak',
        requirement: { type: 'streak_days', value: 14 }
    },
    {
        key: 'unstoppable',
        title_pt: 'Imparável',
        title_en: 'Unstoppable',
        description_pt: 'Mantenha uma sequência de 30 dias',
        description_en: 'Maintain a 30-day streak',
        icon: '🌟',
        category: 'streak',
        requirement: { type: 'streak_days', value: 30 }
    },

    // Mastery (Categories)
    {
        key: 'value_investor',
        title_pt: 'Investidor de Valor',
        title_en: 'Value Investor',
        description_pt: 'Complete todas as lições de Value Investing',
        description_en: 'Complete all Value Investing lessons',
        icon: '💰',
        category: 'mastery',
        requirement: { type: 'category_complete', value: 1, category: 'value_investing' }
    },
    {
        key: 'finance_pro',
        title_pt: 'Pro em Finanças',
        title_en: 'Finance Pro',
        description_pt: 'Complete todas as lições de Finanças Pessoais',
        description_en: 'Complete all Personal Finance lessons',
        icon: '🏦',
        category: 'mastery',
        requirement: { type: 'category_complete', value: 1, category: 'personal_finance' }
    },
    {
        key: 'strategist',
        title_pt: 'Estrategista',
        title_en: 'Strategist',
        description_pt: 'Complete todas as lições de Estratégia',
        description_en: 'Complete all Strategy lessons',
        icon: '🧠',
        category: 'mastery',
        requirement: { type: 'category_complete', value: 1, category: 'strategy' }
    },

    // Special
    {
        key: 'favorite_collector',
        title_pt: 'Colecionador',
        title_en: 'Collector',
        description_pt: 'Favorite 5 livros',
        description_en: 'Favorite 5 books',
        icon: '⭐',
        category: 'special',
        requirement: { type: 'favorites', value: 5 }
    },
    {
        key: 'quiz_master',
        title_pt: 'Mestre do Quiz',
        title_en: 'Quiz Master',
        description_pt: 'Acerte 100% em 5 quizzes',
        description_en: 'Score 100% on 5 quizzes',
        icon: '🎯',
        category: 'special',
        requirement: { type: 'quiz_perfect', value: 5 }
    },
    {
        key: 'fast_learner',
        title_pt: 'Aprendiz Rápido',
        title_en: 'Fast Learner',
        description_pt: 'Complete 5 lições em um dia',
        description_en: 'Complete 5 lessons in one day',
        icon: '🚀',
        category: 'special',
        requirement: { type: 'nodes_completed', value: 5 } // Note: Need logic to check "in one day"
    },
    {
        key: 'explorer',
        title_pt: 'Explorador',
        title_en: 'Explorer',
        description_pt: 'Visite todas as seções do Hub',
        description_en: 'Visit all Hub sections',
        icon: '🌈',
        category: 'special',
        requirement: { type: 'nodes_completed', value: 1 } // Placeholder logic
    },
    {
        key: 'perfectionist',
        title_pt: 'Perfeccionista',
        title_en: 'Perfectionist',
        description_pt: 'Acerte 100% em todos os quizzes disponíveis',
        description_en: 'Score 100% on all available quizzes',
        icon: '💯',
        category: 'special',
        requirement: { type: 'quiz_perfect', value: 10 }
    }
];
