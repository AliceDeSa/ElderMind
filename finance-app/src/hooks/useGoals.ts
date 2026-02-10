/**
 * Hook para gerenciar metas financeiras
 */

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { FinancialGoal } from '../types/models';
import Logger from '../core/Logger';
import EventBus from '../core/EventBus';
import { EVENTS } from '../core/constants';

interface UseGoalsReturn {
    financialGoals: FinancialGoal[];
    addGoal: (goal: Partial<FinancialGoal>) => Promise<void>;
    updateGoal: (id: string, goal: Partial<FinancialGoal>) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
    fetchGoals: () => Promise<void>;
}

export function useGoals(userId: string | undefined): UseGoalsReturn {
    const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([]);

    const fetchGoals = useCallback(async () => {
        if (!userId) return;

        try {
            Logger.finance('Buscando metas financeiras');
            const { data, error } = await supabase
                .from('financial_goals')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: true });

            if (error) throw error;

            setFinancialGoals(data || []);
            Logger.finance(`${(data || []).length} metas carregadas`);
        } catch (error) {
            Logger.finance('Erro ao buscar metas', error);
        }
    }, [userId]);

    const addGoal = async (goal: Partial<FinancialGoal>): Promise<void> => {
        if (!userId) return;

        const payload = {
            user_id: userId,
            title: goal.title || 'Nova Meta',
            target_amount: Number(goal.target_amount) || 0,
            current_amount: 0,
            deadline: goal.deadline || new Date().toISOString(),
            category: goal.category || 'geral',
            icon: goal.icon
        };

        try {
            Logger.finance('Adicionando meta', payload);
            const { data, error } = await supabase
                .from('financial_goals')
                .insert([payload])
                .select();

            if (error) throw error;

            if (data) {
                setFinancialGoals(prev => [...prev, data[0]]);
                EventBus.emit(EVENTS.GOAL_UPDATED);
                Logger.finance('Meta adicionada com sucesso', data[0].id);
            }
        } catch (error) {
            Logger.finance('Erro ao adicionar meta', error);
        }
    };

    const updateGoal = async (id: string, goal: Partial<FinancialGoal>): Promise<void> => {
        if (!userId) return;

        const payload: any = {};
        if (goal.title !== undefined) payload.title = goal.title;
        if (goal.target_amount !== undefined) payload.target_amount = Number(goal.target_amount);
        if (goal.current_amount !== undefined) payload.current_amount = Number(goal.current_amount);
        if (goal.deadline !== undefined) payload.deadline = goal.deadline;
        if (goal.category !== undefined) payload.category = goal.category;
        if (goal.icon !== undefined) payload.icon = goal.icon;

        try {
            Logger.finance('Atualizando meta', id);
            const { error } = await supabase
                .from('financial_goals')
                .update(payload)
                .eq('id', id)
                .eq('user_id', userId);

            if (error) throw error;

            await fetchGoals();
            EventBus.emit(EVENTS.GOAL_UPDATED);
            Logger.finance('Meta atualizada com sucesso');
        } catch (error) {
            Logger.finance('Erro ao atualizar meta', error);
        }
    };

    const deleteGoal = async (id: string): Promise<void> => {
        if (!userId) return;

        try {
            Logger.finance('Deletando meta', id);
            const { error } = await supabase
                .from('financial_goals')
                .delete()
                .eq('id', id)
                .eq('user_id', userId);

            if (error) throw error;

            setFinancialGoals(prev => prev.filter(g => g.id !== id));
            EventBus.emit(EVENTS.GOAL_UPDATED);
            Logger.finance('Meta deletada com sucesso');
        } catch (error) {
            Logger.finance('Erro ao deletar meta', error);
        }
    };

    return {
        financialGoals,
        addGoal,
        updateGoal,
        deleteGoal,
        fetchGoals
    };
}
