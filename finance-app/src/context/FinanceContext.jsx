import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    // --- STATE ---
    const [incomes, setIncomes] = useState([]);
    const [cards, setCards] = useState([]);
    const [budgetAllocation, setBudgetAllocation] = useState([]);
    const [financialGoals, setFinancialGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const { user } = useAuth();
    const userId = user?.id;

    // --- FETCH DATA ---
    const fetchData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            // 1. Fetch Incomes
            const { data: incomeData } = await supabase.from('incomes').select('*').eq('user_id', userId);
            setIncomes((incomeData || []).map(i => ({
                ...i,
                amount: Number(i.amount)
            })));

            // 2. Fetch Cards
            const { data: cardData } = await supabase.from('cards').select('*').eq('user_id', userId);

            // 3. Fetch Expenses for all cards
            const { data: expenseData } = await supabase.from('expenses').select('*').eq('user_id', userId);

            // Merge expenses into cards
            const cardsWithExpenses = (cardData || []).map(card => {
                const cardExpenses = (expenseData || [])
                    .filter(e => e.card_id === card.id)
                    .map(e => ({
                        ...e,
                        amount: Number(e.amount),
                        budgetId: e.budget_id
                    }));

                return {
                    ...card,
                    limit: Number(card.limit_val),
                    expenses: cardExpenses
                };
            });
            setCards(cardsWithExpenses);

            // 4. Fetch Budget Allocation
            let { data: budgetData } = await supabase.from('budget_allocation').select('*').eq('user_id', userId).order('value', { ascending: false });

            // Initialize defaults if empty for this user
            if (!budgetData || budgetData.length === 0) {
                const defaults = [
                    { id: 'fixed', name: 'Custos Fixos', value: 30, color: '#3b82f6', user_id: userId },
                    { id: 'freedom', name: 'Liberdade Financeira', value: 25, color: '#818cf8', user_id: userId },
                    { id: 'comfort', name: 'Conforto', value: 15, color: '#f472b6', user_id: userId },
                    { id: 'goals', name: 'Metas', value: 15, color: '#7c3aed', user_id: userId },
                    { id: 'pleasure', name: 'Prazeres', value: 10, color: '#f97316', user_id: userId },
                    { id: 'knowledge', name: 'Conhecimento', value: 5, color: '#fbbf24', user_id: userId }
                ];
                const { data: insertedData } = await supabase.from('budget_allocation').insert(defaults).select();
                budgetData = insertedData || [];
            }
            setBudgetAllocation(budgetData);

            // 5. Fetch Financial Goals
            const { data: goalsData } = await supabase.from('financial_goals').select('*').eq('user_id', userId).order('created_at', { ascending: true });
            setFinancialGoals(goalsData || []);

        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) fetchData();
    }, [fetchData, userId]);

    // Derived flat expenses list
    const expenses = cards.flatMap(c => c.expenses);

    // --- ACTIONS ---
    const addIncome = async (income) => {
        const payload = {
            user_id: userId,
            name: income.name || income.description || 'Nova Renda',
            amount: isNaN(Number(income.amount)) ? 0 : Number(income.amount),
            recurring: income.recurring !== undefined ? income.recurring : false,
            month: income.month !== undefined ? income.month : selectedMonth
        };

        const { data, error } = await supabase.from('incomes').insert([payload]).select();

        if (!error && data) {
            setIncomes(prev => [...prev, { ...data[0], amount: Number(data[0].amount) }]);
        } else if (error) {
            console.error('Error adding income:', error);
        }
    };

    const updateIncome = async (id, income) => {
        const payload = {
            name: income.name || income.description,
            amount: isNaN(Number(income.amount)) ? 0 : Number(income.amount),
            recurring: income.recurring !== undefined ? income.recurring : false,
            month: income.month !== undefined ? income.month : selectedMonth
        };

        const { error } = await supabase.from('incomes').update(payload).eq('id', id).eq('user_id', userId);

        if (!error) {
            fetchData();
        } else {
            console.error('Error updating income:', error);
        }
    };

    const deleteIncome = async (id) => {
        const { error } = await supabase.from('incomes').delete().eq('id', id).eq('user_id', userId);
        if (!error) {
            setIncomes(prev => prev.filter(i => i.id !== id));
        } else {
            console.error('Error deleting income:', error);
        }
    };

    const addCard = async (card) => {
        const payload = {
            user_id: userId,
            name: card.name,
            limit_val: Number(card.limit),
            due_date: card.dueDate
        };
        const { data, error } = await supabase.from('cards').insert([payload]).select();

        if (!error && data) {
            setCards(prev => [...prev, {
                ...data[0],
                limit: Number(data[0].limit_val),
                expenses: []
            }]);
        } else if (error) {
            console.error('Error adding card:', error);
        }
    };

    // --- FINANCIAL GOALS ACTIONS ---
    const addGoal = async (goal) => {
        const { data, error } = await supabase.from('financial_goals').insert([{
            user_id: userId,
            title: goal.title,
            target_amount: Number(goal.targetAmount),
            current_amount: 0,
            deadline: goal.deadline,
            category: goal.category,
            icon: goal.icon
        }]).select();

        if (!error && data) {
            setFinancialGoals(prev => [...prev, data[0]]);
        } else if (error) {
            console.error('Error adding goal:', error);
        }
    };

    const updateGoal = async (id, goal) => {
        const { error } = await supabase.from('financial_goals').update({
            title: goal.title,
            target_amount: Number(goal.targetAmount),
            current_amount: Number(goal.currentAmount),
            deadline: goal.deadline,
            category: goal.category,
            icon: goal.icon
        }).eq('id', id).eq('user_id', userId);

        if (!error) {
            fetchData();
        } else {
            console.error('Error updating goal:', error);
        }
    };

    const deleteGoal = async (id) => {
        const { error } = await supabase.from('financial_goals').delete().eq('id', id).eq('user_id', userId);
        if (!error) {
            setFinancialGoals(prev => prev.filter(g => g.id !== id));
        } else {
            console.error('Error deleting goal:', error);
        }
    };

    const updateBudgetAllocation = async (newAllocation) => {
        setBudgetAllocation(newAllocation);
        for (const item of newAllocation) {
            await supabase.from('budget_allocation')
                .update({ value: item.value })
                .eq('id', item.id)
                .eq('user_id', userId);
        }
    };

    const addExpense = async (cardId, expense) => {
        const payload = {
            ...expense,
            user_id: userId,
            card_id: cardId,
            amount: Number(expense.amount)
        };
        const { error } = await supabase.from('expenses').insert([payload]);
        if (!error) {
            fetchData();
            return { success: true };
        }
        return { success: false, error };
    };

    const updateExpense = async (expenseId, expense) => {
        const { error } = await supabase.from('expenses')
            .update(expense)
            .eq('id', expenseId)
            .eq('user_id', userId);
        if (!error) {
            fetchData();
            return { success: true };
        }
        return { success: false, error };
    };

    const deleteExpense = async (expenseId) => {
        const { error } = await supabase.from('expenses')
            .delete()
            .eq('id', expenseId)
            .eq('user_id', userId);
        if (!error) {
            fetchData();
            return { success: true };
        }
        return { success: false, error };
    };

    const updateCardsState = async (newCards) => {
        setCards(newCards);
    };

    // --- EDUCATION ---
    const [educationProgress, setEducationProgress] = useState({
        lessonsCompleted: [],
        quizzesCompleted: []
    });

    const completeLesson = (lessonId) => {
        if (!educationProgress.lessonsCompleted.includes(lessonId)) {
            setEducationProgress(prev => ({
                ...prev,
                lessonsCompleted: [...prev.lessonsCompleted, lessonId]
            }));
        }
    };

    const submitQuizScore = (quizId, score) => {
        setEducationProgress(prev => {
            const otherQuizzes = prev.quizzesCompleted.filter(q => q.quizId !== quizId);
            return {
                ...prev,
                quizzesCompleted: [...otherQuizzes, { quizId, score }]
            };
        });
    };

    // --- GETTERS ---
    const getSummary = () => {
        const filteredIncomes = incomes.filter(i => i.recurring || i.month === selectedMonth);
        const filteredExpenses = expenses.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === selectedMonth;
        });

        const totalIncome = filteredIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const totalExpense = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

        return {
            income: totalIncome,
            expense: totalExpense,
            balance: totalIncome - totalExpense
        };
    };

    const getYearlyStats = () => {
        const monthsNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        return monthsNames.map((name, index) => {
            const monthlyExpenses = expenses.filter(e => {
                const d = new Date(e.date);
                return d.getMonth() === index;
            });

            const monthlyIncomes = incomes.filter(i => i.recurring || i.month === index);
            const totalIncome = monthlyIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);
            const totalExpense = monthlyExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

            const stats = {
                name,
                index,
                income: totalIncome,
                expense: totalExpense,
                profit: totalIncome - totalExpense
            };

            cards.forEach(card => {
                const total = monthlyExpenses
                    .filter(e => e.card_id === card.id)
                    .reduce((acc, curr) => acc + Number(curr.amount), 0);
                stats[card.name] = total;
            });

            return stats;
        });
    };

    return (
        <FinanceContext.Provider value={{
            incomes,
            expenses,
            cards,
            setCards: updateCardsState,
            selectedMonth,
            setSelectedMonth,
            addIncome,
            updateIncome,
            deleteIncome,
            addCard,
            financialGoals,
            addGoal,
            updateGoal,
            deleteGoal,
            addExpense,
            updateExpense,
            deleteExpense,
            getSummary,
            getYearlyStats,
            budgetAllocation,
            updateBudgetAllocation,
            educationProgress,
            completeLesson,
            submitQuizScore,
            loading,
            refreshData: fetchData
        }}>
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);
