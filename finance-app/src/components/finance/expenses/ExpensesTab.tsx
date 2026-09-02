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
import { useTranslation } from 'react-i18next';
import { getExpenseInstallmentInfo } from '../../../utils/installments';

export default function ExpensesTab() {
    const { t } = useTranslation(['finance', 'common']);
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
        if (window.confirm(t('common:messages.confirmDelete') + " (Apagará todas as despesas vinculadas permanentemente)")) {
            await deleteCard(cardId);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        const sourceCardIndex = cards.findIndex(c => c.id === source.droppableId);
        const destCardIndex = cards.findIndex(c => c.id === destination.droppableId);

        if (sourceCardIndex === -1 || destCardIndex === -1) return;

        const newCards = [...cards];
        const sourceCard = newCards[sourceCardIndex];
        const destCard = newCards[destCardIndex];

        const expenseToMoveIndex = sourceCard.expenses.findIndex(e => e.id === draggableId);
        if (expenseToMoveIndex === -1) return;

        const [movedExpense] = sourceCard.expenses.splice(expenseToMoveIndex, 1);
        destCard.expenses.push(movedExpense);

        setCards(newCards);

        // Update card association in DB
        try {
            await updateExpense(draggableId, { card_id: destination.droppableId });
        } catch (error) {
            console.error('Drag and drop update fail:', error);
        }
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

        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        const expenseData = {
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            installments: `${formData.installments}/1`,
            budgetId: formData.budgetId,
            tag: formData.tag,
            date: formattedDate
        };

        if (editMode && expenseId) {
            await updateExpense(cardId!, expenseId, expenseData);
        } else {
            await addExpense(cardId!, expenseData);
        }

        setExpenseModal({ ...expenseModal, open: false });
    };

    const handleDeleteExpense = async (cardId: string, expenseId: string) => {
        if (window.confirm(t('common:messages.confirmDelete'))) {
            await deleteExpense(expenseId);
        }
    };

    const handleInlineAddExpense = async (cardId: string, expenseData: Partial<any>) => {
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const defaultDate = `${yyyy}-${mm}-${dd}`;

        const newExpense = {
            description: expenseData.description || '',
            amount: expenseData.amount || 0,
            category: expenseData.category || 'Outros',
            installments: expenseData.installments || '1/1',
            budgetId: expenseData.budgetId || 'fixed',
            tag: expenseData.tag || '',
            date: expenseData.date || defaultDate
        };
        await addExpense(cardId, newExpense);
    };

    const handleInlineEditExpense = async (cardId: string, expenseId: string, updates: Partial<any>) => {
        await updateExpense(cardId, expenseId, updates);
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">{t('finance:expenses.title')}</h2>
                    <p className="text-textSecondary text-sm">{t('finance:expenses.subtitle')}</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <MonthSelector onDateChange={setCurrentDate} />

                    <Button onClick={handleOpenAddCard} className="!w-auto px-4 py-2 text-sm">
                        <Plus size={16} className="mr-2" /> {t('finance:expenses.addCard')}
                    </Button>
                </div>
            </div>

            {/* Drag Drop Context */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="space-y-4">
                    {cards.map(card => {
                        const targetMonth = currentDate.getMonth();
                        const targetYear = currentDate.getFullYear();
                        
                        const filteredExpenses = card.expenses.map(e => {
                            const info = getExpenseInstallmentInfo(e, targetMonth, targetYear);
                            if (info.applies) {
                                return {
                                    ...e,
                                    displayInstallments: `${info.currentInstallment}/${info.totalInstallments}`
                                };
                            }
                            return null;
                        }).filter(Boolean) as any[];

                        const displayCard = { ...card, expenses: filteredExpenses };

                        return (
                            <ExpenseCard
                                key={displayCard.id}
                                card={displayCard}
                                isExpanded={expandedCards.includes(displayCard.id)}
                                budgetAllocation={budgetAllocation}
                                onToggleExpand={() => toggleExpand(displayCard.id)}
                                onAddExpense={() => openAddExpense(displayCard.id)}
                                onEditExpense={(expense) => openEditExpense(displayCard.id, expense)}
                                onDeleteExpense={(expenseId) => handleDeleteExpense(displayCard.id, expenseId)}
                                onAddExpenseInline={(expenseData) => handleInlineAddExpense(displayCard.id, expenseData)}
                                onInlineEditExpense={(expenseId, updates) => handleInlineEditExpense(displayCard.id, expenseId, updates)}
                                onEditCard={() => handleOpenEditCard(displayCard)}
                                onDeleteCard={() => handleDeleteCard(displayCard.id)}
                            />
                        );
                    })}
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
