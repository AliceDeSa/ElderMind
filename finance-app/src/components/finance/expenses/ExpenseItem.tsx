/**
 * Componente individual de item de despesa (draggable)
 */

import { Draggable } from '@hello-pangea/dnd';
import { GripVertical, Edit2, Trash2 } from 'lucide-react';

interface Expense {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    budgetId: string;
    tag?: string;
    installments: string;
}

interface BudgetItem {
    id: string;
    name: string;
}

interface ExpenseItemProps {
    expense: Expense;
    index: number;
    budgetAllocation: BudgetItem[];
    onEdit: () => void;
    onDelete: () => void;
}

export default function ExpenseItem({
    expense,
    index,
    budgetAllocation,
    onEdit,
    onDelete
}: ExpenseItemProps) {
    return (
        <Draggable key={expense.id} draggableId={expense.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${snapshot.isDragging
                            ? 'bg-surfaceCard shadow-xl border-primary z-50'
                            : 'bg-background/40 border-border/30 hover:bg-background/60 hover:border-border'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="text-textSecondary cursor-grab active:cursor-grabbing">
                            <GripVertical size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{expense.description}</p>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[10px] mt-1">
                                <span className="text-textSecondary">{expense.date}</span>
                                <span className="w-1 h-1 rounded-full bg-textSecondary/30"></span>
                                <span className="text-textSecondary px-1.5 py-0.5 bg-white/5 rounded">{expense.category}</span>
                                <span className="w-1 h-1 rounded-full bg-textSecondary/30"></span>
                                <span className="text-primary font-bold">
                                    {budgetAllocation.find(b => b.id === expense.budgetId)?.name || 'Sem Meta'}
                                </span>
                                {expense.tag && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-textSecondary/30"></span>
                                        <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-medium">#{expense.tag}</span>
                                    </>
                                )}
                                <span className="w-1 h-1 rounded-full bg-textSecondary/30"></span>
                                <span className="text-textSecondary italic">{expense.installments}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white">R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            className="p-1.5 hover:bg-white/10 rounded-lg text-textSecondary hover:text-white transition-colors"
                        >
                            <Edit2 size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg text-textSecondary hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
