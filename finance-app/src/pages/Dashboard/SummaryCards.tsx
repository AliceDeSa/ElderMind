/**
 * Cards de resumo financeiro (Receita, Gastos, Metas, Cartões)
 * Variants: 'full' (4 cards), 'compact-unified' (1 card), 'vertical'
 */

import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Target, CreditCard, Wallet } from 'lucide-react';
import CarouselCard from '../../components/CarouselCard';

interface SummaryCardsProps {
    income: number;
    expense: number;
    goals: Array<{
        id: string | number;
        name: string;
        current: number;
        target: number;
        color: string;
    }>;
    creditCards: Array<{
        id: string | number;
        name: string;
        limit: number;
        used: number;
        color: string;
    }>;
    calculatePercentage: (current: number, target: number) => number;
    variant?: 'full' | 'compact' | 'vertical' | 'compact-unified';
}

export default function SummaryCards({
    income,
    expense,
    goals,
    creditCards,
    calculatePercentage,
    variant = 'full'
}: SummaryCardsProps) {
    const { t } = useTranslation(['dashboard', 'common']);

    const formatBRL = (val: number) =>
        val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const balance = income - expense;
    const balancePositive = balance >= 0;

    // ── Compact Unified Variant ──────────────────────────────────────────────
    if (variant === 'compact-unified') {
        return (
            <div className="bg-surfaceCard border border-border/50 rounded-2xl shadow-xl overflow-hidden mb-8">

                {/* Header */}
                <div className="px-6 py-4 border-b border-border/20 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Wallet size={18} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-textMain text-sm uppercase tracking-wider">
                        Visão Geral do Mês
                    </h3>
                </div>

                {/* Balance + Income + Expense row */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/20">
                    {/* Saldo */}
                    <div className="px-4 py-5 flex flex-col items-center text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">
                            Saldo Líquido
                        </span>
                        <p className={`text-xl md:text-2xl font-black ${balancePositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {formatBRL(balance)}
                        </p>
                        <span className={`mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${balancePositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {balancePositive ? '▲ Positivo' : '▼ Negativo'}
                        </span>
                    </div>

                    {/* Receita */}
                    <div className="px-4 py-5 flex flex-col items-center text-center">
                        <div className="flex items-center gap-1.5 mb-2">
                            <TrendingUp size={13} className="text-emerald-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                                {t('dashboard:cards.income.title')}
                            </span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-textMain">
                            {formatBRL(income)}
                        </p>
                    </div>

                    {/* Gastos */}
                    <div className="px-4 py-5 flex flex-col items-center text-center">
                        <div className="flex items-center gap-1.5 mb-2">
                            <TrendingDown size={13} className="text-red-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                                {t('dashboard:cards.expense.title')}
                            </span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-textMain">
                            {formatBRL(expense)}
                        </p>
                    </div>
                </div>

                {/* Goals + Cards sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/20 border-t border-border/20">

                    {/* Goals */}
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={14} className="text-primary" />
                            <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
                                {t('dashboard:cards.goals.title')}
                            </span>
                        </div>
                        {goals.length === 0 ? (
                            <p className="text-xs text-textSecondary/60 italic">Nenhuma meta cadastrada</p>
                        ) : (
                            <div className="space-y-3">
                                {goals.slice(0, 3).map((goal) => (
                                    <div key={goal.id}>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-medium text-textMain truncate max-w-[60%]">{goal.name}</span>
                                            <span className="text-[10px] text-textSecondary">{calculatePercentage(goal.current, goal.target)}%</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-1.5">
                                            <div
                                                className={`${goal.color} h-1.5 rounded-full transition-all duration-700`}
                                                style={{ width: `${calculatePercentage(goal.current, goal.target)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {goals.length > 3 && (
                                    <p className="text-[10px] text-textSecondary/50">+{goals.length - 3} meta(s)</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Credit Cards */}
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <CreditCard size={14} className="text-purple-400" />
                            <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
                                {t('dashboard:cards.creditCards.title')}
                            </span>
                        </div>
                        {creditCards.length === 0 ? (
                            <p className="text-xs text-textSecondary/60 italic">Nenhum cartão cadastrado</p>
                        ) : (
                            <div className="space-y-3">
                                {creditCards.slice(0, 3).map((card) => {
                                    const pct = card.limit > 0 ? Math.min((card.used / card.limit) * 100, 100) : 0;
                                    return (
                                        <div key={card.id}>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-xs font-medium text-textMain truncate max-w-[60%]">{card.name}</span>
                                                <span className="text-[10px] text-textSecondary">{Math.round(pct)}%</span>
                                            </div>
                                            <div className="w-full bg-background rounded-full h-1.5">
                                                <div
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[10px] text-textSecondary/60 mt-0.5">
                                                <span>{t('common:labels.used')} {formatBRL(card.used)}</span>
                                                <span>{t('common:labels.limit')} {formatBRL(card.limit)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                {creditCards.length > 3 && (
                                    <p className="text-[10px] text-textSecondary/50">+{creditCards.length - 3} cartão(ões)</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ── Default / Full Variant (4 cards) ────────────────────────────────────
    return (
        <div className={`grid gap-6 ${variant === 'vertical' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} mb-8 items-stretch`}>
            {/* Receita */}
            <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                    <h3 className="text-textSecondary text-sm font-medium">{t('dashboard:cards.income.title')}</h3>
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <TrendingUp size={20} />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold text-textMain truncate">R$ {(income || 0).toLocaleString()}</p>
                    <p className="text-xs text-emerald-500 flex items-center mt-1">
                        +12% <span className="text-textSecondary ml-1">{t('dashboard:cards.income.vsLastMonth')}</span>
                    </p>
                </div>
            </div>

            {/* Gastos */}
            <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                    <h3 className="text-textSecondary text-sm font-medium">{t('dashboard:cards.expense.title')}</h3>
                    <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                        <TrendingDown size={20} />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-2xl font-bold text-textMain truncate">R$ {(expense || 0).toLocaleString()}</p>
                    <p className="text-xs text-red-500 flex items-center mt-1">
                        -5% <span className="text-textSecondary ml-1">{t('dashboard:cards.expense.vsLastMonth')}</span>
                    </p>
                </div>
            </div>

            {/* Metas Carousel */}
            <div className="min-h-[160px]">
                <CarouselCard
                    title={t('dashboard:cards.goals.title')}
                    items={goals}
                    renderItem={(goal: any) => (
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-base font-semibold text-textMain truncate max-w-[70%]">{goal.name}</span>
                                <span className="text-xs text-textSecondary whitespace-nowrap">{calculatePercentage(goal.current, goal.target)}%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2 mb-2">
                                <div className={`${goal.color} h-2 rounded-full`} style={{ width: `${calculatePercentage(goal.current, goal.target)}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-textSecondary">
                                <span>R$ {(goal.current || 0).toLocaleString()}</span>
                                <span>R$ {(goal.target || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                />
            </div>

            {/* Credit Cards Carousel */}
            <div className="min-h-[160px]">
                <CarouselCard
                    title={t('dashboard:cards.creditCards.title')}
                    items={creditCards}
                    renderItem={(card: any) => (
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-background rounded-lg text-purple-400">
                                        <CreditCard size={18} />
                                    </div>
                                    <span className="font-medium text-textMain">{card.name}</span>
                                </div>
                                <span className="text-xs text-textSecondary">Venc. 10</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-textSecondary">{t('common:labels.used')}</span>
                                    <span className="text-textMain font-medium">R$ {(card.used || 0).toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-background rounded-full h-1.5">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                                        style={{ width: `${(card.used / card.limit) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-textSecondary">
                                    <span>{t('common:labels.available')} R$ {((card.limit || 0) - (card.used || 0)).toLocaleString()}</span>
                                    <span>{t('common:labels.limit')} R$ {(card.limit || 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
