/**
 * ShoppingItemRow Component
 * Exibe um item individual da lista de compras
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Edit2, Trash2 } from 'lucide-react';
import type { ShoppingItem, UpdateShoppingItemInput } from '../types/grocery.types';

interface ShoppingItemRowProps {
    item: ShoppingItem;
    onUpdate: (itemId: string, input: UpdateShoppingItemInput) => Promise<boolean>;
    onDelete: (itemId: string) => Promise<boolean>;
    onTogglePurchased: (itemId: string, isPurchased: boolean) => Promise<boolean>;
}

export default function ShoppingItemRow({
    item,
    onUpdate,
    onDelete,
    onTogglePurchased
}: ShoppingItemRowProps) {
    const { t } = useTranslation('grocery');
    const [isEditing, setIsEditing] = useState(false);
    const [actualPrice, setActualPrice] = useState(item.actual_price?.toString() || '');

    const handleToggle = async () => {
        await onTogglePurchased(item.id, !item.is_purchased);
    };

    const handleSavePrice = async () => {
        const price = parseFloat(actualPrice) || 0;
        await onUpdate(item.id, { actual_price: price, is_purchased: true });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (confirm(t('messages.confirmDeleteItem'))) {
            await onDelete(item.id);
        }
    };

    return (
        <div
            className={`
        flex items-center gap-3 p-3 rounded-lg border transition-all
        ${item.is_purchased
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-surfaceCard border-border/50'
                }
      `}
        >
            {/* Checkbox */}
            <button
                onClick={handleToggle}
                className={`
          flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all
          ${item.is_purchased
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-textSecondary hover:border-primary'
                    }
        `}
            >
                {item.is_purchased && <Check size={16} className="text-white" />}
            </button>

            {/* Item Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <h4 className={`
            font-medium
            ${item.is_purchased ? 'text-textSecondary line-through' : 'text-white'}
          `}>
                        {item.name}
                    </h4>
                    <span className="text-xs text-textSecondary">
                        {item.quantity} {t(`units.${item.unit}`)}
                    </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                        {t(`categories.${item.category}`)}
                    </span>
                    {item.notes && (
                        <span className="text-xs text-textSecondary truncate">
                            {item.notes}
                        </span>
                    )}
                </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-2">
                {!isEditing ? (
                    <>
                        <div className="text-right">
                            <div className="text-sm text-textSecondary">
                                R$ {item.estimated_price.toFixed(2)}
                            </div>
                            {item.actual_price !== null && item.actual_price !== undefined && (
                                <div className={`text-sm font-bold ${item.actual_price > item.estimated_price
                                        ? 'text-red-500'
                                        : 'text-emerald-500'
                                    }`}>
                                    R$ {item.actual_price.toFixed(2)}
                                </div>
                            )}
                        </div>

                        {item.is_purchased && !item.actual_price && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1.5 rounded hover:bg-primary/20 text-primary transition-colors"
                                title={t('item.actualPrice')}
                            >
                                <Edit2 size={16} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex items-center gap-1">
                        <input
                            type="number"
                            step="0.01"
                            value={actualPrice}
                            onChange={(e) => setActualPrice(e.target.value)}
                            className="w-20 px-2 py-1 text-sm bg-background border border-border rounded text-white"
                            placeholder="0.00"
                            autoFocus
                        />
                        <button
                            onClick={handleSavePrice}
                            className="p-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            <Check size={14} />
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-500"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    className="p-1.5 rounded hover:bg-red-500/20 text-red-500 transition-colors"
                    title={t('actions.deleteItem')}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
