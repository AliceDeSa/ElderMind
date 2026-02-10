/**
 * Modal para adicionar novos cartões de crédito
 */

import { X } from 'lucide-react';
import Button from '../../Button';
import Input from '../../Input';

interface AddCardModalProps {
    isOpen: boolean;
    formData: {
        name: string;
        limit: string;
        dueDate: string;
    };
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onFormChange: (field: string, value: string) => void;
}

export default function AddCardModal({
    isOpen,
    formData,
    onClose,
    onSubmit,
    onFormChange
}: AddCardModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surfaceCard border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-textSecondary hover:text-white">
                    <X size={20} />
                </button>
                <h3 className="text-xl font-bold text-white mb-6">Novo Cartão</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        label="Nome do Cartão"
                        value={formData.name}
                        onChange={e => onFormChange('name', e.target.value)}
                        placeholder="Ex: Nubank Platinum"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Limite (R$)"
                            type="number"
                            value={formData.limit}
                            onChange={e => onFormChange('limit', e.target.value)}
                            placeholder="0.00"
                            required
                        />
                        <Input
                            label="Dia de Vencimento"
                            type="number"
                            value={formData.dueDate}
                            onChange={e => onFormChange('dueDate', e.target.value)}
                            placeholder="10"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-textSecondary hover:text-white">Cancelar</button>
                        <Button type="submit" className="!w-auto px-6">Criar Cartão</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
