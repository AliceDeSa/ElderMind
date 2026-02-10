/**
 * GroceryPage - Lista de Compras
 * Página principal para gerenciar listas de compras
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Plus, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShoppingLists } from './hooks/useShoppingLists';
import ShoppingListCard from './components/ShoppingListCard';
import ShoppingItemRow from './components/ShoppingItemRow';
import AddItemModal from './components/AddItemModal';
import type { ShoppingListWithItems } from './types/grocery.types';

export default function GroceryPage() {
    const { t } = useTranslation('grocery');
    const { user } = useAuth();
    const {
        lists,
        loading,
        createList,
        updateList,
        deleteList,
        addItem,
        updateItem,
        deleteItem,
        toggleItemPurchased
    } = useShoppingLists(user?.id);

    const [selectedList, setSelectedList] = useState<ShoppingListWithItems | null>(null);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isCreatingList, setIsCreatingList] = useState(false);
    const [newListName, setNewListName] = useState('');

    // Handle create new list
    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;

        const list = await createList({ name: newListName.trim() });
        if (list) {
            setNewListName('');
            setIsCreatingList(false);
            // Auto-select new list
            const fullList = lists.find(l => l.id === list.id);
            if (fullList) setSelectedList(fullList);
        }
    };

    // Handle complete shopping
    const handleCompleteShopping = async () => {
        if (!selectedList) return;

        await updateList(selectedList.id, {
            status: 'completed',
            completed_at: new Date().toISOString()
        });

        setSelectedList(null);
    };

    // Handle start shopping
    const handleStartShopping = async () => {
        if (!selectedList) return;
        await updateList(selectedList.id, { status: 'shopping' });
    };

    // Group items by category
    const groupedItems = selectedList?.items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, typeof selectedList.items>) || {};

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <ShoppingCart className="mx-auto text-primary animate-pulse" size={48} />
                    <p className="mt-4 text-textSecondary">{t('common:messages.loading')}</p>
                </div>
            </div>
        );
    }

    // Detail View - Selected List
    if (selectedList) {
        const purchasedCount = selectedList.items.filter(i => i.is_purchased).length;
        const totalItems = selectedList.items.length;
        const allPurchased = totalItems > 0 && purchasedCount === totalItems;

        return (
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setSelectedList(null)}
                            className="flex items-center gap-2 text-textSecondary hover:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                            {t('common:actions.back')}
                        </button>

                        <div className="flex items-center gap-3">
                            {selectedList.status === 'planning' && (
                                <button
                                    onClick={handleStartShopping}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-bold"
                                >
                                    {t('actions.startShopping')}
                                </button>
                            )}

                            {selectedList.status === 'shopping' && allPurchased && (
                                <button
                                    onClick={handleCompleteShopping}
                                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-bold flex items-center gap-2"
                                >
                                    <Check size={20} />
                                    {t('actions.finishShopping')}
                                </button>
                            )}

                            {selectedList.status !== 'completed' && (
                                <button
                                    onClick={() => setIsAddItemModalOpen(true)}
                                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-bold flex items-center gap-2"
                                >
                                    <Plus size={20} />
                                    {t('addItem')}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* List Info */}
                    <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2">{selectedList.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-textSecondary">
                            <span>{t(`status.${selectedList.status}`)}</span>
                            <span>•</span>
                            <span>{t('totals.purchasedItems', { count: purchasedCount, total: totalItems })}</span>
                            <span>•</span>
                            <span>{t('totals.estimated')}: R$ {selectedList.estimated_total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Items by Category */}
                    {totalItems === 0 ? (
                        <div className="bg-surfaceCard p-12 rounded-2xl border border-border/50 text-center">
                            <ShoppingCart className="mx-auto text-textSecondary mb-4" size={48} />
                            <p className="text-textSecondary mb-4">{t('messages.noItems')}</p>
                            <button
                                onClick={() => setIsAddItemModalOpen(true)}
                                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-bold inline-flex items-center gap-2"
                            >
                                <Plus size={20} />
                                {t('addItem')}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(groupedItems).map(([category, items]) => (
                                <div key={category}>
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm">
                                            {t(`categories.${category}`)}
                                        </span>
                                        <span className="text-sm text-textSecondary">
                                            ({items.length})
                                        </span>
                                    </h3>
                                    <div className="space-y-2">
                                        {items.map(item => (
                                            <ShoppingItemRow
                                                key={item.id}
                                                item={item}
                                                onUpdate={updateItem}
                                                onDelete={deleteItem}
                                                onTogglePurchased={toggleItemPurchased}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Item Modal */}
                    <AddItemModal
                        listId={selectedList.id}
                        isOpen={isAddItemModalOpen}
                        onClose={() => setIsAddItemModalOpen(false)}
                        onAdd={addItem}
                    />
                </div>
            </div>
        );
    }

    // List View - All Lists
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <ShoppingCart className="text-primary" size={32} />
                            {t('title')}
                        </h1>
                        <p className="text-textSecondary mt-1">{t('subtitle')}</p>
                    </div>

                    <button
                        onClick={() => setIsCreatingList(true)}
                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-bold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        {t('newList')}
                    </button>
                </div>

                {/* Create List Form */}
                {isCreatingList && (
                    <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 mb-6">
                        <form onSubmit={handleCreateList} className="flex gap-3">
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder={t('listNamePlaceholder')}
                                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:outline-none focus:border-primary"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-bold"
                                disabled={!newListName.trim()}
                            >
                                {t('common:actions.create')}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreatingList(false);
                                    setNewListName('');
                                }}
                                className="px-6 py-3 bg-background hover:bg-background/80 text-white rounded-lg transition-colors"
                            >
                                {t('common:actions.cancel')}
                            </button>
                        </form>
                    </div>
                )}

                {/* Lists Grid */}
                {lists.length === 0 ? (
                    <div className="bg-surfaceCard p-12 rounded-2xl border border-border/50 text-center">
                        <ShoppingCart className="mx-auto text-textSecondary mb-4" size={64} />
                        <h3 className="text-xl font-bold text-white mb-2">{t('messages.noLists')}</h3>
                        <p className="text-textSecondary mb-6">{t('messages.createFirstList')}</p>
                        <button
                            onClick={() => setIsCreatingList(true)}
                            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-bold inline-flex items-center gap-2"
                        >
                            <Plus size={20} />
                            {t('newList')}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lists.map(list => (
                            <ShoppingListCard
                                key={list.id}
                                list={list}
                                onClick={() => setSelectedList(list)}
                                onDelete={deleteList}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
