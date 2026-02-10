import React from 'react';
import { ArrowRight, TreePine, BookOpen } from 'lucide-react';
import { useEducationStats, useNextRecommendation } from '../../hooks/useEducationStats';
import EducationStats from './EducationStats';
import { useTranslation } from 'react-i18next';

interface Props {
    onNavigate: (tab: 'tree' | 'library') => void;
}

const EducationOverview: React.FC<Props> = ({ onNavigate }) => {
    const stats = useEducationStats();
    const recommendation = useNextRecommendation();
    const { t } = useTranslation('education');

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">
                    {t('overview.welcome')}
                </h1>
                <p className="text-gray-400 text-lg">
                    {t('overview.subtitle')}
                </p>
            </div>

            {/* Stats Dashboard */}
            <EducationStats stats={stats} variant="full" />

            {/* Continue Learning Section */}
            {recommendation && (
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {t('overview.continueLearning')}
                    </h2>

                    <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 rounded-lg p-6 border border-purple-500/20">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                {recommendation.type === 'tree' ? (
                                    <TreePine className="w-8 h-8 text-green-400" />
                                ) : (
                                    <BookOpen className="w-8 h-8 text-blue-400" />
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {recommendation.title}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {recommendation.description}
                                </p>

                                <button
                                    onClick={() => {
                                        if (recommendation.type === 'tree') {
                                            onNavigate('tree');
                                        } else if (recommendation.type === 'library') {
                                            onNavigate('library');
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    {recommendation.action}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tree Card */}
                <button
                    onClick={() => onNavigate('tree')}
                    className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all text-left group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                            <TreePine className="w-8 h-8 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                {t('overview.treeCard.title')}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {t('overview.treeCard.subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>{t('overview.treeCard.progress')}</span>
                            <span className="text-white font-medium">
                                {stats.tree.progressPercentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${stats.tree.progressPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-gray-400 pt-2">
                            <span>{stats.tree.completedNodes} {t('overview.treeCard.completed')}</span>
                            <span>{stats.tree.inProgressNodes} {t('overview.treeCard.inProgress')}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-green-400 font-medium">
                        {t('overview.treeCard.action')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>

                {/* Library Card */}
                <button
                    onClick={() => onNavigate('library')}
                    className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all text-left group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                            <BookOpen className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                {t('overview.libraryCard.title')}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {t('overview.libraryCard.subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>{t('overview.libraryCard.progress')}</span>
                            <span className="text-white font-medium">
                                {stats.library.progressPercentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${stats.library.progressPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-gray-400 pt-2">
                            <span>{stats.library.excerptsRead} {t('overview.libraryCard.read')}</span>
                            <span>{stats.library.booksStarted} {t('overview.libraryCard.started')}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-blue-400 font-medium">
                        {t('overview.libraryCard.action')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            </div>

            {/* Motivational Message */}
            {stats.overall.overallProgress > 0 && (
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/20 text-center">
                    <p className="text-gray-300 text-lg">
                        {getMotivationalMessage(stats.overall.overallProgress, t)}
                    </p>
                </div>
            )}
        </div>
    );
};

function getMotivationalMessage(progress: number, t: (key: string) => string): string {
    if (progress === 0) {
        return t('overview.motivation.start');
    } else if (progress < 25) {
        return t('overview.motivation.early');
    } else if (progress < 50) {
        return t('overview.motivation.mid');
    } else if (progress < 75) {
        return t('overview.motivation.advanced');
    } else if (progress < 100) {
        return t('overview.motivation.finish');
    } else {
        return t('overview.motivation.complete');
    }
}

export default EducationOverview;
