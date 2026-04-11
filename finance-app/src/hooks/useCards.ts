/**
 * Hook para gerenciar cartões e suas despesas
 */

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Card, Expense } from '../types/models';
import Logger from '../core/Logger';
import EventBus from '../core/EventBus';
import { EVENTS } from '../core/constants';

interface UseCardsReturn {
    cards: Card[];
    expenses: Expense[];
    addCard: (card: Partial<Card>) => Promise<void>;
    updateCard: (id: string, card: Partial<Card>) => Promise<void>;
    deleteCard: (id: string) => Promise<void>;
    setCards: (cards: Card[]) => void;
    fetchCards: () => Promise<void>;
}

export function useCards(userId: string | undefined): UseCardsReturn {
    const [cards, setCards] = useState<Card[]>([]);

    const fetchCards = useCallback(async () => {
        if (!userId) return;

        try {
            Logger.finance('Buscando cartões e despesas');

            // Fetch cards
            const { data: cardData, error: cardError } = await supabase
                .from('cards')
                .select('*')
                .eq('user_id', userId);

            if (cardError) throw cardError;

            // Fetch expenses
            const { data: expenseData, error: expenseError } = await supabase
                .from('expenses')
                .select('*')
                .eq('user_id', userId);

            if (expenseError) throw expenseError;

            // Merge expenses into cards
            const cardsWithExpenses = (cardData || []).map((card: any) => {
                const cardExpenses = (expenseData || [])
                    .filter((e: any) => e.card_id === card.id)
                    .map((e: any) => ({
                        ...e,
                        amount: Number(e.amount),
                        budgetId: e.budget_id
                    }));

                return {
                    ...card,
                    limit: Number(card.limit_val),
                    expenses: cardExpenses
                };
            });

            setCards(cardsWithExpenses);
            Logger.finance(`${cardsWithExpenses.length} cartões carregados`);
        } catch (error) {
            Logger.finance('Erro ao buscar cartões', error);
        }
    }, [userId]);

    const addCard = async (card: Partial<Card>): Promise<void> => {
        if (!userId) return;

        const payload = {
            user_id: userId,
            name: card.name || 'Novo Cartão',
            limit_val: Number(card.limit) || 0,
            due_date: card.due_date || card.dueDate || 1
        };

        try {
            Logger.finance('Adicionando cartão', payload);
            const { data, error } = await supabase
                .from('cards')
                .insert([payload])
                .select();

            if (error) throw error;

            if (data) {
                const newCard: Card = {
                    ...data[0],
                    limit: Number(data[0].limit_val),
                    expenses: []
                };
                setCards(prev => [...prev, newCard]);
                EventBus.emit(EVENTS.CARD_ADDED, newCard);
                Logger.finance('Cartão adicionado com sucesso', newCard.id);
            }
        } catch (error) {
            Logger.finance('Erro ao adicionar cartão', error);
        }
    };

    const updateCard = async (id: string, card: Partial<Card>): Promise<void> => {
        if (!userId) return;

        const payload: any = {};
        if (card.name) payload.name = card.name;
        if (card.limit) payload.limit_val = Number(card.limit);
        if (card.dueDate) payload.due_date = card.dueDate;

        try {
            Logger.finance('Atualizando cartão', { id, payload });
            const { data, error } = await supabase
                .from('cards')
                .update(payload)
                .eq('id', id)
                .select();

            if (error) throw error;

            if (data && data.length > 0) {
                setCards(prev => prev.map(c => {
                    if (c.id === id) {
                        return {
                            ...c,
                            name: data[0].name,
                            limit: Number(data[0].limit_val),
                            dueDate: data[0].due_date
                        };
                    }
                    return c;
                }));
                Logger.finance('Cartão atualizado com sucesso', id);
            }
        } catch (error) {
            Logger.finance('Erro ao atualizar cartão', error);
        }
    };

    const deleteCard = async (id: string): Promise<void> => {
        if (!userId) return;

        try {
            Logger.finance('Excluindo cartão', id);
            const { error } = await supabase
                .from('cards')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setCards(prev => prev.filter(c => c.id !== id));
            Logger.finance('Cartão excluído com sucesso', id);
        } catch (error) {
            Logger.finance('Erro ao excluir cartão', error);
        }
    };

    // Flatten expenses from all cards
    const expenses = cards.flatMap(c => c.expenses || []);

    return {
        cards,
        expenses,
        addCard,
        updateCard,
        deleteCard,
        setCards,
        fetchCards
    };
}
