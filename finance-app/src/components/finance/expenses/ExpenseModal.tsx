/**
 * Modal para adicionar/editar despesas em cartões
 */

import { X } from 'lucide-react';
import Button from '../../Button';
import Input from '../../Input';

interface BudgetItem {
    id: string;
    name: string;
}

interface ExpenseModalProps {
    isOpen: boolean;
    isEditMode: boolean;
    formData: {
        description: string;
        amount: string;
        category: string;
        installments: string;
        budgetId: string;
        tag: string;
    };
    budgetAllocation: BudgetItem[];
    onClose: () => void;
    onSave: (e: React.FormEvent) => void;
    onFormChange: (field: string, value: string) => void;
}

export default function ExpenseModal({
    isOpen,
    isEditMode,
    formData,
    budgetAllocation,
    onClose,
    onSave,
    onFormChange
}: ExpenseModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-surfaceCard border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-textSecondary hover:text-white">
                    <X size={20} />
                </button>
                <h3 className="text-xl font-bold text-white mb-6">{isEditMode ? 'Editar Gasto' : 'Novo Gasto'}</h3>

                <form onSubmit={onSave} className="space-y-4">
                    <Input
                        label="Descrição"
                        value={formData.description}
                        onChange={e => onFormChange('description', e.target.value)}
                        placeholder="Ex: Supermercado"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Valor (R$)"
                            type="number"
                            value={formData.amount}
                            onChange={e => onFormChange('amount', e.target.value)}
                            placeholder="0.00"
                            required
                        />
                        <Input
                            label="Parcelas"
                            type="number"
                            value={formData.installments}
                            onChange={e => onFormChange('installments', e.target.value)}
                            placeholder="1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Categoria"
                            value={formData.category}
                            onChange={e => onFormChange('category', e.target.value)}
                            placeholder="Alimentação, Lazer..."
                        />
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider">Meta Relacionada</label>
                            <select
                                value={formData.budgetId}
                                onChange={e => onFormChange('budgetId', e.target.value)}
                                className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                            >
                                {budgetAllocation.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Tag / Marcador"
                        value={formData.tag}
                        onChange={e => onFormChange('tag', e.target.value)}
                        placeholder="Viagem, Compras, Essencial..."
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-textSecondary hover:text-white">Cancelar</button>
                        <Button type="submit" className="!w-auto px-6">Salvar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
