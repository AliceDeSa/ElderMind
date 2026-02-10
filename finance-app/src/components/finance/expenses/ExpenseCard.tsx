/**
 * Componente de cartão de crédito com lista de despesas (droppable)
 */

import { Droppable } from '@hello-pangea/dnd';
import { CreditCard, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import ExpenseItem from './ExpenseItem';

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

interface Card {
    id: string;
    name: string;
    limit: number;
    dueDate: number;
    expenses: Expense[];
}

interface BudgetItem {
    id: string;
    name: string;
}

interface ExpenseCardProps {
    card: Card;
    isExpanded: boolean;
    budgetAllocation: BudgetItem[];
    onToggleExpand: () => void;
    onAddExpense: () => void;
    onEditExpense: (expense: Expense) => void;
    onDeleteExpense: (expenseId: string) => void;
}

export default function ExpenseCard({
    card,
    isExpanded,
    budgetAllocation,
    onToggleExpand,
    onAddExpense,
    onEditExpense,
    onDeleteExpense
}: ExpenseCardProps) {
    const totalUsed = card.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const available = card.limit - totalUsed;

    const getCardIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('nubank')) return { color: 'text-purple-500', bg: 'bg-purple-500/10' };
        if (n.includes('inter')) return { color: 'text-orange-500', bg: 'bg-orange-500/10' };
        return { color: 'text-white', bg: 'bg-white/10' };
    };

    const style = getCardIcon(card.name);

    return (
        <div className={`bg-surfaceCard rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-primary/50' : 'border-border/50'}`}>
            {/* Card Header */}
            <div
                onClick={onToggleExpand}
                className="p-6 flex flex-col md:flex-row justify-between items-center cursor-pointer gap-4"
            >
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`p-3 rounded-xl ${style.bg} ${style.color}`}>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{card.name}</h3>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-textSecondary">Vence dia {card.dueDate}</span>
                            <span className="w-1 h-1 rounded-full bg-textSecondary"></span>
                            <span className="text-emerald-500 font-medium">Disponível: R$ {available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                        <p className="text-xs text-textSecondary">Fatura Atual</p>
                        <p className="text-xl font-bold text-white">R$ {totalUsed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="text-textSecondary" /> : <ChevronDown className="text-textSecondary" />}
                </div>
            </div>

            {/* Droppable Area */}
            {isExpanded && (
                <div className="px-6 pb-6 border-t border-border/30 pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-textMain flex items-center gap-2">
                            Lançamentos
                            <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">{card.expenses.length}</span>
                        </h4>
                        <button
                            onClick={(e) => { e.stopPropagation(); onAddExpense(); }}
                            className="text-primary hover:text-white text-xs font-bold flex items-center bg-primary/10 px-3 py-1.5 rounded-lg transition-colors border border-primary/20 hover:bg-primary/20"
                        >
                            <Plus size={14} className="mr-1" /> Adicionar Gasto
                        </button>
                    </div>

                    <Droppable droppableId={card.id}>
                        {(provided) => (
                            <div
                                className="space-y-2 min-h-[50px]"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {card.expenses.map((expense, index) => (
                                    <ExpenseItem
                                        key={expense.id}
                                        expense={expense}
                                        index={index}
                                        budgetAllocation={budgetAllocation}
                                        onEdit={() => onEditExpense(expense)}
                                        onDelete={() => onDeleteExpense(expense.id)}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </div>
    );
}
