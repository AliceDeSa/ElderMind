/**
 * Componente de cartão de crédito com lista de despesas (droppable)
 */

import { Droppable } from '@hello-pangea/dnd';
import { CreditCard, Plus, ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
    onAddExpenseInline: (expense: Partial<Expense>) => void;
    onInlineEditExpense: (expenseId: string, updates: Partial<Expense>) => void;
    onEditCard: () => void;
    onDeleteCard: () => void;
}

export default function ExpenseCard({
    card,
    isExpanded,
    budgetAllocation,
    onToggleExpand,
    onAddExpense,
    onEditExpense,
    onDeleteExpense,
    onAddExpenseInline,
    onInlineEditExpense,
    onEditCard,
    onDeleteCard
}: ExpenseCardProps) {
    const [quickAdd, setQuickAdd] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        installments: '1',
        category: 'Outros',
        budgetId: 'fixed',
        tag: ''
    });

    const handleQuickAddKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && quickAdd.description && quickAdd.amount) {
            const parsedAmount = parseFloat(quickAdd.amount.replace(',', '.'));
            onAddExpenseInline({
                ...quickAdd,
                amount: isNaN(parsedAmount) ? 0 : parsedAmount,
                installments: `${quickAdd.installments}/1`
            });
            // Reseta campos, mantendo data e categoria por conveniência
            setQuickAdd({ ...quickAdd, description: '', amount: '', installments: '1' });
        }
    };

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
                className="p-6 flex flex-col md:flex-row justify-between items-center cursor-pointer gap-4 group"
            >
                <div className="flex items-center gap-4 w-full md:w-auto hover:bg-transparent">
                    <div className={`p-3 rounded-xl ${style.bg} ${style.color}`}>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-white max-w-[150px] truncate">{card.name}</h3>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => { e.stopPropagation(); onEditCard(); }} className="text-textSecondary hover:text-white p-1 rounded transition-colors" title="Editar Cartão">
                                    <Pencil size={14} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onDeleteCard(); }} className="text-textSecondary hover:text-red-400 p-1 rounded transition-colors" title="Excluir Cartão">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-textSecondary whitespace-nowrap">Vence dia {card.dueDate}</span>
                            <span className="w-1 h-1 rounded-full bg-textSecondary flex-shrink-0"></span>
                            <span className="text-emerald-500 font-medium whitespace-nowrap">Disponível: R$ {available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end flex-shrink-0">
                    <div className="text-right">
                        <p className="text-xs text-textSecondary">Fatura Atual</p>
                        <p className="text-xl font-bold text-white">R$ {totalUsed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="text-textSecondary flex-shrink-0" /> : <ChevronDown className="text-textSecondary flex-shrink-0" />}
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
                            <div className="overflow-x-auto">
                                <table
                                    className="w-full min-w-[600px] text-left border-collapse"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <thead>
                                        <tr className="border-b border-border/30 text-textSecondary text-xs uppercase tracking-wider">
                                            <th className="p-2 w-10 text-center"></th>
                                            <th className="p-2 font-medium">Descrição</th>
                                            <th className="p-2 font-medium">Data</th>
                                            <th className="p-2 font-medium">Valor</th>
                                            <th className="p-2 font-medium">Parc.</th>
                                            <th className="p-2 font-medium">Categoria</th>
                                            <th className="p-2 font-medium text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="min-h-[50px]">
                                        {card.expenses.map((expense, index) => (
                                            <ExpenseItem
                                                key={expense.id}
                                                expense={expense}
                                                index={index}
                                                onDelete={() => onDeleteExpense(expense.id)}
                                                onInlineEdit={(updates) => onInlineEditExpense(expense.id, updates)}
                                            />
                                        ))}
                                        {provided.placeholder}
                                        
                                        {/* Quick Add Row */}
                                        <tr className="border-t border-border/30 hover:bg-white/5 transition-colors">
                                            <td className="p-2 text-center text-primary font-bold">+</td>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    placeholder="Nova despesa..."
                                                    className="w-full bg-transparent border-none text-sm text-white placeholder:text-textSecondary outline-none focus:ring-1 focus:ring-primary rounded px-1"
                                                    value={quickAdd.description}
                                                    onChange={e => setQuickAdd({...quickAdd, description: e.target.value})}
                                                    onKeyDown={handleQuickAddKeyDown}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="date"
                                                    className="w-full bg-transparent border-none text-sm text-textSecondary outline-none focus:ring-1 focus:ring-primary rounded px-1 [color-scheme:dark]"
                                                    value={quickAdd.date}
                                                    onChange={e => setQuickAdd({...quickAdd, date: e.target.value})}
                                                    onKeyDown={handleQuickAddKeyDown}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Valor"
                                                    className="w-24 bg-transparent border-none text-sm text-white outline-none focus:ring-1 focus:ring-primary rounded px-1"
                                                    value={quickAdd.amount}
                                                    onChange={e => setQuickAdd({...quickAdd, amount: e.target.value})}
                                                    onKeyDown={handleQuickAddKeyDown}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    placeholder="Parc"
                                                    className="w-16 bg-transparent border-none text-sm text-textSecondary outline-none focus:ring-1 focus:ring-primary rounded px-1"
                                                    value={quickAdd.installments}
                                                    onChange={e => setQuickAdd({...quickAdd, installments: e.target.value})}
                                                    onKeyDown={handleQuickAddKeyDown}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    className="w-full bg-transparent border-none text-sm text-textSecondary outline-none focus:ring-1 focus:ring-primary rounded px-1"
                                                    value={quickAdd.category}
                                                    onChange={e => setQuickAdd({...quickAdd, category: e.target.value})}
                                                    onKeyDown={handleQuickAddKeyDown}
                                                >
                                                    <option value="Alimentação">Alimentação</option>
                                                    <option value="Transporte">Transporte</option>
                                                    <option value="Lazer">Lazer</option>
                                                    <option value="Saúde">Saúde</option>
                                                    <option value="Educação">Educação</option>
                                                    <option value="Casa">Casa</option>
                                                    <option value="Outros">Outros</option>
                                                </select>
                                            </td>
                                            <td className="p-2 text-right text-xs text-textSecondary">
                                                Enter para salvar
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </div>
    );
}
