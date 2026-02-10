import React, { useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { useAchievements } from '../../hooks/useAchievements';
import AchievementBadge from './AchievementBadge';
import { AchievementCategory } from '../../types/achievements';
import { useTranslation } from 'react-i18next';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AchievementsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const { achievements, loading } = useAchievements();
    const [filter, setFilter] = useState<AchievementCategory | 'all'>('all');
    const { t, i18n } = useTranslation('education');
    const isPt = i18n.language.startsWith('pt');

    if (!isOpen) return null;

    const filteredAchievements = achievements.filter(
        a => filter === 'all' || a.category === filter
    );

    const unlockedCount = achievements.filter(a => a.isUnlocked).length;
    const totalCount = achievements.length;
    const progressPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    const categories: { id: AchievementCategory | 'all', label: string }[] = [
        { id: 'all', label: t('achievements.categories.all') },
        { id: 'milestone', label: t('achievements.categories.milestone') },
        { id: 'streak', label: t('achievements.categories.streak') },
        { id: 'mastery', label: t('achievements.categories.mastery') },
        { id: 'special', label: t('achievements.categories.special') },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{t('achievements.title')}</h2>
                            <p className="text-gray-400 text-sm">
                                {t('achievements.progress', { unlocked: unlockedCount, total: totalCount })} ({progressPercentage}%)
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-800 w-full">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-gray-700 flex gap-2 overflow-x-auto">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                                ${filter === cat.id
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}
                            `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredAchievements.map(achievement => {
                                const title = isPt ? achievement.title_pt : achievement.title_en;
                                const description = isPt ? achievement.description_pt : achievement.description_en;

                                return (
                                    <div
                                        key={achievement.key}
                                        className={`
                                        bg-gray-800/50 rounded-xl p-4 border border-gray-700
                                        flex flex-col items-center text-center gap-3
                                        transition-all duration-300 hover:bg-gray-800 hover:border-gray-600
                                        ${achievement.isUnlocked ? 'hover:-translate-y-1 hover:shadow-xl' : 'opacity-70'}
                                    `}
                                    >
                                        <AchievementBadge
                                            achievement={achievement}
                                            size="medium"
                                            showTitle={false}
                                        />

                                        <div className="w-full">
                                            <h3 className={`font-semibold text-sm truncate ${achievement.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                                                {title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {description}
                                            </p>
                                        </div>

                                        {achievement.isUnlocked && achievement.unlockedAt && (
                                            <div className="mt-auto pt-2 text-[10px] text-gray-600 uppercase tracking-wider w-full border-t border-gray-700/50">
                                                {t('achievements.unlockedAt', { date: new Date(achievement.unlockedAt).toLocaleDateString() })}
                                            </div>
                                        )}

                                        {!achievement.isUnlocked && achievement.progress > 0 && (
                                            <div className="w-full mt-auto pt-2">
                                                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                                    <span>{achievement.progress}%</span>
                                                </div>
                                                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500"
                                                        style={{ width: `${achievement.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AchievementsModal;
