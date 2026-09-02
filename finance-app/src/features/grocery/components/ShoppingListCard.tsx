/**
 * ShoppingListCard Component
 * Card para exibir uma lista de compras e atuar como accordion de itens
 */

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { ShoppingListWithItems, CreateShoppingItemInput, UpdateShoppingItemInput } from '../types/grocery.types';
import ShoppingItemRow from './ShoppingItemRow';
import AutoSaveNewItemRow from './AutoSaveNewItemRow';

interface ShoppingListCardProps {
    list: ShoppingListWithItems;
    onDelete: (listId: string) => Promise<boolean>;
    onAddItem: (input: CreateShoppingItemInput) => Promise<any>;
    onUpdateItem: (itemId: string, input: UpdateShoppingItemInput) => Promise<boolean>;
    onDeleteItem: (itemId: string) => Promise<boolean>;
    onReorderItems: (itemsToUpdate: { id: string; order_index: number; category: string }[]) => Promise<boolean>;
    onTogglePurchased: (itemId: string, isPurchased: boolean) => Promise<boolean>;
}

export default function ShoppingListCard({ 
    list, 
    onDelete,
    onAddItem,
    onUpdateItem,
    onDeleteItem,
    onReorderItems,
    onTogglePurchased
}: ShoppingListCardProps) {
    const { t } = useTranslation('grocery');
    const [isExpanded, setIsExpanded] = useState(false);
    const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

    const purchasedCount = list.items.filter(item => item.is_purchased).length;
    const totalItems = list.items.length;
    const progress = totalItems > 0 ? (purchasedCount / totalItems) * 100 : 0;

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(t('messages.confirmDelete'))) {
            await onDelete(list.id);
        }
    };

    // Grouping strategy enforcing only two major buckets
    const groupedItems = useMemo(() => {
        const essenciaisLegacy = ['frutas', 'verduras', 'carnes', 'laticínios', 'padaria', 'limpeza', 'higiene', 'essenciais'];
        
        return list.items.reduce(
            (acc, item) => {
                const categoryRaw = item.category as string;
                if (essenciaisLegacy.includes(categoryRaw)) {
                    acc.essenciais.push(item);
                } else {
                    acc.conveniencia.push(item);
                }
                return acc;
            },
            {
                essenciais: [] as typeof list.items,
                conveniencia: [] as typeof list.items
            }
        );
    }, [list.items]);

    // --- DND HANDLERS ---
    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItemId(id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e: React.DragEvent, targetId?: string, forceCategory?: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggedItemId) return;
        const sourceId = draggedItemId;
        setDraggedItemId(null); // release UI immediately
        
        if (sourceId === targetId) return;

        const sourceItem = list.items.find(i => i.id === sourceId);
        if (!sourceItem) return;

        // If no targetId, we dropped it on the category wrapper directly
        let targetCategory = forceCategory || sourceItem.category;
        
        if (targetId) {
            const targetItem = list.items.find(i => i.id === targetId);
            if (targetItem) targetCategory = targetItem.category;
        }

        const catItems = list.items
            .filter(i => i.category === targetCategory)
            .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

        let nextItems = [...catItems];

        if (sourceItem.category === targetCategory) {
            // Same Category Reorder
            const sourceIndex = nextItems.findIndex(i => i.id === sourceId);
            const dropIndex = targetId ? nextItems.findIndex(i => i.id === targetId) : nextItems.length;
            nextItems.splice(sourceIndex, 1);
            nextItems.splice(dropIndex, 0, sourceItem);
        } else {
            // Cross Category
            sourceItem.category = targetCategory as any;
            const dropIndex = targetId ? nextItems.findIndex(i => i.id === targetId) : nextItems.length;
            nextItems.splice(dropIndex, 0, sourceItem);
        }

        const payload = nextItems.map((item, index) => ({
            id: item.id,
            order_index: index,
            category: targetCategory as string
        }));

        await onReorderItems(payload);
    };

    return (
        <div
            className={`bg-surfaceCard p-6 rounded-2xl border transition-all 
                ${isExpanded ? 'border-primary shadow-xl shadow-primary/5' : 'border-border/50 hover:border-primary/50'}
            `}
        >
            {/* Header (Clickable for accordion) */}
            <div 
                className="flex items-start justify-between mb-4 cursor-pointer group"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        <ShoppingCart size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                            {list.name}
                            {isExpanded ? <ChevronUp size={16} className="text-textSecondary" /> : <ChevronDown size={16} className="text-textSecondary" />}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        title={t('deleteList')}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Accordion Expanded Content */}
            {isExpanded && (
                <div className="mt-6 pt-6 border-t border-border/50 space-y-8 animate-fade-in overflow-x-auto pb-4">
                    <div className="min-w-[500px]">
                    {/* Cabeçalho da Tabela */}
                    <div className="flex items-center gap-2 px-2 pb-2 text-xs font-bold text-textSecondary uppercase tracking-wider mx-8">
                        <div className="flex-[2] min-w-[120px]">Nome</div>
                        <div className="flex-[1] min-w-[60px] text-center">Estoque</div>
                        <div className="flex-[1] min-w-[60px] text-center">Comprar</div>
                        <div className="flex-[2] min-w-[100px]">Obs</div>
                    </div>

                    {/* Section: Essenciais */}
                    <div 
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, undefined, 'essenciais')}
                        className="p-2 -mx-2 rounded-xl transition-colors border border-transparent hover:border-border/30 hover:bg-background/20"
                    >
                        <h4 className="text-sm font-black uppercase tracking-wider text-textSecondary mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Itens Essenciais
                        </h4>
                        <div className="space-y-1">
                            {groupedItems.essenciais.map(item => (
                                <ShoppingItemRow
                                    key={item.id}
                                    item={item}
                                    onUpdate={onUpdateItem}
                                    onDelete={onDeleteItem}
                                    onTogglePurchased={onTogglePurchased}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, item.id)}
                                    isDragging={draggedItemId === item.id}
                                />
                            ))}
                            {/* Ghost Rows */}
                            {Array.from({ length: 3 }).map((_, i) => (
                                <AutoSaveNewItemRow 
                                    key={`ghost-essenciais-${i}`}
                                    listId={list.id} 
                                    category="essenciais" 
                                    onAdd={onAddItem} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Section: Conveniência */}
                    <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, undefined, 'conveniencia')}
                        className="p-2 -mx-2 rounded-xl transition-colors border border-transparent hover:border-border/30 hover:bg-background/20"
                    >
                        <h4 className="text-sm font-black uppercase tracking-wider text-textSecondary mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Conveniência
                        </h4>
                        <div className="space-y-1">
                            {groupedItems.conveniencia.map(item => (
                                <ShoppingItemRow
                                    key={item.id}
                                    item={item}
                                    onUpdate={onUpdateItem}
                                    onDelete={onDeleteItem}
                                    onTogglePurchased={onTogglePurchased}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, item.id)}
                                    isDragging={draggedItemId === item.id}
                                />
                            ))}
                            {/* Ghost Rows */}
                            {Array.from({ length: 3 }).map((_, i) => (
                                <AutoSaveNewItemRow 
                                    key={`ghost-conveniencia-${i}`}
                                    listId={list.id} 
                                    category="conveniencia" 
                                    onAdd={onAddItem} 
                                />
                            ))}
                        </div>
                    </div>

                    </div>
                </div>
            )}
        </div>
    );
}
