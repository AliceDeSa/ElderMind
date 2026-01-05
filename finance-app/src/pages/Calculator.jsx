import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Calculator as CalcIcon, RefreshCcw, Download, BarChart2, TrendingUp, DollarSign, PieChart as PieChartIcon } from 'lucide-react';

export default function Calculator() {
    const [viewMode, setViewMode] = useState('simple'); // 'simple' | 'advanced'

    // Inputs
    const [initialValue, setInitialValue] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(100);
    const [annualRate, setAnnualRate] = useState(10);
    const [periodMonths, setPeriodMonths] = useState(240); // 20 years

    // --- Calculation Logic ---
    const summary = useMemo(() => {
        let bal = initialValue;
        let inv = initialValue;
        const mRate = annualRate / 12 / 100;
        const allMonths = [];

        const safePeriod = Math.min(Math.max(1, periodMonths), 1200);

        for (let m = 1; m <= safePeriod; m++) {
            const interest = bal * mRate;
            bal += interest + monthlyContribution;
            inv += monthlyContribution;

            allMonths.push({
                month: m,
                label: `Mês ${m}`,
                balance: bal,
                invested: inv,
                interest: bal - inv
            });
        }

        const final = allMonths[allMonths.length - 1] || { balance: initialValue, invested: initialValue, interest: 0 };
        const roi = final.invested > 0 ? ((final.balance - final.invested) / final.invested) * 100 : 0;
        const multiplier = final.invested > 0 ? final.balance / final.invested : 0;

        // Chart Data (sparse for performance)
        const chartData = allMonths.filter((d, i) =>
            safePeriod <= 24 ? true :
                safePeriod <= 60 ? i % 3 === 0 :
                    safePeriod <= 120 ? i % 6 === 0 :
                        i % 12 === 0 || i === safePeriod - 1
        );

        // Scenarios for Advanced View
        const scenarioRates = [5, 10, 15, 20];
        const scenarios = scenarioRates.map(rate => {
            let sBal = initialValue;
            const smRate = rate / 12 / 100;
            for (let m = 1; m <= safePeriod; m++) {
                sBal += (sBal * smRate) + monthlyContribution;
            }
            return { rate, balance: sBal, interest: sBal - (initialValue + monthlyContribution * safePeriod) };
        });

        return {
            totalParams: { initialValue, monthlyContribution, periodMonths: safePeriod },
            finalBalance: final.balance,
            totalInvested: final.invested,
            totalInterest: final.interest,
            roi,
            multiplier,
            chartData,
            fullData: allMonths,
            scenarios
        };

    }, [initialValue, monthlyContribution, annualRate, periodMonths]);

    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const handleReset = () => {
        setInitialValue(1000);
        setMonthlyContribution(100);
        setAnnualRate(10);
        setPeriodMonths(240);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                        <CalcIcon className="text-primary text-3xl" /> Calculadora de Juros Compostos
                    </h1>
                    <p className="text-textSecondary text-sm">Calcule o poder dos juros compostos e veja como seu dinheiro pode crescer ao longo do tempo</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleReset} className="px-4 py-2 border border-border/50 text-textSecondary hover:text-white rounded-lg flex items-center gap-2 transition-all text-sm bg-surfaceCard/50">
                        <RefreshCcw size={16} /> Redefinir
                    </button>
                    <button className="px-5 py-2 bg-primary text-white hover:bg-primary/80 rounded-lg flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-primary/20">
                        <Download size={16} /> Exportador
                    </button>
                </div>
            </div>

            {/* Tabs Selector */}
            <div className="flex bg-surfaceCard/40 p-1.5 rounded-2xl border border-border/30 w-full backdrop-blur-sm">
                <button
                    onClick={() => setViewMode('simple')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 ${viewMode === 'simple'
                            ? 'bg-background border border-border/50 text-white shadow-xl'
                            : 'text-textSecondary hover:text-white'
                        }`}
                >
                    <CalcIcon size={18} className={viewMode === 'simple' ? 'text-primary' : ''} /> Simples
                </button>
                <button
                    onClick={() => setViewMode('advanced')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 ${viewMode === 'advanced'
                            ? 'bg-background border border-border/50 text-white shadow-xl'
                            : 'text-textSecondary hover:text-white'
                        }`}
                >
                    <BarChart2 size={18} className={viewMode === 'advanced' ? 'text-primary' : ''} /> Avançado
                </button>
            </div>

            {viewMode === 'simple' ? (
                /* SIMPLE VIEW */
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Parameters */}
                        <div className="bg-surfaceCard border border-border/50 rounded-2xl p-6 space-y-8">
                            <h3 className="text-lg font-bold text-white">Parâmetros do Investimento</h3>

                            <div className="space-y-6">
                                {/* Initial Value */}
                                <div className="space-y-3">
                                    <label className="text-sm text-textSecondary font-medium">Valor Inicial (R$)</label>
                                    <input
                                        type="number"
                                        value={initialValue}
                                        onChange={(e) => setInitialValue(Number(e.target.value))}
                                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    />
                                </div>

                                {/* Monthly Contribution */}
                                <div className="space-y-3">
                                    <label className="text-sm text-textSecondary font-medium">Contribuição Mensal (R$)</label>
                                    <input
                                        type="number"
                                        value={monthlyContribution}
                                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                                    />
                                </div>

                                {/* Annual Rate Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm text-textSecondary font-medium">Taxa Anual (%)</label>
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm tracking-wide">{annualRate}%</span>
                                    </div>
                                    <input
                                        type="range" min="0.1" max="30" step="0.1"
                                        value={annualRate}
                                        onChange={(e) => setAnnualRate(Number(e.target.value))}
                                        className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-textSecondary font-medium uppercase tracking-tighter">
                                        <span>0.1%</span>
                                        <span>15%</span>
                                        <span>30%</span>
                                    </div>
                                </div>

                                {/* Period Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm text-textSecondary font-medium">Período (meses)</label>
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm tracking-wide">{periodMonths} meses</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="600" step="1"
                                        value={periodMonths}
                                        onChange={(e) => setPeriodMonths(Number(e.target.value))}
                                        className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-textSecondary font-medium uppercase tracking-tighter">
                                        <span>1 mês</span>
                                        <span>300 meses (25 anos)</span>
                                        <span>600 meses (50 anos)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary / por */}
                        <div className="bg-surfaceCard border border-border/50 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                <TrendingUp size={200} />
                            </div>

                            <div className="space-y-1 relative z-10">
                                <span className="text-primary font-bold text-lg">por</span>
                                <div className="bg-background/40 border border-border/30 rounded-3xl p-10 text-center shadow-2xl backdrop-blur-sm">
                                    <h2 className="text-5xl font-black text-primary mb-2 glow-text">
                                        {formatCurrency(summary.finalBalance)}
                                    </h2>
                                    <p className="text-textSecondary font-bold text-sm uppercase tracking-widest opacity-60">Valor Final</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 my-8 relative z-10">
                                <div className="bg-background/30 border border-border/30 rounded-2xl p-5 text-center transition-all hover:bg-background/50">
                                    <p className="text-emerald-400 text-2xl font-bold mb-1">{formatCurrency(summary.totalInterest)}</p>
                                    <p className="text-textSecondary text-xs font-bold uppercase tracking-widest opacity-60">Juros Ganhos</p>
                                </div>
                                <div className="bg-background/30 border border-border/30 rounded-2xl p-5 text-center transition-all hover:bg-background/50">
                                    <p className="text-blue-400 text-2xl font-bold mb-1">{formatCurrency(summary.totalInvested)}</p>
                                    <p className="text-textSecondary text-xs font-bold uppercase tracking-widest opacity-60">Totalmente investido</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/50 relative z-10">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-textSecondary">Valor inicial:</span>
                                    <span className="text-white">{formatCurrency(initialValue)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-textSecondary">Contribuições:</span>
                                    <span className="text-white font-bold">{formatCurrency(summary.totalInvested - initialValue)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-textSecondary">Juros compostos:</span>
                                    <span className="text-emerald-400 font-bold">{formatCurrency(summary.totalInterest)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black border-t border-border/30 pt-4">
                                    <span className="text-textSecondary">Total final:</span>
                                    <span className="text-primary">{formatCurrency(summary.finalBalance)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Line Chart */}
                    <div className="bg-surfaceCard border border-border/50 rounded-3xl p-8 shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
                            Crescimento ao Longo do Tempo
                        </h3>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={summary.chartData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="5 5" stroke="#27272a" vertical={false} />
                                    <XAxis
                                        dataKey="label"
                                        stroke="#71717a"
                                        tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={15}
                                    />
                                    <YAxis
                                        stroke="#71717a"
                                        tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                                        tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-10}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                        formatter={(value) => [formatCurrency(value), 'Total']}
                                        labelStyle={{ color: '#71717a', marginBottom: '8px', fontWeight: 'bold' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="balance"
                                        stroke="#8b5cf6"
                                        strokeWidth={4}
                                        dot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                                        activeDot={{ r: 8, fill: '#fff' }}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                /* ADVANCED VIEW */
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Analysis & Scenarios */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-surfaceCard border border-border/50 rounded-2xl p-6">
                                <h3 className="text-base font-bold text-textSecondary uppercase tracking-widest mb-6 opacity-80">Análise</h3>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-background/80 border border-border/30 rounded-2xl p-6 text-center shadow-inner">
                                        <p className="text-3xl font-black text-emerald-400 mb-1">{summary.roi.toFixed(1)} %</p>
                                        <p className="text-[10px] text-textSecondary font-bold uppercase tracking-widest opacity-60">ROI</p>
                                    </div>
                                    <div className="bg-background/80 border border-border/30 rounded-2xl p-6 text-center shadow-inner">
                                        <p className="text-3xl font-black text-blue-400 mb-1">{summary.multiplier.toFixed(1)} x</p>
                                        <p className="text-[10px] text-textSecondary font-bold uppercase tracking-widest opacity-60">Multiplicador</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Cenários de Taxa:</p>
                                    <div className="space-y-2">
                                        {summary.scenarios.map(s => (
                                            <div key={s.rate} className="flex items-center justify-between p-3 bg-background/40 border border-border/20 rounded-xl hover:bg-background/60 transition-colors">
                                                <span className="text-sm font-bold text-white w-16">{s.rate} % aa</span>
                                                <span className="text-sm font-black text-primary">{formatCurrency(s.balance)}</span>
                                                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg font-bold">
                                                    {formatCurrency(s.interest)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stacked Bar Chart */}
                        <div className="lg:col-span-7 bg-surfaceCard border border-border/50 rounded-2xl p-6">
                            <h3 className="text-base font-bold text-textSecondary uppercase tracking-widest mb-8 opacity-80">Gráfico de Contribuições vs Juros</h3>
                            <div className="h-[380px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={summary.chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                                        <CartesianGrid strokeDasharray="5 5" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="label" stroke="#71717a" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }} tickLine={false} axisLine={false} />
                                        <YAxis
                                            stroke="#71717a"
                                            tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                                            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <RechartsTooltip
                                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                                            formatter={(value) => formatCurrency(value)}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '30px' }} iconType="circle" />
                                        <Bar dataKey="invested" name="Totalmente Investido" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={24} />
                                        <Bar dataKey="interest" name="Juros Acumulados" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Evolution Table */}
                    <div className="bg-surfaceCard border border-border/50 rounded-3xl p-8 overflow-hidden shadow-2xl">
                        <h3 className="text-xl font-extrabold text-white mb-8 flex items-center gap-3">
                            Evolução Mensal
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-textSecondary text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                                        <th className="px-6 py-4">Mês</th>
                                        <th className="px-6 py-4">Valor Inicial</th>
                                        <th className="px-6 py-4">Contribuições</th>
                                        <th className="px-6 py-4">Juros</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Show only every 12 months for cleanliness like image */}
                                    {summary.fullData.filter(d => d.month % 12 === 0).map((row) => (
                                        <tr key={row.month} className="bg-background/40 hover:bg-white/5 transition-all group rounded-xl overflow-hidden shadow-lg border border-border/10">
                                            <td className="px-6 py-5 text-sm font-black text-white group-hover:text-primary transition-colors">{row.month}</td>
                                            {/* Rough calculation for Valor Inicial de cada periodo de 12 meses */}
                                            <td className="px-6 py-5 text-sm font-bold text-textSecondary">
                                                {formatCurrency(summary.fullData[row.month - 12] ? summary.fullData[row.month - 12].balance : initialValue)}
                                            </td>
                                            <td className="px-6 py-5 text-sm font-bold text-textSecondary">{formatCurrency(monthlyContribution * 12)}</td>
                                            <td className="px-6 py-5 text-sm font-bold text-emerald-400">
                                                {formatCurrency(row.interest - (summary.fullData[row.month - 13] ? summary.fullData[row.month - 13].interest : 0))}
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-white text-base">
                                                {formatCurrency(row.balance)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-center py-6">
                                <span className="text-xs text-textSecondary font-bold uppercase tracking-widest opacity-40">... e mais {summary.totalParams.periodMonths % 12} meses</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
