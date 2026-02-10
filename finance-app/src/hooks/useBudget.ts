/**
 * Hook para gerenciar alocação orçamentária
 */

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { BudgetAllocation } from '../types/models';
import { DEFAULT_BUDGET_ALLOCATION } from '../core/constants';
import Logger from '../core/Logger';
import EventBus from '../core/EventBus';
import { EVENTS } from '../core/constants';

interface UseBudgetReturn {
    budgetAllocation: BudgetAllocation[];
    updateBudgetAllocation: (newAllocation: BudgetAllocation[]) => Promise<void>;
    fetchBudget: () => Promise<void>;
}

export function useBudget(userId: string | undefined): UseBudgetReturn {
    const [budgetAllocation, setBudgetAllocation] = useState<BudgetAllocation[]>([]);

    const fetchBudget = useCallback(async () => {
        if (!userId) return;

        try {
            Logger.finance('Buscando alocação orçamentária');
            let { data, error } = await supabase
                .from('budget_allocation')
                .select('*')
                .eq('user_id', userId)
                .order('value', { ascending: false });

            if (error) throw error;

            // Initialize defaults if empty for this user
            if (!data || data.length === 0) {
                Logger.finance('Criando alocação orçamentária padrão');
                const defaults = DEFAULT_BUDGET_ALLOCATION.map(item => ({
                    ...item,
                    user_id: userId
                }));

                const { data: insertedData, error: insertError } = await supabase
                    .from('budget_allocation')
                    .insert(defaults)
                    .select();

                if (insertError) throw insertError;
                data = insertedData || [];
            }

            setBudgetAllocation(data);
            Logger.finance(`Alocação orçamentária carregada: ${data.length} categorias`);
        } catch (error) {
            Logger.finance('Erro ao buscar alocação orçamentária', error);
        }
    }, [userId]);

    const updateBudgetAllocation = async (newAllocation: BudgetAllocation[]): Promise<void> => {
        if (!userId) return;

        try {
            Logger.finance('Atualizando alocação orçamentária');
            setBudgetAllocation(newAllocation);

            // Update each item in Supabase
            for (const item of newAllocation) {
                await supabase
                    .from('budget_allocation')
                    .update({ value: item.value })
                    .eq('id', item.id)
                    .eq('user_id', userId);
            }

            EventBus.emit(EVENTS.BUDGET_UPDATED);
            Logger.finance('Alocação orçamentária atualizada com sucesso');
        } catch (error) {
            Logger.finance('Erro ao atualizar alocação orçamentária', error);
        }
    };

    return {
        budgetAllocation,
        updateBudgetAllocation,
        fetchBudget
    };
}
