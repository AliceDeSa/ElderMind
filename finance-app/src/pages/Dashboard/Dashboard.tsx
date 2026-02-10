import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEducationStats } from '../../hooks/useEducationStats';
import { useGoals } from '../../hooks/useGoals';
import { useEducation } from '../../hooks/useEducation';
import MonthSelector from '../../components/MonthSelector';
import SummaryCards from './SummaryCards';
import YearlyChart from './YearlyChart';
import EducationStats from '../Education/EducationStats';
import { getMockIncome, getMockExpense, getCreditCards, getYearlyStats } from '../../data/mockDashboardData';

interface YearlyStats {
    month: string;
    income: number;
    expense: number;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const educationHubStats = useEducationStats();
    const { goals } = useGoals();
    const { getNextLesson } = useEducation();

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [creditCards, setCreditCards] = useState<any[]>([]);
    const [yearlyData, setYearlyData] = useState<YearlyStats[]>([]);

    useEffect(() => {
        // Simular carregamento de dados baseados no mês
        setIncome(getMockIncome(selectedMonth));
        setExpense(getMockExpense(selectedMonth));
        setCreditCards(getCreditCards());

        // Dados anuais (estáticos no mock)
        setYearlyData(getYearlyStats());
    }, [selectedMonth]);

    const calculatePercentage = (current: number, target: number) => {
        if (target <= 0) return 0;
        return Math.min(Math.round((current / target) * 100), 100);
    };

    const nextLesson = getNextLesson();

    return (
        <div className="p-6 pb-24 md:pb-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Olá, {user?.user_metadata?.name || 'Investidor'}
                    </h1>
                    <p className="text-gray-400">Aqui está o resumo das suas finanças</p>
                </div>

                <MonthSelector
                    onDateChange={(date: Date) => setSelectedMonth(date.getMonth())}
                />
            </div>

            {/* Cards de Resumo */}
            <SummaryCards
                income={income}
                expense={expense}
                goals={goals}
                creditCards={creditCards}
                calculatePercentage={calculatePercentage}
            />

            {/* Gráfico Anual + Educação */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Gráfico (Ocupa 2 colunas) */}
                <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-6">Fluxo de Caixa Anual</h2>
                    <div className="h-[300px] w-full">
                        <YearlyChart data={yearlyData} />
                    </div>
                </div>

                {/* Educação (Ocupa 1 coluna) */}
                <div className="space-y-6">
                    <EducationStats stats={educationHubStats} variant="full" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
