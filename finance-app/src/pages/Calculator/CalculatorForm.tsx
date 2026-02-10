import { useState, useEffect } from 'react';

interface CalculatorFormProps {
    initialValue: number;
    monthlyContribution: number;
    annualRate: number;
    periodMonths: number;
    onInitialValueChange: (value: number) => void;
    onMonthlyContributionChange: (value: number) => void;
    onAnnualRateChange: (value: number) => void;
    onPeriodMonthsChange: (value: number) => void;
}

export default function CalculatorForm({
    initialValue,
    monthlyContribution,
    annualRate,
    periodMonths,
    onInitialValueChange,
    onMonthlyContributionChange,
    onAnnualRateChange,
    onPeriodMonthsChange
}: CalculatorFormProps) {
    // Local state for immediate UI feedback
    const [localInitial, setLocalInitial] = useState(initialValue);
    const [localMonthly, setLocalMonthly] = useState(monthlyContribution);
    const [localRate, setLocalRate] = useState(annualRate);
    const [localPeriod, setLocalPeriod] = useState(periodMonths);

    // Sync from props (e.g. when Reset is clicked)
    useEffect(() => setLocalInitial(initialValue), [initialValue]);
    useEffect(() => setLocalMonthly(monthlyContribution), [monthlyContribution]);
    useEffect(() => setLocalRate(annualRate), [annualRate]);
    useEffect(() => setLocalPeriod(periodMonths), [periodMonths]);

    // Handlers
    const handleInitialChange = (val: number) => {
        setLocalInitial(val);
        onInitialValueChange(val);
    };

    const handleMonthlyChange = (val: number) => {
        setLocalMonthly(val);
        onMonthlyContributionChange(val);
    };

    const handleRateChange = (val: number) => {
        setLocalRate(val);
        onAnnualRateChange(val);
    };

    const handlePeriodChange = (val: number) => {
        setLocalPeriod(val);
        onPeriodMonthsChange(val);
    };

    return (
        <div className="bg-surfaceCard border border-border/50 rounded-2xl p-6 space-y-8">
            <h3 className="text-lg font-bold text-white">Parâmetros do Investimento</h3>

            <div className="space-y-6">
                {/* Initial Value */}
                <div className="space-y-3">
                    <label className="text-sm text-textSecondary font-medium">Valor Inicial (R$)</label>
                    <input
                        type="number"
                        value={localInitial}
                        onChange={(e) => handleInitialChange(Number(e.target.value))}
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                </div>

                {/* Monthly Contribution */}
                <div className="space-y-3">
                    <label className="text-sm text-textSecondary font-medium">Contribuição Mensal (R$)</label>
                    <input
                        type="number"
                        value={localMonthly}
                        onChange={(e) => handleMonthlyChange(Number(e.target.value))}
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                </div>

                {/* Annual Rate Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-textSecondary font-medium">Taxa Anual (%)</label>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm tracking-wide">
                            {localRate.toFixed(1)}%
                        </span>
                    </div>
                    <input
                        type="range" min="0.1" max="30" step="0.1"
                        value={localRate}
                        onChange={(e) => handleRateChange(Number(e.target.value))}
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
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm tracking-wide">
                            {localPeriod} {localPeriod === 1 ? 'mês' : 'meses'}
                        </span>
                    </div>
                    <input
                        type="range" min="1" max="600" step="1"
                        value={localPeriod}
                        onChange={(e) => handlePeriodChange(Number(e.target.value))}
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
    );
}
