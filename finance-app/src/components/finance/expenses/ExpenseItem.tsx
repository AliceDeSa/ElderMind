/**
 * Componente individual de item de despesa (draggable)
 */

import { Draggable } from '@hello-pangea/dnd';
import { GripVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Expense {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    budgetId: string;
    tag?: string;
    installments: string;
    displayInstallments?: string;
}

interface BudgetItem {
    id: string;
    name: string;
}

interface ExpenseItemProps {
    expense: Expense;
    index: number;
    onDelete: () => void;
    onInlineEdit: (updates: Partial<Expense>) => void;
}

export default function ExpenseItem({
    expense,
    index,
    onDelete,
    onInlineEdit
}: ExpenseItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        description: expense.description,
        amount: expense.amount.toString(),
        date: expense.date,
        category: expense.category,
        installments: expense.installments.split('/')[0]
    });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        const parsedAmount = parseFloat(editData.amount.replace(',', '.'));
        const newInstallments = `${editData.installments}/1`; // O backend usa esse padrão
        
        onInlineEdit({
            description: editData.description,
            amount: isNaN(parsedAmount) ? expense.amount : parsedAmount,
            date: editData.date,
            category: editData.category,
            installments: newInstallments
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({
            description: expense.description,
            amount: expense.amount.toString(),
            date: expense.date,
            category: expense.category,
            installments: expense.installments.split('/')[0]
        });
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    };

    return (
        <Draggable key={expense.id} draggableId={expense.id} index={index}>
            {(provided, snapshot) => (
                <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    onDoubleClick={() => setIsEditing(true)}
                    className={`transition-all border-b border-border/20 hover:bg-white/5 ${
                        snapshot.isDragging ? 'bg-surfaceCard shadow-xl border-primary z-50 table' : ''
                    }`}
                >
                    <td className="p-2 w-10 text-center">
                        <div {...provided.dragHandleProps} className="text-textSecondary cursor-grab active:cursor-grabbing inline-block">
                            <GripVertical size={16} />
                        </div>
                    </td>
                    
                    <td className="p-2 text-sm text-white">
                        {isEditing ? (
                            <input 
                                ref={inputRef}
                                type="text"
                                className="w-full bg-background/50 border border-border/50 rounded px-2 py-1 text-sm outline-none focus:border-primary"
                                value={editData.description}
                                onChange={e => setEditData({...editData, description: e.target.value})}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            expense.description
                        )}
                    </td>
                    
                    <td className="p-2 text-sm text-textSecondary">
                        {isEditing ? (
                            <input 
                                type="date"
                                className="w-full bg-background/50 border border-border/50 rounded px-2 py-1 text-sm outline-none focus:border-primary [color-scheme:dark]"
                                value={editData.date}
                                onChange={e => setEditData({...editData, date: e.target.value})}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            expense.date
                        )}
                    </td>
                    
                    <td className="p-2 text-sm text-white font-medium">
                        {isEditing ? (
                            <input 
                                type="number"
                                step="0.01"
                                className="w-24 bg-background/50 border border-border/50 rounded px-2 py-1 text-sm outline-none focus:border-primary"
                                value={editData.amount}
                                onChange={e => setEditData({...editData, amount: e.target.value})}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            `R$ ${expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                        )}
                    </td>
                    
                    <td className="p-2 text-sm text-textSecondary italic">
                        {isEditing ? (
                            <input 
                                type="number"
                                min="1"
                                className="w-16 bg-background/50 border border-border/50 rounded px-2 py-1 text-sm outline-none focus:border-primary"
                                value={editData.installments}
                                onChange={e => setEditData({...editData, installments: e.target.value})}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            expense.displayInstallments || expense.installments
                        )}
                    </td>
                    
                    <td className="p-2 text-sm">
                        {isEditing ? (
                            <select
                                className="w-full bg-background/50 border border-border/50 rounded px-2 py-1 text-sm outline-none focus:border-primary text-white"
                                value={editData.category}
                                onChange={e => setEditData({...editData, category: e.target.value})}
                                onKeyDown={handleKeyDown}
                            >
                                <option value="Alimentação">Alimentação</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Educação">Educação</option>
                                <option value="Casa">Casa</option>
                                <option value="Outros">Outros</option>
                            </select>
                        ) : (
                            <span className="text-textSecondary px-1.5 py-0.5 bg-white/5 rounded text-xs">{expense.category}</span>
                        )}
                    </td>
                    
                    <td className="p-2">
                        <div className="flex items-center gap-2 justify-end">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSave} className="p-1 hover:bg-emerald-500/10 rounded-lg text-emerald-500 transition-colors" title="Salvar">
                                        <Check size={16} />
                                    </button>
                                    <button onClick={handleCancel} className="p-1 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors" title="Cancelar">
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="p-1 hover:bg-white/10 rounded-lg text-textSecondary hover:text-white transition-colors" title="Edição Rápida">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 hover:bg-red-500/10 rounded-lg text-textSecondary hover:text-red-500 transition-colors" title="Excluir">
                                        <Trash2 size={14} />
                                    </button>
                                </>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </Draggable>
    );
}
