/**
 * GroceryPage - Lista de Compras
 * Página principal para gerenciar listas de compras tipo Acordeão (Spreadsheet)
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShoppingLists } from './hooks/useShoppingLists';
import ShoppingListCard from './components/ShoppingListCard';

export default function GroceryPage() {
    const { t } = useTranslation('grocery');
    const { user } = useAuth();
    const {
        lists,
        loading,
        createList,
        deleteList,
        addItem,
        updateItem,
        deleteItem,
        reorderItems,
        toggleItemPurchased
    } = useShoppingLists(user?.id);

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
        }
    };

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

    // List View - Accordion Cards
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <ShoppingCart className="text-primary" size={32} />
                            {t('title')}
                        </h1>
                        <p className="text-textSecondary mt-1">Gerencie suas compras de forma rápida e inteligente.</p>
                    </div>

                    <button
                        onClick={() => setIsCreatingList(true)}
                        disabled={isCreatingList}
                        className="px-4 py-3 md:px-6 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all shadow-lg hover:shadow-primary/30 font-bold flex items-center gap-2 disabled:opacity-50 whitespace-nowrap flex-shrink-0"
                    >
                        <Plus size={20} />
                        {t('newList')}
                    </button>
                </div>

                {/* Create List Form Inline */}
                {isCreatingList && (
                    <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 mb-6 shadow-xl animate-fade-in">
                        <form onSubmit={handleCreateList} className="flex gap-3">
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="Ex: Compras do Mês..."
                                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-white placeholder-textSecondary focus:outline-none focus:border-primary transition-all"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white rounded-xl transition-colors font-bold"
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
                                className="px-6 py-3 bg-background hover:bg-background/80 text-textSecondary hover:text-white border border-border/50 rounded-xl transition-colors"
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                )}

                {/* Lists Stack */}
                {lists.length === 0 ? (
                    <div className="bg-surfaceCard p-12 rounded-2xl border border-dashed border-border/50 text-center opacity-80">
                        <ShoppingCart className="mx-auto text-textSecondary mb-4" size={64} />
                        <h3 className="text-xl font-bold text-white mb-2">{t('messages.noLists')}</h3>
                        <p className="text-textSecondary mb-8 max-w-sm mx-auto">{t('messages.createFirstList')}</p>
                        <button
                            onClick={() => setIsCreatingList(true)}
                            className="px-6 py-3 bg-background border border-border/50 hover:bg-surfaceCard text-white rounded-xl transition-all font-bold inline-flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Criar Nova Lista
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {lists.map(list => (
                            <ShoppingListCard
                                key={list.id}
                                list={list}
                                onDelete={deleteList}
                                onAddItem={addItem}
                                onUpdateItem={updateItem}
                                onDeleteItem={deleteItem}
                                onReorderItems={reorderItems}
                                onTogglePurchased={toggleItemPurchased}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
