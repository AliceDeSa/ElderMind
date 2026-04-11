/**
 * Tab de gerenciamento de despesas em cartões de crédito
 * Refatorada para usar componentes modulares
 */

import { useState } from 'react';
import { useFinance } from '../../../context/FinanceProvider';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Button from '../../Button';
import MonthSelector from '../../MonthSelector';
import { Plus } from 'lucide-react';
import ExpenseCard from './ExpenseCard';
import ExpenseModal from './ExpenseModal';
import AddCardModal from './AddCardModal';

export default function ExpensesTab() {
    const {
        budgetAllocation,
        cards,
        setCards,
        addCard,
        updateCard,
        deleteCard,
        addExpense,
        updateExpense,
        deleteExpense
    } = useFinance();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [expandedCards, setExpandedCards] = useState<string[]>([]);
    
    // Card Modal States
    const [cardModal, setCardModal] = useState({
        open: false,
        editMode: false,
        cardId: null as string | null
    });
    const [cardFormData, setCardFormData] = useState({ name: '', limit: '', dueDate: '' });

    // Expense Modal States
    const [expenseModal, setExpenseModal] = useState({
        open: false,
        cardId: null as string | null,
        editMode: false,
        expenseId: null as string | null
    });
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'Outros',
        installments: '1',
        budgetId: 'fixed',
        tag: ''
    });

    // Handlers
    const toggleExpand = (id: string) => {
        setExpandedCards(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const handleOpenAddCard = () => {
        setCardFormData({ name: '', limit: '', dueDate: '' });
        setCardModal({ open: true, editMode: false, cardId: null });
    };

    const handleOpenEditCard = (card: any) => {
        setCardFormData({
            name: card.name,
            limit: card.limit.toString(),
            dueDate: card.dueDate.toString()
        });
        setCardModal({ open: true, editMode: true, cardId: card.id });
    };

    const handleSaveCard = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cardModal.editMode && cardModal.cardId) {
            await updateCard(cardModal.cardId, cardFormData);
        } else {
            await addCard(cardFormData);
        }
        setCardModal({ open: false, editMode: false, cardId: null });
    };

    const handleDeleteCard = async (cardId: string) => {
        if (window.confirm('Deseja realmente excluir este cartão? Isso apagará TODAS as despesas lançadas nele de forma permanente.')) {
            await deleteCard(cardId);
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCardIndex = cards.findIndex(c => c.id === source.droppableId);
        const destCardIndex = cards.findIndex(c => c.id === destination.droppableId);

        if (sourceCardIndex === -1 || destCardIndex === -1) return;

        const newCards = [...cards];
        const sourceCard = newCards[sourceCardIndex];
        const destCard = newCards[destCardIndex];

        const [movedExpense] = sourceCard.expenses.splice(source.index, 1);
        destCard.expenses.splice(destination.index, 0, movedExpense);

        setCards(newCards);
    };

    const openAddExpense = (cardId: string) => {
        setFormData({ description: '', amount: '', category: 'Outros', installments: '1', budgetId: 'fixed', tag: '' });
        setExpenseModal({ open: true, cardId, editMode: false, expenseId: null });
    };

    const openEditExpense = (cardId: string, expense: any) => {
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

    const handleSaveExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        const { cardId, editMode, expenseId } = expenseModal;

        const expenseData = {
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            installments: `${formData.installments}/1`,
            budgetId: formData.budgetId,
            tag: formData.tag
        };

        if (editMode && expenseId) {
            await updateExpense(cardId!, expenseId, expenseData);
        } else {
            await addExpense(cardId!, expenseData);
        }

        setExpenseModal({ ...expenseModal, open: false });
    };

    const handleDeleteExpense = async (cardId: string, expenseId: string) => {
        if (window.confirm('Deseja realmente excluir esta despesa?')) {
            await deleteExpense(cardId, expenseId);
        }
    };

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

                    <Button onClick={handleOpenAddCard} className="!w-auto px-4 py-2 text-sm">
                        <Plus size={16} className="mr-2" /> Novo Cartão
                    </Button>
                </div>
            </div>

            {/* Drag Drop Context */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="space-y-4">
                    {cards.map(card => (
                        <ExpenseCard
                            key={card.id}
                            card={card}
                            isExpanded={expandedCards.includes(card.id)}
                            budgetAllocation={budgetAllocation}
                            onToggleExpand={() => toggleExpand(card.id)}
                            onAddExpense={() => openAddExpense(card.id)}
                            onEditExpense={(expense) => openEditExpense(card.id, expense)}
                            onDeleteExpense={(expenseId) => handleDeleteExpense(card.id, expenseId)}
                            onEditCard={() => handleOpenEditCard(card)}
                            onDeleteCard={() => handleDeleteCard(card.id)}
                        />
                    ))}
                </div>
            </DragDropContext>

            {/* Modals */}
            <ExpenseModal
                isOpen={expenseModal.open}
                isEditMode={expenseModal.editMode}
                formData={formData}
                budgetAllocation={budgetAllocation}
                onClose={() => setExpenseModal({ ...expenseModal, open: false })}
                onSave={handleSaveExpense}
                onFormChange={(field, value) => setFormData({ ...formData, [field]: value })}
            />

            <AddCardModal
                isOpen={cardModal.open}
                isEditMode={cardModal.editMode}
                formData={cardFormData}
                onClose={() => setCardModal({ ...cardModal, open: false })}
                onSubmit={handleSaveCard}
                onFormChange={(field, value) => setCardFormData({ ...cardFormData, [field]: value })}
            />
        </div>
    );
}
