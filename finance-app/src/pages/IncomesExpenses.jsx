import { useState } from 'react';
import IncomeTab from '../components/finance/IncomeTab';
import ExpensesTab from '../components/finance/ExpensesTab';
import AnalysisTab from '../components/finance/AnalysisTab';

export default function IncomesExpenses() {
    const [activeTab, setActiveTab] = useState('rendas'); // rendas, despesas, analise

    return (
        <div className="text-textMain pb-10">
            <h1 className="text-3xl font-bold mb-6">Rendas e Gastos</h1>

            {/* Modern Tabs */}
            <div className="flex space-x-1 bg-surfaceCard p-1 rounded-xl w-fit mb-8 border border-border/50">
                <button
                    onClick={() => setActiveTab('rendas')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'rendas' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
                >
                    Rendas
                </button>
                <button
                    onClick={() => setActiveTab('despesas')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'despesas' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
                >
                    Despesas
                </button>
                <button
                    onClick={() => setActiveTab('analise')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'analise' ? 'bg-primary text-white shadow-lg' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
                >
                    Análise
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
