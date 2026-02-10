/**
 * Hook para gerenciar rendas do usuário
 */

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Income } from '../types/models';
import Logger from '../core/Logger';
import EventBus from '../core/EventBus';
import { EVENTS } from '../core/constants';

interface UseIncomesReturn {
    incomes: Income[];
    addIncome: (income: Partial<Income>) => Promise<void>;
    updateIncome: (id: string, income: Partial<Income>) => Promise<void>;
    deleteIncome: (id: string) => Promise<void>;
    fetchIncomes: () => Promise<void>;
}

export function useIncomes(userId: string | undefined, selectedMonth: number): UseIncomesReturn {
    const [incomes, setIncomes] = useState<Income[]>([]);

    const fetchIncomes = useCallback(async () => {
        if (!userId) return;

        try {
            Logger.finance('Buscando rendas do usuário');
            const { data, error } = await supabase
                .from('incomes')
                .select('*')
                .eq('user_id', userId);

            if (error) throw error;

            const parsedIncomes = (data || []).map((i: any) => ({
                ...i,
                amount: Number(i.amount)
            }));

            setIncomes(parsedIncomes);
            Logger.finance(`${parsedIncomes.length} rendas carregadas`);
        } catch (error) {
            Logger.finance('Erro ao buscar rendas', error);
        }
    }, [userId]);

    const addIncome = async (income: Partial<Income>): Promise<void> => {
        if (!userId) return;

        const payload = {
            user_id: userId,
            name: income.name || 'Nova Renda',
            amount: Number(income.amount) || 0,
            recurring: income.recurring ?? false,
            month: income.month ?? selectedMonth
        };

        try {
            Logger.finance('Adicionando renda', payload);
            const { data, error } = await supabase
                .from('incomes')
                .insert([payload])
                .select();

            if (error) throw error;

            if (data) {
                const newIncome = { ...data[0], amount: Number(data[0].amount) };
                setIncomes(prev => [...prev, newIncome]);
                EventBus.emit(EVENTS.INCOME_ADDED, newIncome);
                Logger.finance('Renda adicionada com sucesso', newIncome.id);
            }
        } catch (error) {
            Logger.finance('Erro ao adicionar renda', error);
        }
    };

    const updateIncome = async (id: string, income: Partial<Income>): Promise<void> => {
        if (!userId) return;

        const payload = {
            name: income.name,
            amount: Number(income.amount) || 0,
            recurring: income.recurring,
            month: income.month ?? selectedMonth
        };

        try {
            Logger.finance('Atualizando renda', id);
            const { error } = await supabase
                .from('incomes')
                .update(payload)
                .eq('id', id)
                .eq('user_id', userId);

            if (error) throw error;

            await fetchIncomes();
            EventBus.emit(EVENTS.INCOME_UPDATED, { id, ...payload });
            Logger.finance('Renda atualizada com sucesso');
        } catch (error) {
            Logger.finance('Erro ao atualizar renda', error);
        }
    };

    const deleteIncome = async (id: string): Promise<void> => {
        if (!userId) return;

        try {
            Logger.finance('Deletando renda', id);
            const { error } = await supabase
                .from('incomes')
                .delete()
                .eq('id', id)
                .eq('user_id', userId);

            if (error) throw error;

            setIncomes(prev => prev.filter(i => i.id !== id));
            EventBus.emit(EVENTS.INCOME_DELETED, id);
            Logger.finance('Renda deletada com sucesso');
        } catch (error) {
            Logger.finance('Erro ao deletar renda', error);
        }
    };

    return {
        incomes,
        addIncome,
        updateIncome,
        deleteIncome,
        fetchIncomes
    };
}
