import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFinance } from '../../context/FinanceProvider';
import MonthSelector from '../../components/MonthSelector';
import SummaryCards from './SummaryCards';
import YearlyChart from './YearlyChart';
import { useTranslation } from 'react-i18next';
import { Utensils, Home, Car, Globe, ShoppingBag, Coffee, MoreHorizontal } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { t } = useTranslation(['dashboard', 'common']);
    const { user } = useAuth();
    const {
        incomes,
        expenses,
        financialGoals,
        cards,
        selectedMonth,
        setSelectedMonth,
        getSummary,
        getYearlyStats
    } = useFinance();

    // 1. Calculate Summary Data
    const summary = getSummary();
    const yearlyStats = getYearlyStats();

    // 2. Calculate Credit Cards Usage
    const cardsUsage = useMemo(() => {
        return cards.map(card => {
            const used = card.expenses?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
            return {
                id: card.id,
                name: card.name,
                limit: card.limit,
                used,
                color: 'bg-purple-600' // Default color
            };
        });
    }, [cards]);

    // 3. Calculate Category Stats
    const categoryStats = useMemo(() => {
        const monthlyExpenses = expenses.filter(e => {
            const date = new Date(e.date);
            return date.getMonth() === selectedMonth;
        });

        const groups = monthlyExpenses.reduce((acc, exp) => {
            const cat = exp.category || 'Outros';
            if (!acc[cat]) acc[cat] = 0;
            acc[cat] += Number(exp.amount);
            return acc;
        }, {} as Record<string, number>);

        const iconMap: any = {
            'Alimentação': { icon: Utensils, color: 'bg-orange-500' },
            'Moradia': { icon: Home, color: 'bg-blue-500' },
            'Transporte': { icon: Car, color: 'bg-emerald-500' },
            'Educação': { icon: Globe, color: 'bg-purple-500' },
            'Lazer': { icon: ShoppingBag, color: 'bg-pink-500' },
            'Café': { icon: Coffee, color: 'bg-amber-600' },
            'Outros': { icon: MoreHorizontal, color: 'bg-slate-500' }
        };

        const totalMonthExpense = monthlyExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

        return Object.entries(groups).map(([name, amount]) => ({
            name,
            amount,
            icon: iconMap[name]?.icon || MoreHorizontal,
            color: iconMap[name]?.color || 'bg-slate-500',
            percentage: totalMonthExpense > 0 ? (amount / totalMonthExpense) * 100 : 0
        })).sort((a, b) => b.amount - a.amount);
    }, [expenses, selectedMonth]);

    const calculatePercentage = (current: number, target: number) => {
        if (target <= 0) return 0;
        return Math.min(Math.round((current / target) * 100), 100);
    };

    const formatBRL = (val: number) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="p-4 md:p-6 pb-24 md:pb-6 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-textMain">
                        {t('dashboard:greeting', { name: user?.user_metadata?.name || 'Investidor' })}
                    </h1>
                    <p className="text-textSecondary">{t('dashboard:subtitle')}</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Month Selector from FinanceProvider state */}
                    <MonthSelector
                        onDateChange={(date: Date) => setSelectedMonth(date.getMonth())}
                    />
                </div>
            </div>

            {/* Cards de Resumo */}
            <SummaryCards
                income={summary.income}
                expense={summary.expense}
                goals={financialGoals.map(g => ({
                    id: g.id,
                    name: g.title,
                    current: g.current_amount,
                    target: g.target_amount,
                    color: 'bg-green-500'
                }))}
                creditCards={cardsUsage}
                calculatePercentage={calculatePercentage}
            />

            {/* Main Content Grid */}
            <div className="w-full space-y-8">
                {/* Annual Chart */}
                <div className="w-full">
                    <YearlyChart
                        yearlyData={yearlyStats}
                        cards={cards.map(c => ({ id: String(c.id), name: c.name }))}
                    />
                </div>

                {/* Categories (Restored) */}
                <div className="bg-surfaceCard border border-border/50 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-semibold text-textMain mb-6">{t('dashboard:categories.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryStats.map((cat, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/30">
                                <div className={`p-3 rounded-lg ${cat.color} bg-opacity-20 text-white`}>
                                    <cat.icon size={20} className={cat.color.replace('bg-', 'text-')} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between mb-1.5">
                                        <span className="text-sm font-bold text-textMain truncate">{cat.name}</span>
                                        <span className="text-sm font-black text-textMain">{formatBRL(cat.amount)}</span>
                                    </div>
                                    <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className={`${cat.color} h-full rounded-full transition-all duration-700`}
                                            style={{ width: `${cat.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {categoryStats.length === 0 && (
                            <div className="col-span-full py-10 flex flex-col items-center justify-center text-center text-textSecondary opacity-80 border-2 border-dashed border-border/50 rounded-2xl">
                                <MoreHorizontal className="mb-2 text-textSecondary/50" size={32} />
                                {t('common:messages.noData')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
