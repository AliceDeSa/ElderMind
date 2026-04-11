import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { ItemCategory } from '../types/grocery.types';

interface AutoSaveNewItemRowProps {
    listId: string;
    category: ItemCategory;
    onAdd: (input: { list_id: string; name: string; quantity: number; stock: number; notes: string; category: ItemCategory }) => Promise<any>;
}

export default function AutoSaveNewItemRow({
    listId,
    category,
    onAdd
}: AutoSaveNewItemRowProps) {
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        setIsSaving(true);
        const parsedQtd = parseFloat(quantity) || 1;
        const parsedStock = parseFloat(stock) || 0;

        try {
            await onAdd({
                list_id: listId,
                name: trimmedName,
                quantity: parsedQtd,
                stock: parsedStock,
                notes: notes.trim(),
                category: category
            });
            // Reset for the next phantom row
            setName('');
            setStock('');
            setQuantity('');
            setNotes('');
        } catch (error) {
            console.error('Failed to create item inline', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    return (
        <div
            className="group flex items-center gap-2 p-2 rounded-lg transition-all border border-dashed border-border/50 bg-background/30 hover:border-primary/40 opacity-70 hover:opacity-100"
        >
            {/* Visual Indicator of "add" */}
            <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${isSaving ? 'animate-pulse text-primary' : 'text-textSecondary/50'}`}>
                <Plus size={16} />
            </div>

            {/* Nome */}
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder="Novo item..."
                disabled={isSaving}
                className="flex-[2] min-w-[120px] bg-transparent outline-none px-2 py-1 text-sm transition-colors text-textMain font-medium focus:bg-background/50 rounded placeholder-textSecondary/40"
            />

            {/* Input Estoque */}
            <div className="flex-[1] min-w-[60px]">
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="Estoque"
                    disabled={isSaving}
                    className="w-full bg-transparent outline-none px-2 py-1 text-sm text-center text-textSecondary focus:bg-background/50 rounded placeholder-textSecondary/40"
                />
            </div>

            {/* Input Comprar */}
            <div className="flex-[1] min-w-[60px]">
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="Comprar (1)"
                    disabled={isSaving}
                    className="w-full bg-transparent outline-none px-2 py-1 text-sm text-center text-textSecondary focus:bg-background/50 rounded placeholder-textSecondary/40"
                />
            </div>

            {/* Obs */}
            <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder="Obs..."
                disabled={isSaving}
                className="flex-[2] min-w-[100px] bg-transparent outline-none px-2 py-1 text-sm text-textSecondary focus:bg-background/50 rounded placeholder-textSecondary/40"
            />
            
            {/* Placeholder to match the trash icon width of populated rows */}
            <div className="w-7"></div>
        </div>
    );
}
