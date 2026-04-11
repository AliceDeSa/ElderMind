/**
 * Cards de resumo financeiro (Receita, Gastos, Metas, Cartões)
 */

import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown } from 'lucide-react';
import CarouselCard from '../../components/CarouselCard';
import { CreditCard } from 'lucide-react';

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
    variant?: 'full' | 'compact' | 'vertical'; // Added variant prop
}

export default function SummaryCards({
    income,
    expense,
    goals,
    creditCards,
    calculatePercentage,
    variant = 'full' // Default variant to 'full'
}: SummaryCardsProps) {
    const { t } = useTranslation(['dashboard', 'common']);

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
                    renderItem={(goal) => (
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
                    renderItem={(card) => (
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
