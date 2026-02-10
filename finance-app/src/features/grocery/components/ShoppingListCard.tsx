/**
 * ShoppingListCard Component
 * Card para exibir uma lista de compras
 */

import { useTranslation } from 'react-i18next';
import { ShoppingCart, Plus, Check, Trash2 } from 'lucide-react';
import type { ShoppingListWithItems } from '../types/grocery.types';

interface ShoppingListCardProps {
    list: ShoppingListWithItems;
    onClick: () => void;
    onDelete: (listId: string) => Promise<boolean>;
}

export default function ShoppingListCard({ list, onClick, onDelete }: ShoppingListCardProps) {
    const { t } = useTranslation('grocery');

    const purchasedCount = list.items.filter(item => item.is_purchased).length;
    const totalItems = list.items.length;
    const progress = totalItems > 0 ? (purchasedCount / totalItems) * 100 : 0;

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(t('messages.confirmDelete'))) {
            await onDelete(list.id);
        }
    };

    const getStatusColor = () => {
        switch (list.status) {
            case 'planning':
                return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
            case 'shopping':
                return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
            case 'completed':
                return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
            default:
                return 'bg-textSecondary/20 text-textSecondary border-textSecondary/30';
        }
    };

    const savings = list.estimated_total - list.actual_total;
    const hasSavings = list.status === 'completed' && savings !== 0;

    return (
        <div
            onClick={onClick}
            className="bg-surfaceCard p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <ShoppingCart className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {list.name}
                        </h3>
                        <p className="text-sm text-textSecondary">
                            {new Date(list.created_at).toLocaleDateString('pt-BR')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor()}`}>
                        {t(`status.${list.status}`)}
                    </span>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        title={t('deleteList')}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            {totalItems > 0 && (
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-textSecondary">
                            {t('totals.purchasedItems', { count: purchasedCount, total: totalItems })}
                        </span>
                        <span className="text-white font-bold">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded-lg">
                    <p className="text-xs text-textSecondary mb-1">{t('totals.estimated')}</p>
                    <p className="text-lg font-bold text-white">
                        R$ {list.estimated_total.toFixed(2)}
                    </p>
                </div>

                {list.status === 'completed' ? (
                    <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs text-textSecondary mb-1">{t('totals.actual')}</p>
                        <p className="text-lg font-bold text-white">
                            R$ {list.actual_total.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs text-textSecondary mb-1">{t('totals.itemsTotal')}</p>
                        <p className="text-lg font-bold text-white">{totalItems}</p>
                    </div>
                )}
            </div>

            {/* Savings/Exceeded */}
            {hasSavings && (
                <div className={`mt-4 p-3 rounded-lg ${savings > 0
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}>
                    <p className={`text-sm font-bold ${savings > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {savings > 0 ? t('totals.saved') : t('totals.exceeded')}: R$ {Math.abs(savings).toFixed(2)}
                    </p>
                </div>
            )}

            {/* Empty State */}
            {totalItems === 0 && (
                <div className="mt-4 p-4 bg-background rounded-lg text-center">
                    <Plus className="mx-auto text-textSecondary mb-2" size={24} />
                    <p className="text-sm text-textSecondary">{t('messages.noItems')}</p>
                </div>
            )}
        </div>
    );
}
