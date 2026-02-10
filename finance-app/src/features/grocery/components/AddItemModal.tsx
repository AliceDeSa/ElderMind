/**
 * AddItemModal Component
 * Modal para adicionar novo item à lista
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus } from 'lucide-react';
import type { CreateShoppingItemInput, ItemCategory, ItemUnit } from '../types/grocery.types';

interface AddItemModalProps {
    listId: string;
    isOpen: boolean;
    onClose: () => void;
    onAdd: (input: CreateShoppingItemInput) => Promise<any>;
}

const CATEGORIES: ItemCategory[] = [
    'frutas', 'verduras', 'carnes', 'laticínios', 'padaria',
    'limpeza', 'higiene', 'bebidas', 'congelados', 'outros'
];

const UNITS: ItemUnit[] = ['kg', 'g', 'L', 'mL', 'un', 'dz', 'pct'];

export default function AddItemModal({ listId, isOpen, onClose, onAdd }: AddItemModalProps) {
    const { t } = useTranslation('grocery');
    const [name, setName] = useState('');
    const [category, setCategory] = useState<ItemCategory>('outros');
    const [quantity, setQuantity] = useState('1');
    const [unit, setUnit] = useState<ItemUnit>('un');
    const [estimatedPrice, setEstimatedPrice] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        setLoading(true);

        const input: CreateShoppingItemInput = {
            list_id: listId,
            name: name.trim(),
            category,
            quantity: parseFloat(quantity) || 1,
            unit,
            estimated_price: parseFloat(estimatedPrice) || 0,
            notes: notes.trim() || undefined
        };

        await onAdd(input);

        // Reset form
        setName('');
        setCategory('outros');
        setQuantity('1');
        setUnit('un');
        setEstimatedPrice('');
        setNotes('');
        setLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
            <div className="bg-surfaceCard rounded-2xl border border-border/50 w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <h2 className="text-xl font-bold text-white">{t('addItem')}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-background transition-colors text-textSecondary hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Nome do Item */}
                    <div>
                        <label className="block text-sm font-medium text-textSecondary mb-2">
                            {t('item.name')} *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('item.namePlaceholder')}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:outline-none focus:border-primary"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Categoria e Quantidade */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-textSecondary mb-2">
                                {t('item.category')}
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>
                                        {t(`categories.${cat}`)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-textSecondary mb-2">
                                {t('item.quantity')}
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary"
                                    min="0.01"
                                />
                                <select
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value as ItemUnit)}
                                    className="px-3 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary"
                                >
                                    {UNITS.map(u => (
                                        <option key={u} value={u}>
                                            {t(`units.${u}`)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Preço Estimado */}
                    <div>
                        <label className="block text-sm font-medium text-textSecondary mb-2">
                            {t('item.estimatedPrice')}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary">
                                R$
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                value={estimatedPrice}
                                onChange={(e) => setEstimatedPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:outline-none focus:border-primary"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label className="block text-sm font-medium text-textSecondary mb-2">
                            {t('item.notes')}
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={t('item.notesPlaceholder')}
                            rows={2}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder-textSecondary focus:outline-none focus:border-primary resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-background hover:bg-background/80 text-white rounded-lg transition-colors"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-bold"
                            disabled={loading || !name.trim()}
                        >
                            <Plus size={20} />
                            {loading ? t('common:messages.loading') : t('addItem')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
