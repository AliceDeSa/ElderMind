import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, X, Coffee, Home, Car, Utensils, ShoppingBag, Globe, MoreHorizontal } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

export default function AnalysisTab() {
    const { incomes, expenses, cards, budgetAllocation, selectedMonth, getYearlyStats } = useFinance();
    const [data, setData] = useState([]);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
    const [selectedCardFilter, setSelectedCardFilter] = useState(null);
    const [expandedBudgets, setExpandedBudgets] = useState([]);

    // Load Yearly Data for the Chart
    useEffect(() => {
        setData(getYearlyStats());
    }, [getYearlyStats]);

    // --- CALCULATIONS ---

    // 1. Total Income for selected month
    const totalMonthIncome = useMemo(() => {
        return incomes
            .filter(i => i.recurring || i.month === selectedMonthIndex)
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    }, [incomes, selectedMonthIndex]);

    // 2. Total Expenditure for selected month
    const totalMonthExpense = useMemo(() => {
        return expenses
            .filter(e => {
                const date = new Date(e.date);
                return date.getMonth() === selectedMonthIndex;
            })
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    }, [expenses, selectedMonthIndex]);

    // 3. Process categories stats (RESTORED)
    const categoryStats = useMemo(() => {
        const monthlyExpenses = expenses.filter(e => {
            const date = new Date(e.date);
            return date.getMonth() === selectedMonthIndex;
        });

        const groups = monthlyExpenses.reduce((acc, exp) => {
            const cat = exp.category || 'Outros';
            if (!acc[cat]) acc[cat] = 0;
            acc[cat] += Number(exp.amount);
            return acc;
        }, {});

        const iconMap = {
            'Alimentação': { icon: Utensils, color: 'bg-orange-500' },
            'Moradia': { icon: Home, color: 'bg-blue-500' },
            'Transporte': { icon: Car, color: 'bg-emerald-500' },
            'Educação': { icon: Globe, color: 'bg-purple-500' },
            'Lazer': { icon: ShoppingBag, color: 'bg-pink-500' },
            'Café': { icon: Coffee, color: 'bg-amber-600' },
            'Outros': { icon: MoreHorizontal, color: 'bg-slate-500' }
        };

        return Object.entries(groups).map(([name, amount]) => ({
            name,
            amount,
            icon: iconMap[name]?.icon || MoreHorizontal,
            color: iconMap[name]?.color || 'bg-slate-500',
            percentage: totalMonthExpense > 0 ? (amount / totalMonthExpense) * 100 : 0
        })).sort((a, b) => b.amount - a.amount);
    }, [expenses, selectedMonthIndex, totalMonthExpense]);

    // 4. Process budgets and their associated expenses
    const budgetStats = useMemo(() => {
        return budgetAllocation.map(budget => {
            const linkedExpenses = expenses.filter(e => {
                const date = new Date(e.date);
                return e.budgetId === budget.id && date.getMonth() === selectedMonthIndex;
            });

            const spent = linkedExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
            const limit = totalMonthIncome * (budget.value / 100);
            const remaining = limit - spent;
            const progress = limit > 0 ? (spent / limit) * 100 : 0;

            return {
                ...budget,
                limit,
                spent,
                remaining,
                progress,
                expenses: linkedExpenses
            };
        });
    }, [budgetAllocation, expenses, totalMonthIncome, selectedMonthIndex]);

    // --- CHART HELPERS ---
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const handleBarClick = (data, index) => {
        setSelectedMonthIndex(selectedMonthIndex === index ? null : index);
    };

    const handleLegendClick = (cardName) => {
        setSelectedCardFilter(selectedCardFilter === cardName ? null : cardName);
    };

    const CustomLegend = () => (
        <div className="flex flex-wrap justify-center gap-6 mt-4">
            {cards.map((card, idx) => {
                const color = idx % 2 === 0 ? '#8b5cf6' : '#f97316';
                return (
                    <div
                        key={card.id}
                        onClick={() => handleLegendClick(card.name)}
                        className={`flex items-center gap-2 cursor-pointer transition-opacity ${selectedCardFilter && selectedCardFilter !== card.name ? 'opacity-30' : 'opacity-100'}`}
                    >
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                        <span className="text-sm font-medium text-textSecondary">{card.name}</span>
                    </div>
                )
            })}
        </div>
    );

    const formatBRL = (val) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const toggleBudgetExpand = (id) => {
        setExpandedBudgets(prev =>
            prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* 1. Main Chart Section */}
            <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Fluxo Anual de Gastos</h3>
                        <p className="text-textSecondary text-sm mt-1">
                            {selectedMonthIndex !== null
                                ? `Visualizando detalhes de ${months[selectedMonthIndex]}`
                                : 'Toque nas barras para ver detalhes mensais'
                            }
                        </p>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        {selectedMonthIndex !== null && (
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center border border-primary/30">
                                Mês: {months[selectedMonthIndex]}
                                <button onClick={() => setSelectedMonthIndex(null)} className="ml-2 hover:text-white"><X size={12} /></button>
                            </span>
                        )}
                        {selectedCardFilter && (
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center border border-blue-500/30">
                                Cartão: {selectedCardFilter}
                                <button onClick={() => setSelectedCardFilter(null)} className="ml-2 hover:text-white"><X size={12} /></button>
                            </span>
                        )}
                    </div>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} onClick={(e) => {
                            if (e && e.activeTooltipIndex !== undefined) handleBarClick(null, e.activeTooltipIndex);
                        }}>
                            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `K${(value / 1000).toFixed(1)}`} />
                            <RechartsTooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                            />
                            <Legend content={<CustomLegend />} />

                            {cards.map((card, idx) => (
                                <Bar
                                    key={card.id}
                                    dataKey={card.name}
                                    stackId="a"
                                    radius={idx === cards.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    fill={idx % 2 === 0 ? '#8b5cf6' : '#f97316'}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={idx % 2 === 0 ? '#8b5cf6' : '#f97316'}
                                            fillOpacity={(selectedMonthIndex === null || selectedMonthIndex === index) && (selectedCardFilter === null || selectedCardFilter === card.name) ? 1 : 0.3}
                                        />
                                    ))}
                                </Bar>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 2. Resumo Contextual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                    <p className="text-textSecondary text-xs mb-1 uppercase font-bold tracking-wider">Total Disponível</p>
                    <p className="text-2xl font-bold text-white">{formatBRL(totalMonthIncome)}</p>
                </div>
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                    <p className="text-textSecondary text-xs mb-1 uppercase font-bold tracking-wider">Total Gasto</p>
                    <p className="text-2xl font-bold text-red-500">
                        {formatBRL(totalMonthExpense)}
                    </p>
                </div>
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                    <p className="text-textSecondary text-xs mb-1 uppercase font-bold tracking-wider">Maior Categoria</p>
                    <p className="text-2xl font-bold text-emerald-500">
                        {categoryStats[0]?.name || '-'}
                    </p>
                </div>
            </div>

            {/* 3. Gastos por Categoria (RESTORED SECTION) */}
            <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                <h3 className="text-xl font-bold text-white mb-6">Gastos por Categoria</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryStats.map((cat, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-background/30 border border-border/20">
                            <div className={`p-3 rounded-lg ${cat.color} bg-opacity-20 text-white`}>
                                <cat.icon size={20} className={cat.color.replace('bg-', 'text-')} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-sm font-bold text-white truncate">{cat.name}</span>
                                    <span className="text-sm font-black text-white">{formatBRL(cat.amount)}</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`${cat.color} h-full rounded-full transition-all duration-700`}
                                        style={{ width: `${cat.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {categoryStats.length === 0 && (
                    <div className="py-10 text-center text-textSecondary italic">Nenhum gasto registrado no período.</div>
                )}
            </div>

            {/* 4. Acompanhamento de Metas */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Controle de Metas Financeiras</h3>
                    <div className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 font-bold uppercase">
                        Automático • {months[selectedMonthIndex] || 'Global'}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {budgetStats.map((budget) => {
                        const isExpanded = expandedBudgets.includes(budget.id);
                        const isOverLimit = budget.spent > budget.limit;

                        return (
                            <div key={budget.id} className="bg-surfaceCard rounded-2xl border border-border/30 overflow-hidden transition-all hover:border-white/10">
                                <div onClick={() => toggleBudgetExpand(budget.id)} className="p-6 cursor-pointer select-none">
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="text-lg font-bold text-white">{budget.name}</h4>
                                        {isExpanded ? <ChevronUp size={20} className="text-textSecondary" /> : <ChevronDown size={20} className="text-textSecondary" />}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                        {/* Saldo disponível */}
                                        <div>
                                            <p className="text-xs text-textSecondary font-medium mb-1 truncate">Saldo disponível</p>
                                            <p className="text-[15px] font-bold text-white">{formatBRL(budget.limit)}</p>
                                        </div>

                                        {/* Valor gasto */}
                                        <div>
                                            <p className="text-xs text-textSecondary font-medium mb-1 truncate">Valor gasto</p>
                                            <p className="text-[15px] font-bold text-white">{formatBRL(budget.spent)}</p>
                                        </div>

                                        {/* Restante */}
                                        <div>
                                            <p className="text-xs text-textSecondary font-medium mb-1 truncate">Restante</p>
                                            <p className={`text-[15px] font-bold ${budget.remaining >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {budget.remaining >= 0 ? '+' : ''}{formatBRL(budget.remaining)}
                                            </p>
                                        </div>

                                        {/* Progresso */}
                                        <div>
                                            <p className="text-xs text-textSecondary font-medium mb-1 truncate">Progresso</p>
                                            <p className={`text-[15px] font-bold ${isOverLimit ? 'text-red-500' : 'text-white'}`}>
                                                {budget.progress.toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative h-2 w-full bg-background rounded-full overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full transition-all duration-500 rounded-full" style={{ width: `${Math.min(budget.progress, 100)}%`, backgroundColor: budget.color }} />
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="bg-background/20 border-t border-border/20 p-6 pt-4">
                                        <h5 className="text-[10px] font-black text-textSecondary uppercase mb-4 tracking-widest pl-2 border-l-2 border-primary">Listagem de Despesas</h5>
                                        {budget.expenses.length > 0 ? (
                                            <div className="space-y-2">
                                                {budget.expenses.map((expense) => (
                                                    <div key={expense.id} className="flex justify-between items-center p-3 bg-surfaceCard/40 rounded-xl border border-border/10 hover:border-white/5 transition-colors">
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{expense.description}</p>
                                                            <div className="flex items-center gap-2 text-[10px] mt-1">
                                                                <p className="text-textSecondary">{expense.category} • {expense.date}</p>
                                                                {expense.tag && (
                                                                    <>
                                                                        <span className="w-1 h-1 rounded-full bg-textSecondary/30"></span>
                                                                        <span className="text-emerald-500 font-medium">#{expense.tag}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm font-bold text-white">{formatBRL(expense.amount)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-6 text-center text-textSecondary text-xs italic">Nenhum gasto vinculado nesta meta.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
