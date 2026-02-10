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

        const payload = {
            ...expense,
            user_id: userId,
            card_id: cardId,
            amount: Number(expense.amount) || 0
        };

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

        try {
            Logger.finance('Atualizando despesa', expenseId);
            const { error } = await supabase
                .from('expenses')
                .update(expense)
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
