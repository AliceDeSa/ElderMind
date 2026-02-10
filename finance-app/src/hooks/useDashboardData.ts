/**
 * Hook para cálculos e derivações de dados do Dashboard
 */

import { useMemo } from 'react';

interface DashboardDataParams {
    expenses: any[];
    selectedMonth: number;
}

export function useDashboardData({ expenses, selectedMonth }: DashboardDataParams) {
    // Goals (mock data - will be replaced with real data later)
    const goals = useMemo(() => [
        { id: 1, name: 'Carro Novo', current: 15000, target: 50000, color: 'bg-emerald-500' },
        { id: 2, name: 'Viagem para o Japão', current: 5000, target: 15000, color: 'bg-blue-500' },
        { id: 3, name: 'Reserva de Emergência', current: 2000, target: 10000, color: 'bg-yellow-500' },
    ], []);

    // Credit Cards derived from expenses
    const creditCards = useMemo(() => {
        return ['Nubank', 'Inter'].map((cardName, index) => {
            const cardExpenses = expenses.filter(e => e.card === cardName);
            const used = cardExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
            return {
                id: index + 1,
                name: cardName,
                limit: cardName === 'Nubank' ? 10000 : 5000,
                used: used,
                color: cardName === 'Nubank' ? 'text-purple-500' : 'text-orange-500'
            };
        });
    }, [expenses]);

    // Categories derived from expenses
    const categories = useMemo(() => {
        const categoriesList = ['Alimentação', 'Moradia', 'Transporte', 'Lazer'];
        const colors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500'];
        const icons = ['Coffee', 'Home', 'Car', 'Smartphone'];

        return categoriesList.map((catName, index) => {
            const catExpenses = expenses.filter(
                e => e.category === catName && (new Date(e.date).getMonth() === selectedMonth)
            );
            const total = catExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

            return {
                id: index + 1,
                name: catName,
                amount: total,
                color: colors[index],
                icon: icons[index]
            };
        }).sort((a, b) => b.amount - a.amount);
    }, [expenses, selectedMonth]);

    const calculatePercentage = (current: number, target: number) =>
        Math.min(100, Math.round((current / target) * 100));

    return {
        goals,
        creditCards,
        categories,
        calculatePercentage
    };
}
