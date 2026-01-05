import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';
import MonthSelector from '../components/MonthSelector';
import CarouselCard from '../components/CarouselCard';
import { TrendingUp, TrendingDown, Target, CreditCard, Home, Car, Coffee, Smartphone, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function Dashboard() {
    const { user } = useAuth();
    const {
        selectedMonth,
        setSelectedMonth,
        getSummary,
        expenses,
        cards,
        getYearlyStats
    } = useFinance();

    const [chartView, setChartView] = useState('expense'); // 'expense' or 'profit'
    const [yearlyData, setYearlyData] = useState([]);

    useEffect(() => {
        setYearlyData(getYearlyStats());
    }, [getYearlyStats]);

    const summary = getSummary();

    // --- MOCK DATA FOR CAROUSEL (Goals not yet in context fully but placeholders kept) ---
    const goals = [
        { id: 1, name: 'Carro Novo', current: 15000, target: 50000, color: 'bg-emerald-500' },
        { id: 2, name: 'Viagem para o Japão', current: 5000, target: 15000, color: 'bg-blue-500' },
        { id: 3, name: 'Reserva de Emergência', current: 2000, target: 10000, color: 'bg-yellow-500' },
    ];

    // Derive Credit Card Info from Expenses
    const creditCards = ['Nubank', 'Inter'].map((cardName, index) => {
        const cardExpenses = expenses.filter(e => e.card === cardName);
        const used = cardExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
        return {
            id: index + 1,
            name: cardName,
            limit: cardName === 'Nubank' ? 10000 : 5000, // Mock limit
            used: used,
            color: cardName === 'Nubank' ? 'text-purple-500' : 'text-orange-500'
        };
    });

    // Derive Categories from Expenses
    const categoriesList = ['Alimentação', 'Moradia', 'Transporte', 'Lazer'];
    const categories = categoriesList.map((catName, index) => {
        const catExpenses = expenses.filter(e => e.category === catName && (new Date(e.date).getMonth() === selectedMonth));
        const total = catExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
        const colors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-pink-500'];
        const icons = [Coffee, Home, Car, Smartphone];

        return {
            id: index + 1,
            name: catName,
            amount: total,
            color: colors[index],
            icon: icons[index]
        };
    }).sort((a, b) => b.amount - a.amount); // Sort by highest spend

    const calculatePercentage = (current, target) => Math.min(100, Math.round((current / target) * 100));

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        Olá, {user?.user_metadata?.name || 'Visitante'}! <span className="text-2xl">👋</span>
                    </h1>
                    <p className="text-textSecondary">Aqui está um resumo da sua situação financeira</p>
                </div>
                <MonthSelector
                    onDateChange={(date) => setSelectedMonth(date.getMonth())}
                    initialDate={new Date(new Date().setMonth(selectedMonth))}
                />
            </div>

            {/* Summary Grid - Changed to stretch heights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-stretch">
                {/* Receita */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 flex flex-col justify-between min-h-[160px]">
                    <div className="flex justify-between items-start">
                        <h3 className="text-textSecondary text-sm font-medium">Receita Mensal</h3>
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl font-bold text-white truncate">R$ {summary.income.toLocaleString()}</p>
                        <p className="text-xs text-emerald-500 flex items-center mt-1">
                            +12% <span className="text-textSecondary ml-1">vs mês anterior</span>
                        </p>
                    </div>
                </div>

                {/* Gastos */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 flex flex-col justify-between min-h-[160px]">
                    <div className="flex justify-between items-start">
                        <h3 className="text-textSecondary text-sm font-medium">Gasto Mensal</h3>
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                            <TrendingDown size={20} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl font-bold text-white truncate">R$ {summary.expense.toLocaleString()}</p>
                        <p className="text-xs text-red-500 flex items-center mt-1">
                            -5% <span className="text-textSecondary ml-1">vs mês anterior</span>
                        </p>
                    </div>
                </div>

                {/* Metas Carousel - Removed fixed height wrapper, added min-h */}
                <div className="min-h-[160px]">
                    <CarouselCard
                        title="Minhas Metas"
                        items={goals}
                        renderItem={(goal) => (
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-base font-semibold text-white truncate max-w-[70%]">{goal.name}</span>
                                    <span className="text-xs text-textSecondary whitespace-nowrap">{calculatePercentage(goal.current, goal.target)}%</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-2 mb-2">
                                    <div className={`${goal.color} h-2 rounded-full`} style={{ width: `${calculatePercentage(goal.current, goal.target)}%` }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-textSecondary">
                                    <span>R$ {goal.current.toLocaleString()}</span>
                                    <span>R$ {goal.target.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Credit Cards Carousel - Removed fixed height wrapper, added min-h */}
                <div className="min-h-[160px]">
                    <CarouselCard
                        title="Cartões de Crédito"
                        items={creditCards}
                        renderItem={(card) => (
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-base font-bold ${card.color} truncate max-w-[80%]`}>{card.name}</span>
                                    <CreditCard size={18} className="text-textSecondary flex-shrink-0" />
                                </div>
                                <p className="text-2xl font-bold text-white mb-2 truncate">R$ {card.used.toLocaleString()}</p>

                                <div className="w-full bg-background rounded-full h-1.5 mb-1">
                                    <div className={`bg-white h-1.5 rounded-full`} style={{ width: `${calculatePercentage(card.used, card.limit)}%` }}></div>
                                </div>
                                <p className="text-xs text-textSecondary text-right truncate">Limite: R$ {card.limit.toLocaleString()}</p>
                            </div>
                        )}
                    />
                </div>
            </div>

            {/* Annual Performance Chart (NEW) */}
            <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white">Desempenho Anual</h3>
                        <p className="text-textSecondary text-sm mt-1">
                            {chartView === 'expense' ? 'Visualizando gastos por cartão' : 'Visualizando lucro mensal (Receita - Gastos)'}
                        </p>
                    </div>

                    <div className="flex bg-background p-1 rounded-xl border border-border/30 mt-4 md:mt-0">
                        <button
                            onClick={() => setChartView('expense')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${chartView === 'expense' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white'}`}
                        >
                            Gastos
                        </button>
                        <button
                            onClick={() => setChartView('profit')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${chartView === 'profit' ? 'bg-emerald-500 text-white shadow-lg' : 'text-textSecondary hover:text-white'}`}
                        >
                            Lucro
                        </button>
                    </div>
                </div>

                <div className="h-[300px] min-h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: '#1e1b4b',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                            />
                            {chartView === 'expense' ? (
                                cards.map((card, idx) => (
                                    <Bar
                                        key={card.id}
                                        dataKey={card.name}
                                        stackId="a"
                                        fill={idx % 2 === 0 ? '#8b5cf6' : '#f97316'}
                                        radius={[4, 4, 0, 0]}
                                    />
                                ))
                            ) : (
                                <Bar
                                    dataKey="profit"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gastos por Categoria */}
                <div className="lg:col-span-2 bg-surfaceCard p-6 rounded-2xl border border-border/50">
                    <h3 className="text-lg font-bold text-white mb-6">Gastos por Categoria</h3>
                    <div className="space-y-4">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${cat.color} bg-opacity-10 text-white`}>
                                    <cat.icon size={20} className={cat.color.replace('bg-', 'text-')} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-textMain">{cat.name}</span>
                                        <span className="text-sm font-bold text-white">R$ {cat.amount}</span>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-2">
                                        <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${(cat.amount / (summary.expense || 1)) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metas Compacto */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                    <h3 className="text-lg font-bold text-white mb-6">Metas em Foco</h3>
                    <div className="space-y-6">
                        {goals.map((goal) => (
                            <div key={goal.id}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-textSecondary truncate max-w-[70%]">{goal.name}</span>
                                    <span className="text-primary font-bold">{calculatePercentage(goal.current, goal.target)}%</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-2">
                                    <div className={`${goal.color} h-2 rounded-full`} style={{ width: `${calculatePercentage(goal.current, goal.target)}%` }}></div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-2 mt-4 text-sm text-primary hover:text-white border border-primary/20 hover:bg-primary/10 rounded-lg transition-all">
                            Ver todas as metas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
