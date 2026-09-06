import React, { useState, useEffect } from 'react';
import { Shield, HelpCircle, CheckCircle2, RefreshCw, AlertCircle, PlusCircle, MinusCircle, Wallet, Info } from 'lucide-react';

interface ReserveConfig {
    workType: 'clt' | 'pj' | 'autonomo';
    fixedCost: number;
    currentAmount: number;
    strategy: 'debts' | 'focus' | 'balanced';
}

export default function EmergencyReserve() {
    const [config, setConfig] = useState<ReserveConfig | null>(() => {
        try {
            const saved = localStorage.getItem('emergency_reserve_config');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    // Wizard Form State
    const [step, setStep] = useState(1);
    const [workType, setWorkType] = useState<'clt' | 'pj' | 'autonomo'>('clt');
    const [fixedCost, setFixedCost] = useState<string>('2500');
    const [strategy, setStrategy] = useState<'debts' | 'focus' | 'balanced'>('focus');
    const [currentAmount, setCurrentAmount] = useState<string>('0');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [depositType, setDepositType] = useState<'add' | 'remove'>('add');

    // Save to localStorage when config changes
    useEffect(() => {
        if (config) {
            try {
                localStorage.setItem('emergency_reserve_config', JSON.stringify(config));
            } catch (e) {
                console.error(e);
            }
        }
    }, [config]);

    // Recommended months based on work type
    const getMonthsCount = (type: 'clt' | 'pj' | 'autonomo') => {
        if (type === 'clt') return 6;
        if (type === 'pj') return 9;
        return 12;
    };

    const handleCompleteWizard = () => {
        const costNum = parseFloat(fixedCost.replace(',', '.')) || 0;
        const currentNum = parseFloat(currentAmount.replace(',', '.')) || 0;
        setConfig({
            workType,
            fixedCost: costNum,
            currentAmount: currentNum,
            strategy
        });
    };

    const handleUpdateAmount = (e: React.FormEvent) => {
        e.preventDefault();
        if (!config) return;
        const val = parseFloat(depositAmount.replace(',', '.')) || 0;
        if (val <= 0) return;

        const newAmount = depositType === 'add'
            ? config.currentAmount + val
            : Math.max(0, config.currentAmount - val);

        setConfig({ ...config, currentAmount: newAmount });
        setDepositAmount('');
        setShowDepositModal(false);
    };

    const formatBRL = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    // Render Wizard if not configured
    if (!config) {
        const months = getMonthsCount(workType);
        const estimatedTarget = (parseFloat(fixedCost) || 0) * months;

        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in p-4 md:p-6 pb-24">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-4 bg-primary/20 text-primary rounded-2xl mb-2">
                        <Shield size={36} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Construa sua Reserva de Emergência</h1>
                    <p className="text-textSecondary text-sm max-w-lg mx-auto">
                        Responda a 3 perguntas simples para calcularmos o seu escudo financeiro ideal.
                    </p>
                </div>

                {/* Wizard Container */}
                <div className="bg-surfaceCard border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl space-y-8">
                    {/* Progress Dots */}
                    <div className="flex justify-center items-center gap-3 border-b border-border/30 pb-6">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs transition-all ${
                                    step === s
                                        ? 'bg-primary text-white ring-4 ring-primary/20'
                                        : step > s
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-background text-textSecondary border border-border/40'
                                }`}
                            >
                                {step > s ? '✓' : s}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Work Type */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h3 className="text-lg font-bold text-white">1. Qual é o seu Regime de Trabalho?</h3>
                                <p className="text-xs text-textSecondary mt-1">O seu modelo de trabalho define o tempo de segurança recomendado.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div
                                    onClick={() => setWorkType('clt')}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                                        workType === 'clt'
                                            ? 'bg-primary/20 border-primary text-white shadow-lg'
                                            : 'bg-background/50 border-border/40 text-textSecondary hover:border-white/20'
                                    }`}
                                >
                                    <h4 className="font-bold text-sm text-white">CLT (Carteira Assinada)</h4>
                                    <p className="text-xs text-emerald-400 font-semibold mt-1">Recomendado: 6 meses</p>
                                    <p className="text-[11px] text-textSecondary mt-2">Maior estabilidade devido ao FGTS e seguro desemprego em caso de demissão.</p>
                                </div>

                                <div
                                    onClick={() => setWorkType('pj')}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                                        workType === 'pj'
                                            ? 'bg-primary/20 border-primary text-white shadow-lg'
                                            : 'bg-background/50 border-border/40 text-textSecondary hover:border-white/20'
                                    }`}
                                >
                                    <h4 className="font-bold text-sm text-white">PJ / Empresário</h4>
                                    <p className="text-xs text-purple-400 font-semibold mt-1">Recomendado: 9 meses</p>
                                    <p className="text-[11px] text-textSecondary mt-2">Estabilidade intermediária sem proteções trabalhistas diretas.</p>
                                </div>

                                <div
                                    onClick={() => setWorkType('autonomo')}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                                        workType === 'autonomo'
                                            ? 'bg-primary/20 border-primary text-white shadow-lg'
                                            : 'bg-background/50 border-border/40 text-textSecondary hover:border-white/20'
                                    }`}
                                >
                                    <h4 className="font-bold text-sm text-white">Autônomo / Freelancer</h4>
                                    <p className="text-xs text-amber-400 font-semibold mt-1">Recomendado: 12 meses</p>
                                    <p className="text-[11px] text-textSecondary mt-2">Renda oscilante; exige maior colchão contra meses de baixa liquidez.</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                Próximo Passo: Definir Custos →
                            </button>
                        </div>
                    )}

                    {/* Step 2: Fixed Cost Explanation & Input */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h3 className="text-lg font-bold text-white">2. Qual é o seu Custo Fixo Essencial Mensal?</h3>
                                <div className="mt-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-300 space-y-1">
                                    <p className="font-bold text-blue-400 flex items-center gap-1.5">
                                        <Info size={16} /> Entenda a diferença crucial:
                                    </p>
                                    <p>
                                        • <strong>Custo Mensal Total:</strong> Inclui lazer, jantares, compras e viagens.
                                    </p>
                                    <p>
                                        • <strong>Custo Fixo Essencial:</strong> É o valor estritamente necessário para sobreviver em uma emergência (Aluguel, Luz, Água, Comida Básica, Saúde e Transporte essencial).
                                    </p>
                                    <p className="font-semibold text-white pt-1">
                                        Sua reserva deve cobrir {months} meses do CUSTO FIXO, não do custo total!
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
                                    Custo Fixo Mensal (R$)
                                </label>
                                <input
                                    type="number"
                                    value={fixedCost}
                                    onChange={(e) => setFixedCost(e.target.value)}
                                    placeholder="Ex: 2500"
                                    className="w-full p-4 bg-background border border-border rounded-xl text-white text-lg font-bold outline-none focus:border-primary"
                                />
                            </div>

                            {/* Summary Calculation Preview */}
                            <div className="p-4 bg-background/60 border border-border/30 rounded-xl flex justify-between items-center">
                                <div>
                                    <span className="text-xs text-textSecondary">Sua Meta Calculada ({months} meses):</span>
                                    <p className="text-2xl font-black text-emerald-400">{formatBRL(estimatedTarget)}</p>
                                </div>
                                <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full">
                                    {months}x R$ {fixedCost}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-1/3 py-3.5 bg-background border border-border text-textSecondary font-bold rounded-xl hover:text-white"
                                >
                                    ← Voltar
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    className="w-2/3 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                >
                                    Próximo Passo: Estratégia →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Strategy & Initial Amount */}
                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h3 className="text-lg font-bold text-white">3. Qual é a sua Estratégia de Aporte?</h3>
                                <p className="text-xs text-textSecondary mt-1">Como você pretende direcionar seus aportes no orçamento mensal.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div
                                    onClick={() => setStrategy('debts')}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                        strategy === 'debts'
                                            ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg'
                                            : 'bg-background/50 border-border/40 text-textSecondary hover:border-white/20'
                                    }`}
                                >
                                    <h4 className="font-bold text-sm text-white">Foco em Quitação de Dívidas</h4>
                                    <p className="text-[11px] text-amber-300 font-semibold mt-1">Pequeno Aporte (5% a 10%)</p>
                                    <p className="text-[10px] text-textSecondary mt-2">Priorize liquidar dívidas com juros altos enquanto acumula uma reserva inicial mínima de segurança.</p>
                                </div>

                                <div
                                    onClick={() => setStrategy('focus')}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                        strategy === 'focus'
                                            ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg'
                                            : 'bg-background/50 border-border/40 text-textSecondary hover:border-white/20'
                                    }`}
                                >
                                    <h4 className="font-bold text-sm text-white">Construção Acelerada</h4>
                                    <p className="text-[11px] text-emerald-300 font-semibold mt-1">Aporte Total na Reserva (25% a 40%)</p>
                                    <p className="text-[10px] text-textSecondary mt-2">Direciona o máximo de recursos para concluir seu escudo de emergência no menor tempo possível.</p>
                                </div>

                                <div
                                    onClick={() => setStrategy('balanced')}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                        strategy === 'balanced'
                                            ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg'
                                            : 'bg-background/50 border-border/40 text-textSecondary hover:border-white/20'
                                    }`}
                                >
                                    <h4 className="font-bold text-sm text-white">Dividida (Investimento + Reserva)</h4>
                                    <p className="text-[11px] text-purple-300 font-semibold mt-1">Aporte Moderado Prolongado</p>
                                    <p className="text-[10px] text-textSecondary mt-2">Divide o aporte mensal entre investimentos de longo prazo e a reserva de emergência.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-textSecondary uppercase tracking-wider block">
                                    Quanto você já tem guardado hoje na reserva? (R$)
                                </label>
                                <input
                                    type="number"
                                    value={currentAmount}
                                    onChange={(e) => setCurrentAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full p-4 bg-background border border-border rounded-xl text-white text-lg font-bold outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-1/3 py-3.5 bg-background border border-border text-textSecondary font-bold rounded-xl hover:text-white"
                                >
                                    ← Voltar
                                </button>
                                <button
                                    onClick={handleCompleteWizard}
                                    className="w-2/3 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                                >
                                    Concluir e Criar Reserva 🎉
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Main Dashboard View if configured
    const monthsCount = getMonthsCount(config.workType);
    const targetAmount = config.fixedCost * monthsCount;
    const progressPct = Math.min(100, Math.round((config.currentAmount / (targetAmount || 1)) * 100));
    const remainingAmount = Math.max(0, targetAmount - config.currentAmount);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in p-4 md:p-6 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <Shield className="text-primary" size={32} /> Reserva de Emergência
                    </h1>
                    <p className="text-textSecondary text-sm mt-1">
                        Seu escudo de proteção para imprevistos financeiros.
                    </p>
                </div>
                <button
                    onClick={() => setConfig(null)}
                    className="px-4 py-2 border border-border/50 text-textSecondary hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 bg-surfaceCard"
                >
                    <RefreshCw size={14} /> Recalcular Reserva
                </button>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Guarded */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-2">
                    <span className="text-xs uppercase tracking-widest text-textSecondary font-bold">Total Acumulado</span>
                    <p className="text-3xl font-black text-emerald-400">{formatBRL(config.currentAmount)}</p>
                    <p className="text-xs text-textSecondary">{progressPct}% da meta atingida</p>
                </div>

                {/* Target Goal */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-2">
                    <span className="text-xs uppercase tracking-widest text-textSecondary font-bold">Meta Recomendada ({monthsCount} Meses)</span>
                    <p className="text-3xl font-black text-white">{formatBRL(targetAmount)}</p>
                    <p className="text-xs text-textSecondary">Baseado em R$ {config.fixedCost.toLocaleString('pt-BR')}/mês de custo fixo</p>
                </div>

                {/* Remaining */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-2">
                    <span className="text-xs uppercase tracking-widest text-textSecondary font-bold">Faltam para Guardar</span>
                    <p className="text-3xl font-black text-amber-400">{formatBRL(remainingAmount)}</p>
                    <p className="text-xs text-textSecondary">
                        {remainingAmount === 0 ? '🎉 Reserva Completa!' : 'Mantenha o ritmo de aportes'}
                    </p>
                </div>
            </div>

            {/* Progress Bar & Quick Action */}
            <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-white">Progresso do Colchão de Segurança</h3>
                        <p className="text-xs text-textSecondary">Estabilidade de {config.workType.toUpperCase()} ({monthsCount} meses de custo fixo)</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setDepositType('add'); setShowDepositModal(true); }}
                            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                        >
                            <PlusCircle size={16} /> Aportar
                        </button>
                        <button
                            onClick={() => { setDepositType('remove'); setShowDepositModal(true); }}
                            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                        >
                            <MinusCircle size={16} /> Resgatar
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="w-full bg-background h-4 rounded-full overflow-hidden p-0.5 border border-border/40">
                        <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 shadow-lg"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs font-bold text-textSecondary">
                        <span>R$ 0</span>
                        <span>{progressPct}% Concluído</span>
                        <span>{formatBRL(targetAmount)}</span>
                    </div>
                </div>
            </div>

            {/* Strategy & Recommended Instruments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selected Strategy Card */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Wallet size={20} className="text-primary" /> Estratégia de Aporte Escolhida
                    </h4>
                    <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                        <p className="font-bold text-sm text-primary">
                            {config.strategy === 'debts' && 'Quitação de Dívidas + Reserva Mínima'}
                            {config.strategy === 'focus' && 'Foco Total na Construção da Reserva'}
                            {config.strategy === 'balanced' && 'Aporte Dividido entre Investimentos e Reserva'}
                        </p>
                        <p className="text-xs text-textSecondary mt-1 leading-relaxed">
                            {config.strategy === 'debts' && 'Mantenha o foco em quitar dívidas de juros altos. Destine um pequeno percentual (5%-10%) até formar um colchão inicial.'}
                            {config.strategy === 'focus' && 'Você está priorizando criar seu escudo o mais rápido possível antes de avançar para investimentos arriscados.'}
                            {config.strategy === 'balanced' && 'Seus aportes são divididos equilibradamente para continuar fazendo seu patrimônio crescer enquanto protege o presente.'}
                        </p>
                    </div>
                </div>

                {/* Where to Invest Guide */}
                <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 space-y-3">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <HelpCircle size={20} className="text-purple-400" /> Onde Deixar Guardada a Reserva?
                    </h4>
                    <div className="space-y-2 text-xs text-textSecondary">
                        <div className="p-3 bg-background/50 rounded-xl border border-border/30 flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white">CDB 100% do CDI com Liquidez Diária</strong>
                                <p className="text-[11px] text-textSecondary">Rendimento superior à poupança e resgate imediato a qualquer momento.</p>
                            </div>
                        </div>
                        <div className="p-3 bg-background/50 rounded-xl border border-border/30 flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white">Tesouro Selic</strong>
                                <p className="text-[11px] text-textSecondary">O investimento mais seguro do país, ideal para montantes maiores.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deposit / Withdraw Modal */}
            {showDepositModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-surfaceCard border border-border/50 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <h3 className="text-lg font-bold text-white">
                            {depositType === 'add' ? 'Adicionar Aporte na Reserva' : 'Resgatar da Reserva'}
                        </h3>

                        <form onSubmit={handleUpdateAmount} className="space-y-4">
                            <div>
                                <label className="text-xs text-textSecondary font-bold block mb-1">Valor (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    placeholder="Ex: 500"
                                    className="w-full p-3 bg-background border border-border rounded-xl text-white font-bold outline-none focus:border-primary"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowDepositModal(false)}
                                    className="w-1/2 py-3 bg-background border border-border text-textSecondary font-bold rounded-xl hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`w-1/2 py-3 font-bold rounded-xl text-white ${
                                        depositType === 'add' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600'
                                    }`}
                                >
                                    {depositType === 'add' ? 'Confirmar Aporte' : 'Confirmar Resgate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

