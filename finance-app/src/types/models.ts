/**
 * Tipos e Interfaces Globais do Sistema
 */

// ========================
// AUTENTICAÇÃO
// ========================

export interface User {
    id: string;
    email?: string;
    user_metadata?: {
        name?: string;
        avatar_url?: string;
    };
}

// ========================
// FINANÇAS
// ========================

export interface Income {
    id: string;
    user_id: string;
    name: string;
    amount: number;
    recurring: boolean;
    month: number;
    created_at?: string;
}

export interface Card {
    id: string;
    user_id: string;
    name: string;
    limit: number;
    limit_val?: number; // Database field name
    due_date: number;
    dueDate?: number; // Frontend alias
    expenses: Expense[];
}

export interface Expense {
    id: string;
    user_id: string;
    card_id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    installments: string;
    budget_id?: string;
    budgetId?: string; // Frontend alias
    tag?: string;
}

export interface BudgetAllocation {
    id: string;
    user_id: string;
    name: string;
    value: number;
    color: string;
}

export interface FinancialGoal {
    id: string;
    user_id: string;
    title: string;
    target_amount: number;
    current_amount: number;
    deadline: string;
    category: string;
    icon?: string;
    created_at?: string;
}

// ========================
// EDUCAÇÃO
// ========================

export interface Lesson {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    content: string;
    level: string;
    duration: string;
    tag: string;
    color: string;
    bgColor: string;
    icon: any; // React Component
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface EducationProgress {
    lessonsCompleted: string[];
    quizzesCompleted: { quizId: string; score: number }[];
}

// ========================
// SUMMARY & STATS
// ========================

export interface FinanceSummary {
    income: number;
    expense: number;
    balance: number;
}

export interface YearlyStats {
    name: string;
    index: number;
    income: number;
    expense: number;
    profit: number;
    [cardName: string]: number | string;
}

// ========================
// EVENTOS
// ========================

export interface AuthStateChangedEvent {
    user: User | null;
}

export interface FinanceDataUpdatedEvent {
    type: 'income' | 'expense' | 'card' | 'goal' | 'budget';
}

export interface NotificationEvent {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
}
