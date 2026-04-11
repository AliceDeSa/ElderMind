import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, GripVertical } from 'lucide-react';
import type { ShoppingItem, UpdateShoppingItemInput } from '../types/grocery.types';

interface ShoppingItemRowProps {
    item: ShoppingItem;
    onUpdate: (itemId: string, input: UpdateShoppingItemInput) => Promise<boolean>;
    onDelete: (itemId: string) => Promise<boolean>;
    onTogglePurchased: (itemId: string, isPurchased: boolean) => Promise<boolean>;
    // DND
    onDragStart?: (e: React.DragEvent, id: string) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent, targetId: string) => void;
    isDragging?: boolean;
}

export default function ShoppingItemRow({
    item,
    onUpdate,
    onDelete,
    onTogglePurchased,
    onDragStart,
    onDragOver,
    onDrop,
    isDragging
}: ShoppingItemRowProps) {
    const { t } = useTranslation('grocery');
    const [name, setName] = useState(item.name);
    const [stock, setStock] = useState((item.stock || 0).toString());
    const [quantity, setQuantity] = useState(item.quantity.toString());
    const [notes, setNotes] = useState(item.notes || '');

    // Sync with external updates
    useEffect(() => {
        setName(item.name);
        setStock((item.stock || 0).toString());
        setQuantity(item.quantity.toString());
        setNotes(item.notes || '');
    }, [item.name, item.quantity, item.stock, item.notes]);

    const handleToggle = async () => {
        await onTogglePurchased(item.id, !item.is_purchased);
    };

    const handleDelete = async () => {
        await onDelete(item.id);
    };

    const handleBlur = () => {
        const parsedQtd = parseFloat(quantity) || 1;
        const parsedStock = parseFloat(stock) || 0;
        const trimmedName = name.trim();
        const trimmedNotes = notes.trim();

        // Only update if something changed
        if (
            trimmedName !== item.name ||
            parsedQtd !== item.quantity ||
            parsedStock !== (item.stock || 0) ||
            (trimmedNotes !== (item.notes || ''))
        ) {
            onUpdate(item.id, {
                name: trimmedName || item.name, // fallback to old name if empty
                quantity: parsedQtd,
                stock: parsedStock,
                notes: trimmedNotes
            });
            // Reset to prevent empty names visually
            if (!trimmedName) setName(item.name);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    return (
        <div
            draggable={!!onDragStart}
            onDragStart={(e) => onDragStart?.(e, item.id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop?.(e, item.id)}
            className={`
                group flex items-center gap-2 p-2 rounded-lg transition-all
                ${isDragging ? 'opacity-50 border-2 border-dashed border-primary scale-[0.99] bg-surfaceCard/30' : 
                  item.is_purchased
                    ? 'opacity-60 bg-surfaceCard/50'
                    : 'bg-surfaceCard hover:bg-surfaceCard/80 border border-border/30'
                }
            `}
        >
            {/* Grip */}
            {onDragStart && (
                <div className="cursor-grab text-textSecondary opacity-30 hover:opacity-100 group-hover:opacity-100 flex-shrink-0 transition-opacity p-1">
                    <GripVertical size={18} />
                </div>
            )}
            {/* Nome */}
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Nome do Item"
                className={`flex-[2] min-w-[120px] bg-transparent outline-none px-2 py-1 text-sm transition-colors ${item.is_purchased ? 'line-through text-textSecondary' : 'text-textMain font-medium focus:bg-background/50 rounded'}`}
            />

            {/* Input Estoque */}
            <div className="flex-[1] min-w-[60px]">
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Estoque"
                    className="w-full bg-transparent outline-none px-2 py-1 text-sm text-center text-textSecondary focus:bg-background/50 rounded"
                />
            </div>

            {/* Input Comprar */}
            <div className="flex-[1] min-w-[60px]">
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Comprar"
                    className="w-full bg-transparent outline-none px-2 py-1 text-sm text-center text-textSecondary focus:bg-background/50 rounded"
                />
            </div>

            {/* Obs */}
            <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Obs..."
                className="flex-[2] min-w-[100px] bg-transparent outline-none px-2 py-1 text-sm text-textSecondary focus:bg-background/50 rounded"
            />

            {/* Delete Button - Only visible on hover or if purchased */}
            <button
                onClick={handleDelete}
                className={`p-1.5 rounded transition-all hover:bg-red-500/20 hover:text-red-500 
                  ${item.is_purchased ? 'text-red-500/50' : 'text-textSecondary/30 opacity-0 group-hover:opacity-100'}
                `}
                title={t('actions.deleteItem')}
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
