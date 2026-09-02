/**
 * Hook para gerenciar despesas
 */

import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Expense } from '../types/models';
import Logger from '../core/Logger';
import EventBus from '../core/EventBus';
import { EVENTS } from '../core/constants';

interface UseExpensesReturn {
    addExpense: (cardId: string, expense: Partial<Expense>) => Promise<{ success: boolean; error?: any }>;
    updateExpense: (expenseId: string, expense: Partial<Expense>) => Promise<{ success: boolean; error?: any }>;
    deleteExpense: (expenseId: string) => Promise<{ success: boolean; error?: any }>;
}

export function useExpenses(
    userId: string | undefined,
    refreshCards: () => Promise<void>
): UseExpensesReturn {

    const addExpense = useCallback(async (
        cardId: string,
        expense: Partial<Expense>
    ): Promise<{ success: boolean; error?: any }> => {
        if (!userId) return { success: false };

        const payload: any = {
            description: expense.description,
            amount: Number(expense.amount) || 0,
            category: expense.category,
            installments: expense.installments,
            budget_id: expense.budgetId,
            tag: expense.tag,
            user_id: userId,
            card_id: cardId
        };
        if (expense.date) payload.date = expense.date;

        try {
            Logger.finance('Adicionando despesa', payload);
            const { error } = await supabase.from('expenses').insert([payload]);

            if (error) throw error;

            await refreshCards();
            EventBus.emit(EVENTS.EXPENSE_ADDED, payload);
            Logger.finance('Despesa adicionada com sucesso');

            return { success: true };
        } catch (error) {
            Logger.finance('Erro ao adicionar despesa', error);
            return { success: false, error };
        }
    }, [userId, refreshCards]);

    const updateExpense = useCallback(async (
        expenseId: string,
        expense: Partial<Expense>
    ): Promise<{ success: boolean; error?: any }> => {
        if (!userId) return { success: false };

        const payload: any = {};
        if (expense.description !== undefined) payload.description = expense.description;
        if (expense.amount !== undefined) payload.amount = Number(expense.amount);
        if (expense.category !== undefined) payload.category = expense.category;
        if (expense.installments !== undefined) payload.installments = expense.installments;
        if (expense.budgetId !== undefined) payload.budget_id = expense.budgetId;
        if (expense.tag !== undefined) payload.tag = expense.tag;
        if (expense.date !== undefined) payload.date = expense.date;
        if (expense.card_id !== undefined) payload.card_id = expense.card_id;

        try {
            Logger.finance('Atualizando despesa', expenseId);
            const { error } = await supabase
                .from('expenses')
                .update(payload)
                .eq('id', expenseId)
                .eq('user_id', userId);

            if (error) throw error;

            await refreshCards();
            EventBus.emit(EVENTS.EXPENSE_UPDATED, { id: expenseId, ...expense });
            Logger.finance('Despesa atualizada com sucesso');

            return { success: true };
        } catch (error) {
            Logger.finance('Erro ao atualizar despesa', error);
            return { success: false, error };
        }
    }, [userId, refreshCards]);

    const deleteExpense = useCallback(async (
        expenseId: string
    ): Promise<{ success: boolean; error?: any }> => {
        if (!userId) return { success: false };

        try {
            Logger.finance('Deletando despesa', expenseId);
            const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', expenseId)
                .eq('user_id', userId);

            if (error) throw error;

            await refreshCards();
            EventBus.emit(EVENTS.EXPENSE_DELETED, expenseId);
            Logger.finance('Despesa deletada com sucesso');

            return { success: true };
        } catch (error) {
            Logger.finance('Erro ao deletar despesa', error);
            return { success: false, error };
        }
    }, [userId, refreshCards]);

    return {
        addExpense,
        updateExpense,
        deleteExpense
    };
}
