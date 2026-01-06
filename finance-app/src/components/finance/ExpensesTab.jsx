import { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { supabase } from '../../lib/supabaseClient';
import Button from '../Button';
import Input from '../Input';
import MonthSelector from '../MonthSelector';
import { Plus, Trash2, CreditCard, Edit2, GripVertical, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function ExpensesTab() {
    const {
        budgetAllocation,
        cards,
        setCards,
        addCard,
        addExpense,
        updateExpense,
        deleteExpense
    } = useFinance(); // Use global state
    const [currentDate, setCurrentDate] = useState(new Date()); // Date state
    const [expandedCards, setExpandedCards] = useState([]); // CLOSED BY DEFAULT
    const [showAddCard, setShowAddCard] = useState(false);
    const [cardFormData, setCardFormData] = useState({ name: '', limit: '', dueDate: '' });

    // Modal States
    const [expenseModal, setExpenseModal] = useState({ open: false, cardId: null, editMode: false, expenseId: null });
    const [formData, setFormData] = useState({ description: '', amount: '', category: 'Outros', installments: '1', budgetId: 'fixed', tag: '' });

    // --- HELPERS ---
    const toggleExpand = (id) => {
        setExpandedCards(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const getCardIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes('nubank')) return { color: 'text-purple-500', bg: 'bg-purple-500/10' };
        if (n.includes('inter')) return { color: 'text-orange-500', bg: 'bg-orange-500/10' };
        return { color: 'text-white', bg: 'bg-white/10' };
    };

    const calculateAvailable = (card) => {
        const used = card.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        return card.limit - used;
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        await addCard(cardFormData);
        setCardFormData({ name: '', limit: '', dueDate: '' });
        setShowAddCard(false);
    };

    // --- HANDLERS ---
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return; // Dropped outside

        const sourceCardIndex = cards.findIndex(c => c.id === source.droppableId);
        const destCardIndex = cards.findIndex(c => c.id === destination.droppableId);

        if (sourceCardIndex === -1 || destCardIndex === -1) return;

        const newCards = [...cards];
        const sourceCard = newCards[sourceCardIndex];
        const destCard = newCards[destCardIndex];

        // Move logic
        const [movedExpense] = sourceCard.expenses.splice(source.index, 1);
        destCard.expenses.splice(destination.index, 0, movedExpense);

        setCards(newCards);
    };

    const openAddExpense = (cardId) => {
        setFormData({ description: '', amount: '', category: 'Outros', installments: '1', budgetId: 'fixed', tag: '' });
        setExpenseModal({ open: true, cardId, editMode: false, expenseId: null });
    };

    const openEditExpense = (cardId, expense) => {
        setFormData({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            installments: expense.installments.split('/')[0],
            budgetId: expense.budgetId || 'fixed',
            tag: expense.tag || ''
        });
        setExpenseModal({ open: true, cardId, editMode: true, expenseId: expense.id });
    };

    const handleSaveExpense = async (e) => {
        e.preventDefault();
        const { cardId, editMode, expenseId } = expenseModal;

        const expenseData = {
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            budget_id: formData.budgetId,
            tag: formData.tag,
            installments: `${formData.installments}/${formData.installments}`,
            date: editMode ? undefined : new Date().toISOString().split('T')[0] // Use current date for new
        };

        if (isNaN(expenseData.amount)) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        let res;
        if (editMode) {
            res = await updateExpense(expenseId, expenseData);
        } else {
            res = await addExpense(cardId, expenseData);
        }

        if (res.error) {
            console.error('Error saving expense:', res.error);
            alert("Erro ao salvar despesa. Verifique o console para mais detalhes.");
        } else {
            setExpenseModal({ open: false, cardId: null, editMode: false, expenseId: null });
        }
    };

    const handleDeleteExpense = async (cardId, expenseId) => {
        if (confirm("Excluir despesa?")) {
            const res = await deleteExpense(expenseId);
            if (res.error) {
                console.error('Error deleting expense:', res.error);
                alert("Erro ao excluir despesa.");
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Carteira de Despesas</h2>
                    <p className="text-textSecondary text-sm">Arraste os itens entre cartões para organizar</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <MonthSelector onDateChange={setCurrentDate} />

                    <Button onClick={() => setShowAddCard(true)} className="!w-auto px-4 py-2 text-sm">
                        <Plus size={16} className="mr-2" /> Novo Cartão
                    </Button>
                </div>
            </div>

            {/* Drag Drop Context */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="space-y-4">
                    {cards.map(card => {
                        const totalUsed = card.expenses.reduce((acc, curr) => acc + curr.amount, 0);
                        const available = calculateAvailable(card);
                        const style = getCardIcon(card.name);
                        const isExpanded = expandedCards.includes(card.id);

                        return (
                            <div key={card.id} className={`bg-surfaceCard rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-primary/50' : 'border-border/50'}`}>
                                {/* Card Header */}
                                <div
                                    onClick={() => toggleExpand(card.id)}
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
                                                onClick={(e) => { e.stopPropagation(); openAddExpense(card.id); }}
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
                                                        <Draggable key={expense.id} draggableId={expense.id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${snapshot.isDragging ? 'bg-surfaceCard shadow-xl border-primary z-50' : 'bg-background/40 border-border/30 hover:bg-background/60 hover:border-border'}`}
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

                                                                    <div className="flex items-center gap-3">
                                                                        <span className="font-bold text-white">R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                                                        <div className="flex items-center gap-1 border-l border-border/30 pl-3">
                                                                            <button onClick={() => openEditExpense(card.id, expense)} className="p-1 text-textSecondary hover:text-blue-400 rounded"><Edit2 size={14} /></button>
                                                                            <button onClick={() => handleDeleteExpense(card.id, expense.id)} className="p-1 text-textSecondary hover:text-red-500 rounded"><Trash2 size={14} /></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>

            {/* Expense Modal (Add/Edit) */}
            {expenseModal.open && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-surfaceCard border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                        <button onClick={() => setExpenseModal({ ...expenseModal, open: false })} className="absolute top-4 right-4 text-textSecondary hover:text-white">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-6">{expenseModal.editMode ? 'Editar Gasto' : 'Novo Gasto'}</h3>

                        <form onSubmit={handleSaveExpense} className="space-y-4">
                            <Input
                                label="Descrição"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Ex: Supermercado"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Valor (R$)"
                                    type="number"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0.00"
                                    required
                                />
                                <Input
                                    label="Parcelas"
                                    type="number"
                                    value={formData.installments}
                                    onChange={e => setFormData({ ...formData, installments: e.target.value })}
                                    placeholder="1"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Categoria"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="Alimentação, Lazer..."
                                />
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-textSecondary uppercase tracking-wider">Meta Relacionada</label>
                                    <select
                                        value={formData.budgetId}
                                        onChange={e => setFormData({ ...formData, budgetId: e.target.value })}
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
                                onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                placeholder="Viagem, Compras, Essencial..."
                            />

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setExpenseModal({ ...expenseModal, open: false })} className="px-4 py-2 text-textSecondary hover:text-white">Cancelar</button>
                                <Button type="submit" className="!w-auto px-6">Salvar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Card Modal */}
            {showAddCard && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-surfaceCard border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                        <button onClick={() => setShowAddCard(false)} className="absolute top-4 right-4 text-textSecondary hover:text-white">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-6">Novo Cartão</h3>
                        <form onSubmit={handleAddCard} className="space-y-4">
                            <Input label="Nome do Cartão" value={cardFormData.name} onChange={e => setCardFormData({ ...cardFormData, name: e.target.value })} placeholder="Ex: Nubank Platinum" required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Limite (R$)" type="number" value={cardFormData.limit} onChange={e => setCardFormData({ ...cardFormData, limit: e.target.value })} placeholder="0.00" required />
                                <Input label="Dia de Vencimento" type="number" value={cardFormData.dueDate} onChange={e => setCardFormData({ ...cardFormData, dueDate: e.target.value })} placeholder="10" required />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddCard(false)} className="px-4 py-2 text-textSecondary hover:text-white">Cancelar</button>
                                <Button type="submit" className="!w-auto px-6">Criar Cartão</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
