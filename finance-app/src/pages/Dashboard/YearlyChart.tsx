/**
 * Gráfico de desempenho anual (Gastos por cartão ou Lucro mensal)
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Card {
    id: string;
    name: string;
}

interface YearlyChartProps {
    yearlyData: any[];
    cards: Card[];
}

export default function YearlyChart({ yearlyData, cards }: YearlyChartProps) {
    const { t } = useTranslation('dashboard');
    const [chartView, setChartView] = useState<'expense' | 'profit'>('expense');

    return (
        <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white">{t('chart.title')}</h3>
                    <p className="text-textSecondary text-sm mt-1">
                        {chartView === 'expense' ? t('chart.viewExpense') : t('chart.viewProfit')}
                    </p>
                </div>

                <div className="flex bg-background p-1 rounded-xl border border-border/30 mt-4 md:mt-0">
                    <button
                        onClick={() => setChartView('expense')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${chartView === 'expense' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white'
                            }`}
                    >
                        {t('chart.toggleExpense')}
                    </button>
                    <button
                        onClick={() => setChartView('profit')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${chartView === 'profit' ? 'bg-emerald-500 text-white shadow-lg' : 'text-textSecondary hover:text-white'
                            }`}
                    >
                        {t('chart.toggleProfit')}
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
    );
}
