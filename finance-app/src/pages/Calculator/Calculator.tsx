import { useState } from 'react';
import { Calculator as CalcIcon, RefreshCcw, Download, Sparkles, LineChart } from 'lucide-react';
import { useCompoundInterest } from '../../hooks/useCompoundInterest';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';
import CalculatorChart from './CalculatorChart';
import CalculatorIntuitive from './CalculatorIntuitive';

export default function Calculator() {
    const [viewMode, setViewMode] = useState<'intuitive' | 'standard'>('intuitive');

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
                        <CalcIcon className="text-primary text-3xl" /> Calculadora Financeira
                    </h1>
                    <p className="text-textSecondary text-sm">
                        Simule o crescimento do seu patrimônio com a visão ideal para o seu nível de conhecimento.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 border border-border/50 text-textSecondary hover:text-white rounded-lg flex items-center gap-2 transition-all text-sm bg-surfaceCard/50"
                    >
                        <RefreshCcw size={16} /> Redefinir
                    </button>
                </div>
            </div>

            {/* Tabs Selector */}
            <div className="flex bg-surfaceCard/40 p-1.5 rounded-2xl border border-border/30 w-full backdrop-blur-sm">
                <button
                    onClick={() => setViewMode('intuitive')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 ${viewMode === 'intuitive'
                            ? 'bg-background border border-border/50 text-purple-400 shadow-xl'
                            : 'text-textSecondary hover:text-white'
                        }`}
                >
                    <Sparkles size={18} className={viewMode === 'intuitive' ? 'text-purple-400' : ''} /> Intuitiva & Lúdica
                </button>
                <button
                    onClick={() => setViewMode('standard')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 ${viewMode === 'standard'
                            ? 'bg-background border border-border/50 text-primary shadow-xl'
                            : 'text-textSecondary hover:text-white'
                        }`}
                >
                    <LineChart size={18} className={viewMode === 'standard' ? 'text-primary' : ''} /> Juros Compostos Padrão
                </button>
            </div>

            {/* Content */}
            {viewMode === 'intuitive' ? (
                <CalculatorIntuitive />
            ) : (
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
                        viewMode="advanced"
                        formatCurrency={formatCurrency}
                    />
                </div>
            )}
        </div>
    );
}
