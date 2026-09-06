import React, { useState } from 'react';
import { PiggyBank, Sparkles, TrendingUp, Compass, Target, Info, CheckCircle, Zap } from 'lucide-react';

export default function CalculatorIntuitive() {
    const [initialAmount, setInitialAmount] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(200);
    const [years, setYears] = useState(5);
    const [profile, setProfile] = useState<'safe' | 'moderate' | 'bold'>('moderate');

    // Expected annual rates for ludic profiles
    const rates = {
        safe: 0.08,     // ~8% a.a. (Tesouro Selic / Renda Fixa Conservadora)
        moderate: 0.12, // ~12% a.a. (CDBs / Fundos Diversificados)
        bold: 0.16      // ~16% a.a. (Ações / Carteira de Rendimento)
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
    const gainPercentage = totalInvested > 0 ? ((interestEarned / totalInvested) * 100).toFixed(0) : '0';

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

    // Quick Goal Presets
    const applyGoalPreset = (init: number, monthly: number, yrs: number) => {
        setInitialAmount(init);
        setMonthlyContribution(monthly);
        setYears(yrs);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-purple-900/40 via-surfaceCard to-surfaceCard p-6 rounded-2xl border border-purple-500/30">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl shrink-0">
                        <Sparkles size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Simulador Lúdico de Crescimento Financeiro</h3>
                        <p className="text-xs text-textSecondary mt-1 leading-relaxed">
                            Sem fórmulas complicadas. Veja de forma visual e simples como o seu dinheiro se multiplica sozinho quando você aplica com constância.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Scenario Buttons */}
            <div className="space-y-2">
                <span className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
                    🎯 Teste um Objetivo Rápido:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                        onClick={() => applyGoalPreset(1000, 300, 3)}
                        className="p-3.5 bg-surfaceCard/60 hover:bg-surfaceCard border border-border/40 hover:border-primary/40 rounded-xl text-left transition-all group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-base">🚗</span>
                            <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">Trocar de Carro</span>
                        </div>
                        <p className="text-[11px] text-textSecondary mt-1">R$ 1.000 inicial + R$ 300/mês por 3 anos</p>
                    </button>

                    <button
                        onClick={() => applyGoalPreset(2000, 500, 7)}
                        className="p-3.5 bg-surfaceCard/60 hover:bg-surfaceCard border border-border/40 hover:border-emerald-500/40 rounded-xl text-left transition-all group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-base">🏠</span>
                            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Entrada da Casa Própria</span>
                        </div>
                        <p className="text-[11px] text-textSecondary mt-1">R$ 2.000 inicial + R$ 500/mês por 7 anos</p>
                    </button>

                    <button
                        onClick={() => applyGoalPreset(3000, 400, 15)}
                        className="p-3.5 bg-surfaceCard/60 hover:bg-surfaceCard border border-border/40 hover:border-purple-500/40 rounded-xl text-left transition-all group"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-base">🏖️</span>
                            <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">Aposentadoria Tranquila</span>
                        </div>
                        <p className="text-[11px] text-textSecondary mt-1">R$ 3.000 inicial + R$ 400/mês por 15 anos</p>
                    </button>
                </div>
            </div>

            {/* Main Interactive Controls + Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Visual Sliders Column */}
                <div className="lg:col-span-6 bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-6 flex flex-col justify-between shadow-xl">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-border/30 pb-3">
                        <PiggyBank className="text-primary" size={22} />
                        Passo a Passo da Simulação
                    </h4>

                    {/* Step 1: Initial Amount */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                            <span className="text-textMain flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">1</span>
                                Quanto você coloca no início?
                            </span>
                            <span className="text-primary font-black text-sm px-2.5 py-0.5 bg-primary/10 rounded-lg border border-primary/20">
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
                            className="w-full h-2.5 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    {/* Step 2: Monthly Contribution */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                            <span className="text-textMain flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-bold">2</span>
                                Quanto guarda por mês?
                            </span>
                            <span className="text-emerald-400 font-black text-sm px-2.5 py-0.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                {formatBRL(monthlyContribution)} / mês
                            </span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="3000"
                            step="50"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                            className="w-full h-2.5 bg-background rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                    {/* Step 3: Years */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                            <span className="text-textMain flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-bold">3</span>
                                Durante quantos anos?
                            </span>
                            <span className="text-amber-400 font-black text-sm px-2.5 py-0.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
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
                            className="w-full h-2.5 bg-background rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>

                    {/* Step 4: Profile selector */}
                    <div className="space-y-2 pt-2 border-t border-border/30">
                        <span className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
                            Nível de Rendimento Estimado:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setProfile('safe')}
                                className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                                    profile === 'safe'
                                        ? 'bg-blue-500/20 border-blue-500 text-blue-300 shadow-lg'
                                        : 'bg-background border-border/40 text-textSecondary hover:text-white'
                                }`}
                            >
                                Conservador
                                <span className="block text-[10px] opacity-75 mt-0.5">~8% ao ano</span>
                            </button>
                            <button
                                onClick={() => setProfile('moderate')}
                                className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                                    profile === 'moderate'
                                        ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg'
                                        : 'bg-background border-border/40 text-textSecondary hover:text-white'
                                }`}
                            >
                                Moderado
                                <span className="block text-[10px] opacity-75 mt-0.5">~12% ao ano</span>
                            </button>
                            <button
                                onClick={() => setProfile('bold')}
                                className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                                    profile === 'bold'
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg'
                                        : 'bg-background border-border/40 text-textSecondary hover:text-white'
                                }`}
                            >
                                Arrojado
                                <span className="block text-[10px] opacity-75 mt-0.5">~16% ao ano</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-6 bg-surfaceCard p-6 rounded-2xl border border-border/50 flex flex-col justify-between space-y-6 shadow-xl">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-textSecondary font-bold block mb-1">
                            Seu Patrimônio no Final de {years} Anos
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tight">
                            {formatBRL(totalAccumulated)}
                        </h2>
                        <div className="flex items-center gap-2 mt-3 text-xs font-bold">
                            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1">
                                <TrendingUp size={14} /> +{gainPercentage}% de Lucro Puro
                            </span>
                        </div>
                    </div>

                    {/* Visual Comparison: Debaixo do Colchão vs No Investimento */}
                    <div className="space-y-3 bg-background/60 p-5 rounded-2xl border border-border/40">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Zap size={16} className="text-amber-400" /> Comparação Prática:
                        </h5>

                        <div className="space-y-3 pt-1">
                            {/* Without interest */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold text-textSecondary mb-1">
                                    <span>📦 Guardando em casa (Sem Juros):</span>
                                    <span className="text-white font-bold">{formatBRL(totalInvested)}</span>
                                </div>
                                <div className="w-full bg-background h-3 rounded-full overflow-hidden">
                                    <div
                                        className="bg-slate-600 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${(totalInvested / totalAccumulated) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* With interest */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold text-purple-300 mb-1">
                                    <span>✨ Com Juros Compostos Trabalhando:</span>
                                    <span className="text-purple-400 font-extrabold">{formatBRL(totalAccumulated)}</span>
                                </div>
                                <div className="w-full bg-background h-3 rounded-full overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2 text-[11px] text-emerald-300 font-bold border-t border-border/20 flex justify-between items-center">
                            <span>🎁 Dinheiro extra gerado pelos juros:</span>
                            <span className="text-sm font-black text-emerald-400">+{formatBRL(interestEarned)}</span>
                        </div>
                    </div>

                    {/* Didactic Analogy Card */}
                    <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl text-xs text-purple-200 space-y-1.5">
                        <p className="font-bold text-purple-300 flex items-center gap-1.5 text-xs">
                            💡 Entendendo como a mágica funciona:
                        </p>
                        <p className="leading-relaxed">
                            Você guardou <strong>{formatBRL(totalInvested)}</strong> com o seu trabalho. Os juros renderam mais <strong>{formatBRL(interestEarned)}</strong> de graça para você! É o dinheiro gerando filhotes de dinheiro sem você precisar trabalhar nem 1 minuto a mais por isso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
