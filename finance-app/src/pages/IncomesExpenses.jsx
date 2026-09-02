import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import IncomeTab from '../components/finance/IncomeTab';
import ExpensesTab from '../components/finance/expenses/ExpensesTab';
import AnalysisTab from '../components/finance/AnalysisTab';
import { useTranslation } from 'react-i18next';

export default function IncomesExpenses() {
    const { t } = useTranslation(['finance', 'common']);
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const validTabs = ['rendas', 'despesas', 'analise'];
    const [activeTab, setActiveTab] = useState(
        validTabs.includes(tabParam || '') ? tabParam : 'rendas'
    );

    // Sync if URL param changes (e.g. navigating with browser back/forward)
    useEffect(() => {
        if (tabParam && validTabs.includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    return (
        <div className="text-textMain pb-10">
            <h1 className="text-3xl font-bold mb-6">{t('common:menu.finances')}</h1>

            {/* Modern Tabs */}
            <div className="flex space-x-1 bg-surfaceCard p-1 rounded-xl w-fit mb-8 border border-border/50">
                <button
                    onClick={() => setActiveTab('rendas')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'rendas' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
                >
                    {t('finance:income.title', 'Rendas')}
                </button>
                <button
                    onClick={() => setActiveTab('despesas')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'despesas' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
                >
                    {t('finance:expenses.title', 'Despesas')}
                </button>
                <button
                    onClick={() => setActiveTab('analise')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'analise' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
                >
                    {t('finance:analysis.title', 'Análise')}
                </button>
            </div>

            {/* Content Area */}
            <div className="animate-fade-in">
                {activeTab === 'rendas' && <IncomeTab />}
                {activeTab === 'despesas' && <ExpensesTab />}
                {activeTab === 'analise' && <AnalysisTab />}
            </div>
        </div>
    );
}
