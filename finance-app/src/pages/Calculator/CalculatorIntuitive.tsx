import React, { useState } from 'react';
import { PiggyBank, Sparkles, TrendingUp, Coins } from 'lucide-react';

export default function CalculatorIntuitive() {
    const [initialAmount, setInitialAmount] = useState(500);
    const [monthlyContribution, setMonthlyContribution] = useState(150);
    const [years, setYears] = useState(5);
    const [profile, setProfile] = useState<'safe' | 'moderate' | 'bold'>('moderate');

    // Expected annual rates for ludic profiles
    const rates = {
        safe: 0.07,     // ~7% aa (Poupança/Tesouro Selic)
        moderate: 0.11, // ~11% aa (CDB/Fundos)
        bold: 0.15      // ~15% aa (Ações/FIIs)
    };

    const annualRate = rates[profile];
    const months = years * 12;
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

    // Compound interest calculation
    let totalAccumulated = initialAmount * Math.pow(1 + monthlyRate, months);
    let totalInvested = initialAmount;

    for (let i = 1; i <= months; i++) {
        totalAccumulated += monthlyContribution * Math.pow(1 + monthlyRate, months - i);
        totalInvested += monthlyContribution;
    }

    const interestEarned = Math.max(0, totalAccumulated - totalInvested);
    const multiplier = totalInvested > 0 ? (totalAccumulated / totalInvested).toFixed(1) : '1.0';

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header & Concept Explanation */}
            <div className="bg-gradient-to-r from-purple-900/40 via-surfaceCard to-surfaceCard p-6 rounded-2xl border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Simulador Intuitivo: A Mágica dos Juros</h3>
                        <p className="text-xs text-textSecondary">Descubra como pequenos passos hoje se transformam na sua independência amanhã.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Visual Controls */}
                <div className="lg:col-span-6 bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-6 flex flex-col justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <PiggyBank className="text-primary" size={20} />
                        Monte a sua Simulação
                    </h4>

                    {/* Step 1: Initial Amount */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-textSecondary flex items-center gap-2">
                                <span>1.</span> Quanto você tem hoje para começar?
                            </span>
                            <span className="text-white bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-black">
                                {formatBRL(initialAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="20000"
                            step="100"
                            value={initialAmount}
                            onChange={(e) => setInitialAmount(Number(e.target.value))}
                            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-[10px] text-textSecondary font-semibold">
                            <span>R$ 0</span>
                            <span>R$ 10.000</span>
                            <span>R$ 20.000</span>
                        </div>
                    </div>

                    {/* Step 2: Monthly Contribution */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-textSecondary flex items-center gap-2">
                                <span>2.</span> Quanto você vai guardar todo mês?
                            </span>
                            <span className="text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full text-xs font-black">
                                {formatBRL(monthlyContribution)} / mês
                            </span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="3000"
                            step="10"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-[10px] text-textSecondary font-semibold">
                            <span>R$ 20</span>
                            <span>R$ 1.500</span>
                            <span>R$ 3.000</span>
                        </div>
                    </div>

                    {/* Step 3: Time Horizon */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-textSecondary flex items-center gap-2">
                                <span>3.</span> Por quantos anos você deixará render?
                            </span>
                            <span className="text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full text-xs font-black">
                                {years} {years === 1 ? 'ano' : 'anos'} ({months} meses)
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-[10px] text-textSecondary font-semibold">
                            <span>1 ano</span>
                            <span>15 anos</span>
                            <span>30 anos</span>
                        </div>
                    </div>

                    {/* Step 4: Investment Style */}
                    <div className="space-y-2 pt-2 border-t border-border/30">
                        <span className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
                            4. Estilo de Rendimento Estimado
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setProfile('safe')}
                                className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                                    profile === 'safe'
                                        ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-lg'
                                        : 'bg-background border-border/40 text-textSecondary hover:text-white'
                                }`}
                            >
                                Conservador
                                <span className="block text-[10px] opacity-75 mt-0.5">~7% a.a.</span>
                            </button>
                            <button
                                onClick={() => setProfile('moderate')}
                                className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                                    profile === 'moderate'
                                        ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-lg'
                                        : 'bg-background border-border/40 text-textSecondary hover:text-white'
                                }`}
                            >
                                Moderado
                                <span className="block text-[10px] opacity-75 mt-0.5">~11% a.a.</span>
                            </button>
                            <button
                                onClick={() => setProfile('bold')}
                                className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                                    profile === 'bold'
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg'
                                        : 'bg-background border-border/40 text-textSecondary hover:text-white'
                                }`}
                            >
                                Arrojado
                                <span className="block text-[10px] opacity-75 mt-0.5">~15% a.a.</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ludic Visual Results Display */}
                <div className="lg:col-span-6 bg-surfaceCard p-6 rounded-2xl border border-border/50 flex flex-col justify-between space-y-6">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-textSecondary font-bold block mb-1">Resultado Final Estimado</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight">
                            {formatBRL(totalAccumulated)}
                        </h2>
                        <p className="text-xs text-emerald-400 font-bold mt-2 flex items-center gap-1">
                            <TrendingUp size={14} /> Seu patrimônio é multiplicado por {multiplier}x!
                        </p>
                    </div>

                    {/* Progress Bar comparison */}
                    <div className="space-y-4 bg-background/50 p-5 rounded-2xl border border-border/30">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1.5">
                                <span className="text-textSecondary flex items-center gap-1.5">
                                    <Coins size={14} className="text-blue-400" /> Do seu bolso (Economizado):
                                </span>
                                <span className="text-white">{formatBRL(totalInvested)}</span>
                            </div>
                            <div className="w-full bg-background h-3 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(totalInvested / totalAccumulated) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1.5">
                                <span className="text-textSecondary flex items-center gap-1.5">
                                    <Sparkles size={14} className="text-purple-400" /> Lucro em Juros (Dinheiro Grátis):
                                </span>
                                <span className="text-purple-400 font-extrabold">+{formatBRL(interestEarned)}</span>
                            </div>
                            <div className="w-full bg-background h-3 rounded-full overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(interestEarned / totalAccumulated) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Friendly summary card */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-300 space-y-1">
                        <p className="font-bold text-emerald-400 text-sm">💡 Resumo Didático:</p>
                        <p>
                            Guardando <strong>{formatBRL(monthlyContribution)}/mês</strong> por <strong>{years} anos</strong>, você coloca do próprio bolso <strong>{formatBRL(totalInvested)}</strong>.
                        </p>
                        <p>
                            Os juros rendem adicionais <strong className="underline">{formatBRL(interestEarned)}</strong> sem você precisar trabalhar a mais por isso!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
