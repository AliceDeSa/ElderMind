/**
 * Calculadora de Juros Compostos
 * Refatorada para usar componentes modulares e hook de cálculo
 */

import { useState } from 'react';
import { Calculator as CalcIcon, RefreshCcw, Download, BarChart2 } from 'lucide-react';
import { useCompoundInterest } from '../../hooks/useCompoundInterest';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';
import CalculatorChart from './CalculatorChart';

export default function Calculator() {
    const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');

    // Inputs
    const [initialValue, setInitialValue] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(100);
    const [annualRate, setAnnualRate] = useState(10);
    const [periodMonths, setPeriodMonths] = useState(240); // 20 years

    // Cálculos via hook
    const summary = useCompoundInterest({
        initialValue,
        monthlyContribution,
        annualRate,
        periodMonths
    });

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

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
                    <p className="text-textSecondary text-sm">
                        Calcule o poder dos juros compostos e veja como seu dinheiro pode crescer ao longo do tempo
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 border border-border/50 text-textSecondary hover:text-white rounded-lg flex items-center gap-2 transition-all text-sm bg-surfaceCard/50"
                    >
                        <RefreshCcw size={16} /> Redefinir
                    </button>
                    <button className="px-5 py-2 bg-primary text-white hover:bg-primary/80 rounded-lg flex items-center gap-2 transition-all font-bold text-sm shadow-lg shadow-primary/20">
                        <Download size={16} /> Exportar
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

            {/* Content */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <CalculatorForm
                        initialValue={initialValue}
                        monthlyContribution={monthlyContribution}
                        annualRate={annualRate}
                        periodMonths={periodMonths}
                        onInitialValueChange={setInitialValue}
                        onMonthlyContributionChange={setMonthlyContribution}
                        onAnnualRateChange={setAnnualRate}
                        onPeriodMonthsChange={setPeriodMonths}
                    />

                    {/* Results */}
                    <CalculatorResults
                        summary={summary}
                        initialValue={initialValue}
                        formatCurrency={formatCurrency}
                    />
                </div>

                {/* Chart */}
                <CalculatorChart
                    summary={summary}
                    viewMode={viewMode}
                    formatCurrency={formatCurrency}
                />
            </div>
        </div>
    );
}
