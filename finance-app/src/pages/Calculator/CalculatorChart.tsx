/**
 * Componente de gráficos da calculadora de juros compostos
 * Suporta visualização simples (linha) e avançada (cenários)
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import type { CompoundInterestResult } from '../../hooks/useCompoundInterest';

interface CalculatorChartProps {
    summary: CompoundInterestResult;
    viewMode: 'simple' | 'advanced';
    formatCurrency: (val: number) => string;
}

export default function CalculatorChart({ summary, viewMode, formatCurrency }: CalculatorChartProps) {
    if (viewMode === 'simple') {
        return (
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
                                formatter={(value) => [formatCurrency(Number(value)), 'Total']}
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
        );
    }

    // Advanced view - Scenarios comparison
    return (
        <div className="bg-surfaceCard border border-border/50 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-10">Comparação de Cenários</h3>
            <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary.scenarios} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="5 5" stroke="#27272a" vertical={false} />
                        <XAxis
                            dataKey="rate"
                            stroke="#71717a"
                            tick={{ fill: '#71717a', fontSize: 12, fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}%`}
                        />
                        <YAxis
                            stroke="#71717a"
                            tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                            tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <RechartsTooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px' }}
                            formatter={(value) => [formatCurrency(Number(value)), '']}
                            labelFormatter={(label) => `Taxa: ${label}%`}
                        />
                        <Legend />
                        <Bar dataKey="balance" fill="#8b5cf6" name="Saldo Final" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="interest" fill="#10b981" name="Juros" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
