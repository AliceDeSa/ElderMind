/**
 * Exibição de resultados da calculadora de juros compostos
 */

import { TrendingUp } from 'lucide-react';
import type { CompoundInterestResult } from '../../hooks/useCompoundInterest';

interface CalculatorResultsProps {
    summary: CompoundInterestResult;
    initialValue: number;
    formatCurrency: (val: number) => string;
}

export default function CalculatorResults({ summary, initialValue, formatCurrency }: CalculatorResultsProps) {
    return (
        <div className="bg-surfaceCard border border-border/50 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <TrendingUp size={200} />
            </div>

            <div className="space-y-1 relative z-10">
                <span className="text-primary font-bold text-lg">Resultado</span>
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
                    <p className="text-textSecondary text-xs font-bold uppercase tracking-widest opacity-60">Total Investido</p>
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
    );
}
