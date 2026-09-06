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
    const [expandedExpenseId, setExpandedExpenseId] = useState<string | null>(null);
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

    const getCardStyle = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('nubank')) return {
            gradient: 'bg-gradient-to-r from-purple-900/30 via-purple-950/10 to-surfaceCard border-purple-500/30',
            badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            iconBg: 'bg-purple-500/20 text-purple-400'
        };
        if (n.includes('inter')) return {
            gradient: 'bg-gradient-to-r from-orange-900/30 via-orange-950/10 to-surfaceCard border-orange-500/30',
            badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
            iconBg: 'bg-orange-500/20 text-orange-400'
        };
        return {
            gradient: 'bg-gradient-to-r from-indigo-900/20 via-slate-900/10 to-surfaceCard border-border/50',
            badgeBg: 'bg-primary/20 text-primary border-primary/30',
            iconBg: 'bg-primary/20 text-primary'
        };
    };

    const cardStyle = getCardStyle(card.name);

    return (
        <div className={`rounded-2xl border transition-all duration-300 ${cardStyle.gradient} ${isExpanded ? 'ring-2 ring-primary/40' : ''}`}>
            {/* Card Header - Visual de Cartão Bancário */}
            <div
                onClick={onToggleExpand}
                className="p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer gap-4 group"
            >
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`p-3 rounded-2xl ${cardStyle.iconBg} shadow-inner flex-shrink-0`}>
                        <CreditCard size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg md:text-xl font-bold text-white truncate">{card.name}</h3>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cardStyle.badgeBg} flex-shrink-0`}>
                                Vence dia {card.dueDate || card.due_date || '--'}
                            </span>
                            <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-auto md:ml-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onEditCard(); }}
                                    className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                                    title="Editar Cartão"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteCard(); }}
                                    className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                    title="Excluir Cartão"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs mt-1.5 flex-wrap">
                            <span className="text-textSecondary">Limite: <strong className="text-white">R$ {card.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></span>
                            <span className="w-1 h-1 rounded-full bg-textSecondary/40"></span>
                            <span className="text-emerald-400 font-semibold">Disponível: R$ {available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                    <div className="text-left md:text-right">
                        <p className="text-[11px] uppercase tracking-wider text-textSecondary font-bold">Fatura Atual</p>
                        <p className="text-xl md:text-2xl font-black text-white">R$ {totalUsed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 text-textSecondary group-hover:text-white transition-colors">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
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
                            <div>
                                {/* Mobile View (Cards stacked cleanly with tap to reveal details) */}
                                <div className="block md:hidden space-y-2 mb-4">
                                    {card.expenses.map((expense) => {
                                        const isMobileSelected = expandedExpenseId === expense.id;
                                        return (
                                            <div
                                                key={expense.id}
                                                onClick={() => setExpandedExpenseId(isMobileSelected ? null : expense.id)}
                                                className="p-3 bg-surfaceCard/60 border border-border/40 rounded-xl space-y-2 cursor-pointer transition-all hover:border-primary/40"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-bold text-sm text-white">{expense.description}</p>
                                                        <span className="text-[10px] px-2 py-0.5 bg-white/10 text-textSecondary rounded font-medium">
                                                            {expense.category}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-sm text-white">R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                        <span className="text-[10px] text-textSecondary">{expense.displayInstallments || expense.installments}</span>
                                                    </div>
                                                </div>

                                                {/* Expanded Details on Tap */}
                                                {isMobileSelected && (
                                                    <div className="pt-2 border-t border-border/20 flex justify-between items-center text-xs animate-fade-in">
                                                        <div className="text-textSecondary space-y-0.5">
                                                            <p>📅 Data: <span className="text-white">{expense.date}</span></p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); onEditExpense(expense); }}
                                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); onDeleteExpense(expense.id); }}
                                                                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-bold transition-colors"
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Desktop View (Full Drag & Drop Table) */}
                                <div className="hidden md:block overflow-x-auto">
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
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </div>
    );
}
