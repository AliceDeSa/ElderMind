import React, { useState } from 'react';
import InvestmentTree from './InvestmentTree/InvestmentTree';
import WisdomLibrary from './WisdomLibrary/WisdomLibrary';
import EducationOverview from './EducationOverview';
import EducationStats from './EducationStats';
import { BookOpen, TreePine, Home, Trophy, AlertTriangle, X } from 'lucide-react';
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
    const [showDevNotice, setShowDevNotice] = useState(() => {
        return !sessionStorage.getItem('edu_dev_notice_dismissed');
    });
    const stats = useEducationStats();
    const { newUnlocks, clearNewUnlocks } = useAchievements();

    const handleDismissNotice = () => {
        sessionStorage.setItem('edu_dev_notice_dismissed', 'true');
        setShowDevNotice(false);
    };

    const handleNavigate = (tab: 'tree' | 'library') => {
        setActiveTab(tab);
    };

    return (
        <div className="education-page min-h-screen bg-background relative">
            {/* Dev Notice Modal */}
            {showDevNotice && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-surfaceCard border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
                        <button
                            onClick={handleDismissNotice}
                            className="absolute top-4 right-4 text-textSecondary hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Módulo em Desenvolvimento</h3>
                                <p className="text-xs text-amber-400 font-semibold">Aviso de Versão Beta</p>
                            </div>
                        </div>

                        <p className="text-sm text-textSecondary leading-relaxed">
                            A seção de **Educação Financeira** ainda está em desenvolvimento ativo. Algumas aulas, quizzes e funcionalidades podem apresentar alterações ou instabilidades temporárias.
                        </p>

                        <button
                            onClick={handleDismissNotice}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors text-sm shadow-lg shadow-amber-500/20"
                        >
                            Entendi e Quero Continuar
                        </button>
                    </div>
                </div>
            )}
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
                            <h1 className="text-3xl font-bold text-textMain">{t('page.title')}</h1>
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
                <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`
              flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 whitespace-nowrap
              ${activeTab === 'overview'
                                ? 'border-purple-500 text-purple-400'
                                : 'border-transparent text-textSecondary hover:text-textMain'}
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
                                : 'border-transparent text-textSecondary hover:text-textMain'}
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
                                : 'border-transparent text-textSecondary hover:text-textMain'}
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
