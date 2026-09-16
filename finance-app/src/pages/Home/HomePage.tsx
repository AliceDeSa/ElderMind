import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Wallet, Plus, Minus, LayoutDashboard, Sparkles
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

  const MOTIVATIONAL_QUOTES = [
    { quote: "Não se trata de quanto dinheiro você ganha, mas de quanto dinheiro você conserva e como ele trabalha para você.", author: "Robert Kiyosaki" },
    { quote: "Poupar não é sobre abrir mão do presente, é sobre comprar a sua liberdade no futuro.", author: "ElderMind" },
    { quote: "Cuidado com as pequenas despesas; um pequeno vazamento pode afundar um grande navio.", author: "Benjamin Franklin" },
    { quote: "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora.", author: "Provérbio Chinês" },
    { quote: "Orçamento é dizer ao seu dinheiro para onde ir, em vez de se perguntar para onde ele foi.", author: "John C. Maxwell" },
    { quote: "Riqueza é a capacidade de vivenciar plenamente a vida com tranquilidade e independência.", author: "Henry David Thoreau" },
    { quote: "A disciplina é a ponte entre seus objetivos financeiros e a sua realização.", author: "Jim Rohn" }
  ];

  const todayIndex = (now.getDate() + now.getMonth()) % MOTIVATIONAL_QUOTES.length;
  const currentQuote = MOTIVATIONAL_QUOTES[todayIndex];

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-8 max-w-7xl mx-auto space-y-8 animate-fade-in">

      {/* ── Header & Reflexão ── */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-textMain leading-tight">
              {t(greetingKey, { name: firstName })}
            </h1>
            <p className="text-xs md:text-sm text-textSecondary capitalize">
              {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Reflexão do Dia discreta */}
        <div className="flex items-center gap-2.5 text-xs md:text-sm bg-surfaceCard/60 border border-border/40 px-3.5 py-2 rounded-xl text-textSecondary max-w-3xl">
          <Sparkles size={16} className="text-primary shrink-0" />
          <p className="italic text-textMain/90 truncate md:whitespace-normal">
            "{currentQuote.quote}" <span className="text-textSecondary/70 not-italic font-semibold ml-1">— {currentQuote.author}</span>
          </p>
        </div>
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
