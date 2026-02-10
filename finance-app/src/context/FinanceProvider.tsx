/**
 * FinanceProvider - Agregador leve de todos os hooks financeiros
 * Substitui o monolito FinanceContext.jsx (367 linhas) por uma arquitetura modular
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useIncomes } from '../hooks/useIncomes';
import { useCards } from '../hooks/useCards';
import { useExpenses } from '../hooks/useExpenses';
import { useGoals } from '../hooks/useGoals';
import { useBudget } from '../hooks/useBudget';
import { useEducation } from '../hooks/useEducation';
import type { Card, Income, Expense, BudgetAllocation, FinancialGoal, EducationProgress, FinanceSummary, YearlyStats } from '../types/models';
import Logger from '../core/Logger';

interface FinanceContextValue {
    // State
    incomes: Income[];
    expenses: Expense[];
    cards: Card[];
    financialGoals: FinancialGoal[];
    budgetAllocation: BudgetAllocation[];
    educationProgress: EducationProgress;
    selectedMonth: number;
    setSelectedMonth: (month: number) => void;
    selectedYear: number;
    setSelectedYear: (year: number) => void;
    loading: boolean;

    // Income actions
    addIncome: (income: Partial<Income>) => Promise<void>;
    updateIncome: (id: string, income: Partial<Income>) => Promise<void>;
    deleteIncome: (id: string) => Promise<void>;

    // Card actions
    addCard: (card: Partial<Card>) => Promise<void>;
    setCards: (cards: Card[]) => void;

    // Expense actions
    addExpense: (cardId: string, expense: Partial<Expense>) => Promise<{ success: boolean; error?: any }>;
    updateExpense: (expenseId: string, expense: Partial<Expense>) => Promise<{ success: boolean; error?: any }>;
    deleteExpense: (expenseId: string) => Promise<{ success: boolean; error?: any }>;

    // Goal actions
    addGoal: (goal: Partial<FinancialGoal>) => Promise<void>;
    updateGoal: (id: string, goal: Partial<FinancialGoal>) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;

    // Budget actions
    updateBudgetAllocation: (newAllocation: BudgetAllocation[]) => Promise<void>;

    // Education actions
    completeLesson: (lessonId: string) => void;
    submitQuizScore: (quizId: string, score: number) => void;

    // Helper functions
    getSummary: () => FinanceSummary;
    getYearlyStats: () => YearlyStats[];
    refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

interface FinanceProviderProps {
    children: ReactNode;
}

export function FinanceProvider({ children }: FinanceProviderProps): JSX.Element {
    const { user } = useAuth();
    const userId = user?.id;

    // Filter states
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);

    // Specialized hooks
    const incomesHook = useIncomes(userId, selectedMonth);
    const cardsHook = useCards(userId);
    const goalsHook = useGoals(userId);
    const budgetHook = useBudget(userId);
    const educationHook = useEducation();
    const expensesHook = useExpenses(userId, cardsHook.fetchCards);

    // Fetch all data on mount
    const fetchData = async (): Promise<void> => {
        if (!userId) return;

        setLoading(true);
        Logger.finance('Iniciando carregamento de dados financeiros');

        try {
            await Promise.all([
                incomesHook.fetchIncomes(),
                cardsHook.fetchCards(),
                goalsHook.fetchGoals(),
                budgetHook.fetchBudget()
            ]);
            Logger.finance('Dados carregados com sucesso');
        } catch (error) {
            Logger.finance('Erro ao carregar dados', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]);

    // Helper: Get monthly summary
    const getSummary = (): FinanceSummary => {
        const filteredIncomes = incomesHook.incomes.filter(
            i => i.recurring || i.month === selectedMonth
        );
        const filteredExpenses = cardsHook.expenses.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === selectedMonth;
        });

        const totalIncome = filteredIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const totalExpense = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

        return {
            income: totalIncome,
            expense: totalExpense,
            balance: totalIncome - totalExpense
        };
    };

    // Helper: Get yearly statistics
    const getYearlyStats = (): YearlyStats[] => {
        const monthsNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        return monthsNames.map((name, index) => {
            const monthlyExpenses = cardsHook.expenses.filter(e => {
                const d = new Date(e.date);
                return d.getMonth() === index;
            });

            const monthlyIncomes = incomesHook.incomes.filter(
                i => i.recurring || i.month === index
            );

            const totalIncome = monthlyIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
            const totalExpense = monthlyExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

            const stats: YearlyStats = {
                name,
                index,
                income: totalIncome,
                expense: totalExpense,
                profit: totalIncome - totalExpense
            };

            // Add per-card stats
            cardsHook.cards.forEach(card => {
                const total = monthlyExpenses
                    .filter(e => e.card_id === card.id)
                    .reduce((acc, curr) => acc + Number(curr.amount), 0);
                stats[card.name] = total;
            });

            return stats;
        });
    };

    const contextValue: FinanceContextValue = {
        // State
        incomes: incomesHook.incomes,
        expenses: cardsHook.expenses,
        cards: cardsHook.cards,
        financialGoals: goalsHook.financialGoals,
        budgetAllocation: budgetHook.budgetAllocation,
        educationProgress: educationHook.educationProgress,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        loading,

        // Income actions
        addIncome: incomesHook.addIncome,
        updateIncome: incomesHook.updateIncome,
        deleteIncome: incomesHook.deleteIncome,

        // Card actions
        addCard: cardsHook.addCard,
        setCards: cardsHook.setCards,

        // Expense actions
        addExpense: expensesHook.addExpense,
        updateExpense: expensesHook.updateExpense,
        deleteExpense: expensesHook.deleteExpense,

        // Goal actions
        addGoal: goalsHook.addGoal,
        updateGoal: goalsHook.updateGoal,
        deleteGoal: goalsHook.deleteGoal,

        // Budget actions
        updateBudgetAllocation: budgetHook.updateBudgetAllocation,

        // Education actions
        completeLesson: educationHook.completeLesson,
        submitQuizScore: educationHook.submitQuizScore,

        // Helpers
        getSummary,
        getYearlyStats,
        refreshData: fetchData
    };

    return (
        <FinanceContext.Provider value={contextValue}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance(): FinanceContextValue {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
