import React, { useState } from 'react';
import InvestmentTree from './InvestmentTree/InvestmentTree';
import WisdomLibrary from './WisdomLibrary/WisdomLibrary';
import EducationOverview from './EducationOverview';
import EducationStats from './EducationStats';
import { BookOpen, TreePine, Home, Trophy } from 'lucide-react';
import { useEducationStats } from '../../hooks/useEducationStats';
import { useAchievements } from '../../hooks/useAchievements';
import AchievementsModal from '../../components/Achievements/AchievementsModal';
import AchievementNotification from '../../components/Achievements/AchievementNotification';
import { useTranslation } from 'react-i18next';

type TabType = 'overview' | 'tree' | 'library';

const Education: React.FC = () => {
    const { t } = useTranslation('education');
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [showAchievements, setShowAchievements] = useState(false);
    const stats = useEducationStats();
    const { newUnlocks, clearNewUnlocks } = useAchievements();

    const handleNavigate = (tab: 'tree' | 'library') => {
        setActiveTab(tab);
    };

    return (
        <div className="education-page min-h-screen bg-gray-900">
            <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />

            {newUnlocks.length > 0 && (
                <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                    {newUnlocks.map((achievement) => (
                        <AchievementNotification
                            key={achievement.id}
                            achievement={achievement}
                            onDismiss={() => clearNewUnlocks()}
                        />
                    ))}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">{t('page.title')}</h1>
                            <button
                                onClick={() => setShowAchievements(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg transition-colors mt-2"
                            >
                                <Trophy className="w-5 h-5" />
                                <span>{t('page.achievementsButton')}</span>
                            </button>
                        </div>
                        <EducationStats stats={stats} variant="compact" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-700 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`
              flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap
              ${activeTab === 'overview'
                                ? 'border-purple-500 text-purple-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'}
            `}
                    >
                        <Home className="w-5 h-5" />
                        {t('page.tabs.overview')}
                    </button>
                    <button
                        onClick={() => setActiveTab('tree')}
                        className={`
              flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap
              ${activeTab === 'tree'
                                ? 'border-emerald-500 text-emerald-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'}
            `}
                    >
                        <TreePine className="w-5 h-5" />
                        {t('page.tabs.tree')}
                    </button>
                    <button
                        onClick={() => setActiveTab('library')}
                        className={`
              flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap
              ${activeTab === 'library'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'}
            `}
                    >
                        <BookOpen className="w-5 h-5" />
                        {t('page.tabs.library')}
                    </button>
                </div>

                {/* Content Area */}
                <div className="animate-fade-in">
                    {activeTab === 'overview' && (
                        <EducationOverview
                            onNavigate={(path) => {
                                if (path === '/education/tree') handleNavigate('tree');
                                if (path === '/education/library') handleNavigate('library');
                            }}
                        />
                    )}
                    {activeTab === 'tree' && <InvestmentTree />}
                    {activeTab === 'library' && <WisdomLibrary />}
                </div>
            </div>
        </div>
    );
};

export default Education;
