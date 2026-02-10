/**
 * Grocery/Shopping List Types
 * Tipos para gerenciamento de listas de compras
 */

export type ShoppingListStatus = 'planning' | 'shopping' | 'completed';

export type ItemCategory =
    | 'frutas'
    | 'verduras'
    | 'carnes'
    | 'laticínios'
    | 'padaria'
    | 'limpeza'
    | 'higiene'
    | 'bebidas'
    | 'congelados'
    | 'outros';

export type ItemUnit = 'kg' | 'g' | 'L' | 'mL' | 'un' | 'dz' | 'pct';

export interface ShoppingList {
    id: string;
    user_id: string;
    name: string;
    estimated_total: number;
    actual_total: number;
    status: ShoppingListStatus;
    created_at: string;
    completed_at?: string;
    updated_at: string;
}

export interface ShoppingItem {
    id: string;
    list_id: string;
    name: string;
    category: ItemCategory;
    quantity: number;
    unit: ItemUnit;
    estimated_price: number;
    actual_price?: number;
    is_purchased: boolean;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ShoppingListWithItems extends ShoppingList {
    items: ShoppingItem[];
}

export interface CreateShoppingListInput {
    name: string;
}

export interface UpdateShoppingListInput {
    name?: string;
    status?: ShoppingListStatus;
    completed_at?: string;
}

export interface CreateShoppingItemInput {
    list_id: string;
    name: string;
    category?: ItemCategory;
    quantity?: number;
    unit?: ItemUnit;
    estimated_price?: number;
    notes?: string;
}

export interface UpdateShoppingItemInput {
    name?: string;
    category?: ItemCategory;
    quantity?: number;
    unit?: ItemUnit;
    estimated_price?: number;
    actual_price?: number;
    is_purchased?: boolean;
    notes?: string;
}

export interface ShoppingListStats {
    totalLists: number;
    activeLists: number;
    completedLists: number;
    totalSaved: number; // diferença entre estimado e real
    averageSavings: number;
}

export interface CategoryGroup {
    category: ItemCategory;
    items: ShoppingItem[];
    estimatedTotal: number;
    actualTotal: number;
}
