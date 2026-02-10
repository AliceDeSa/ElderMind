import React from 'react';
import { BookOpen, TreePine, TrendingUp, Clock, Flame, Target } from 'lucide-react';
import type { EducationStats as StatsType } from '../../hooks/useEducationStats';
import { useTranslation } from 'react-i18next';

interface Props {
    stats: StatsType;
    variant?: 'full' | 'compact';
}

const EducationStats: React.FC<Props> = ({ stats, variant = 'full' }) => {
    const { tree, library, overall, loading } = stats;
    const { t } = useTranslation('education');

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                        <div className="h-24 bg-gray-700/50 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span>{t('stats.overallProgress')}: <span className="text-white font-medium">{overall.overallProgress}%</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{t('stats.currentStreak')}: <span className="text-white font-medium">{overall.currentStreak} {t('stats.days')}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{t('stats.timeInvested')}: <span className="text-white font-medium">{formatTime(overall.totalTimeMinutes)}</span></span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Stats */}
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{t('stats.overallProgress')}</h3>
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>

                <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-700"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - overall.overallProgress / 100)}`}
                            className="text-purple-400 transition-all duration-500"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{overall.overallProgress}%</span>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                        <span>{t('stats.activitiesCompleted')}:</span>
                        <span className="text-white font-medium">{overall.totalActivities}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>{t('stats.timeInvested')}:</span>
                        <span className="text-white font-medium">{formatTime(overall.totalTimeMinutes)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-400" />
                            {t('stats.currentStreak')}:
                        </span>
                        <span className="text-white font-medium">{overall.currentStreak} {t('stats.days')}</span>
                    </div>
                </div>
            </div>

            {/* Tree Stats */}
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-6 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Árvore de Investimentos</h3>
                    <TreePine className="w-6 h-6 text-green-400" />
                </div>

                <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-700"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - tree.progressPercentage / 100)}`}
                            className="text-green-400 transition-all duration-500"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{tree.progressPercentage}%</span>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                        <span>Nós concluídos:</span>
                        <span className="text-white font-medium">{tree.completedNodes}/{tree.totalNodes}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Em progresso:</span>
                        <span className="text-white font-medium">{tree.inProgressNodes}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Bloqueados:</span>
                        <span className="text-white font-medium">{tree.lockedNodes}</span>
                    </div>
                </div>
            </div>

            {/* Library Stats */}
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Biblioteca de Sabedoria</h3>
                    <BookOpen className="w-6 h-6 text-blue-400" />
                </div>

                <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-700"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - library.progressPercentage / 100)}`}
                            className="text-blue-400 transition-all duration-500"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{library.progressPercentage}%</span>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                        <span>Trechos lidos:</span>
                        <span className="text-white font-medium">{library.excerptsRead}/{library.totalExcerpts}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Livros iniciados:</span>
                        <span className="text-white font-medium">{library.booksStarted}/{library.totalBooks}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Livros favoritos:</span>
                        <span className="text-white font-medium">{library.favoriteBooks}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function formatTime(minutes: number): string {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export default EducationStats;
