import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Wallet, Plus, Minus, LayoutDashboard
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const { user } = useAuth();
  const navigate = useNavigate();

  const now = new Date();
  const hour = now.getHours();
  const greetingKey =
    hour < 12 ? 'home:greetingMorning' :
    hour < 18 ? 'home:greetingAfternoon' :
    'home:greetingEvening';

  const firstName = user?.user_metadata?.name?.split(' ')[0] || 'Investidor';

  const quickActions = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: t('home:quickActions.viewDashboard'),
      onClick: () => navigate('/dashboard'),
    },
    {
      id: 'view-finances',
      icon: Wallet,
      label: t('common:menu.finances'),
      onClick: () => navigate('/finances'),
    },
    {
      id: 'add-income',
      icon: Plus,
      label: t('home:quickActions.addIncome'),
      onClick: () => navigate('/finances?tab=rendas'),
    },
    {
      id: 'add-expense',
      icon: Minus,
      label: t('home:quickActions.addExpense'),
      onClick: () => navigate('/finances?tab=despesas'),
    },
  ];

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-8 max-w-7xl mx-auto space-y-8 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-textMain leading-tight">
          {t(greetingKey, { name: firstName })}
        </h1>
        <p className="text-sm text-textSecondary">
          {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            id={`quick-action-${action.id}`}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border/50 bg-surfaceCard hover:bg-border/20 transition-all duration-200 cursor-pointer"
          >
            <action.icon size={26} className="text-textSecondary" />
            <span className="text-sm font-medium text-textMain text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default HomePage;
