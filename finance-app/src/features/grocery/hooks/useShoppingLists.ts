/**
 * useShoppingLists Hook
 * Hook para gerenciar listas de compras e itens
 */

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import logger from '../../../core/Logger';
import type {
    ShoppingList,
    ShoppingItem,
    ShoppingListWithItems,
    CreateShoppingListInput,
    UpdateShoppingListInput,
    CreateShoppingItemInput,
    UpdateShoppingItemInput,
    ShoppingListStats
} from '../types/grocery.types';

export function useShoppingLists(userId: string | undefined) {
    const [lists, setLists] = useState<ShoppingListWithItems[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all lists with items
    const fetchLists = async () => {
        if (!userId) {
            setLists([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Fetch lists
            const { data: listsData, error: listsError } = await supabase
                .from('shopping_lists')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (listsError) throw listsError;

            // Fetch items for each list
            const listsWithItems: ShoppingListWithItems[] = await Promise.all(
                (listsData || []).map(async (list) => {
                    const { data: itemsData, error: itemsError } = await supabase
                        .from('shopping_items')
                        .select('*')
                        .eq('list_id', list.id)
                        .order('category', { ascending: true });

                    if (itemsError) {
                        logger.finance('Error fetching items:', itemsError);
                        return { ...list, items: [] };
                    }

                    return { ...list, items: itemsData || [] };
                })
            );

            setLists(listsWithItems);
            logger.finance(`Loaded ${listsWithItems.length} shopping lists`);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load lists';
            setError(message);
            logger.finance('Error fetching shopping lists:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create new list
    const createList = async (input: CreateShoppingListInput): Promise<ShoppingList | null> => {
        if (!userId) return null;

        try {
            const { data, error } = await supabase
                .from('shopping_lists')
                .insert([
                    {
                        user_id: userId,
                        name: input.name,
                        status: 'planning'
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            logger.finance('Shopping list created:', data.name);
            await fetchLists();
            return data;
        } catch (err) {
            logger.finance('Error creating list:', err);
            return null;
        }
    };

    // Update list
    const updateList = async (listId: string, input: UpdateShoppingListInput): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('shopping_lists')
                .update(input)
                .eq('id', listId);

            if (error) throw error;

            logger.finance('Shopping list updated');
            await fetchLists();
            return true;
        } catch (err) {
            logger.finance('Error updating list:', err);
            return false;
        }
    };

    // Delete list
    const deleteList = async (listId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('shopping_lists')
                .delete()
                .eq('id', listId);

            if (error) throw error;

            logger.finance('Shopping list deleted');
            await fetchLists();
            return true;
        } catch (err) {
            logger.finance('Error deleting list:', err);
            return false;
        }
    };

    // Add item to list
    const addItem = async (input: CreateShoppingItemInput): Promise<ShoppingItem | null> => {
        try {
            const { data, error } = await supabase
                .from('shopping_items')
                .insert([input])
                .select()
                .single();

            if (error) throw error;

            logger.finance('Item added to list:', data.name);
            await fetchLists();
            return data;
        } catch (err) {
            logger.finance('Error adding item:', err);
            return null;
        }
    };

    // Update item
    const updateItem = async (itemId: string, input: UpdateShoppingItemInput): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('shopping_items')
                .update(input)
                .eq('id', itemId);

            if (error) throw error;

            logger.finance('Item updated');
            await fetchLists();
            return true;
        } catch (err) {
            logger.finance('Error updating item:', err);
            return false;
        }
    };

    // Delete item
    const deleteItem = async (itemId: string): Promise<boolean> => {
        try {
            const { error } = await supabase
                .from('shopping_items')
                .delete()
                .eq('id', itemId);

            if (error) throw error;

            logger.finance('Item deleted');
            await fetchLists();
            return true;
        } catch (err) {
            logger.finance('Error deleting item:', err);
            return false;
        }
    };

    // Toggle item purchased status
    const toggleItemPurchased = async (itemId: string, isPurchased: boolean): Promise<boolean> => {
        return updateItem(itemId, { is_purchased: isPurchased });
    };

    // Get statistics
    const getStats = (): ShoppingListStats => {
        const totalLists = lists.length;
        const activeLists = lists.filter(l => l.status !== 'completed').length;
        const completedLists = lists.filter(l => l.status === 'completed').length;

        const totalSaved = lists
            .filter(l => l.status === 'completed')
            .reduce((sum, list) => sum + (list.estimated_total - list.actual_total), 0);

        const averageSavings = completedLists > 0 ? totalSaved / completedLists : 0;

        return {
            totalLists,
            activeLists,
            completedLists,
            totalSaved,
            averageSavings
        };
    };

    // Get active list (first planning or shopping list)
    const getActiveList = (): ShoppingListWithItems | null => {
        return lists.find(l => l.status === 'planning' || l.status === 'shopping') || null;
    };

    // Load lists on mount and when userId changes
    useEffect(() => {
        fetchLists();
    }, [userId]);

    return {
        lists,
        loading,
        error,
        createList,
        updateList,
        deleteList,
        addItem,
        updateItem,
        deleteItem,
        toggleItemPurchased,
        getStats,
        getActiveList,
        refetch: fetchLists
    };
}
