import React, { useState } from 'react';
import { Home, LayoutDashboard, Wallet, PieChart, Crosshair, GraduationCap, Calculator, Shield, ShoppingCart, LogOut, X, Settings, Eye, EyeOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEducationStats } from '../hooks/useEducationStats';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
  badge?: string;
  toggleable?: boolean;
}

interface MenuGroup {
  groupKey: string;
  items: MenuItem[];
}

export default function Sidebar({ isOpen, onClose }: SidebarProps): React.ReactElement {
  const { t } = useTranslation('common');
  const { logout } = useAuth();
  const location = useLocation();
  const educationStats = useEducationStats();
  const [showConfig, setShowConfig] = useState(false);

  // Hidden menu items configuration from localStorage
  const [hiddenItems, setHiddenItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sidebar_hidden_items');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleItemVisibility = (path: string) => {
    const updated = { ...hiddenItems, [path]: !hiddenItems[path] };
    setHiddenItems(updated);
    try {
      localStorage.setItem('sidebar_hidden_items', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const isActive = (path: string): boolean => {
    if (path === '/home') return location.pathname === '/home' || location.pathname === '/';
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname === path;
  };

  const handleNavClick = (): void => {
    if (onClose) onClose();
  };

  const menuGroups: MenuGroup[] = [
    {
      groupKey: 'principal',
      items: [
        { icon: Home, label: t('menu.home'), path: '/home', active: isActive('/home') },
        { icon: LayoutDashboard, label: t('menu.dashboard'), path: '/dashboard', active: isActive('/dashboard') },
      ],
    },
    {
      groupKey: 'controle',
      items: [
        { icon: Wallet, label: t('menu.finances'), path: '/finances', active: isActive('/finances') },
        { icon: ShoppingCart, label: t('menu.grocery'), path: '/grocery', active: isActive('/grocery'), toggleable: true },
      ],
    },
    {
      groupKey: 'planejamento',
      items: [
        { icon: PieChart, label: t('menu.goals'), path: '/goals', active: isActive('/goals') },
        { icon: Crosshair, label: t('menu.objectives'), path: '/objectives', active: isActive('/objectives') },
        { icon: Shield, label: t('menu.emergency'), path: '/emergency', active: isActive('/emergency') },
      ],
    },
    {
      groupKey: 'ferramentas',
      items: [
        {
          icon: GraduationCap,
          label: t('menu.education'),
          path: '/education',
          active: isActive('/education'),
          badge: `${educationStats.overall.overallProgress}%`,
          toggleable: true,
        },
        { icon: Calculator, label: t('menu.calculator'), path: '/calculator', active: isActive('/calculator'), toggleable: true },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-background border-r border-border 
        flex flex-col z-[60] transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-border/30">
          <h1 className="text-2xl font-bold text-primary tracking-tight" translate="no">ElderMind</h1>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-xl transition-all ${
                showConfig
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-textSecondary/70 hover:text-white hover:bg-surfaceCard'
              }`}
              title="Personalizar itens do menu"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={onClose}
              className="md:hidden p-2 text-textSecondary hover:text-primary transition-colors rounded-lg hover:bg-surfaceCard"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Customization Notice */}
        {showConfig && (
          <div className="bg-primary/10 border-b border-primary/20 p-3 px-4 text-xs text-primary font-medium flex items-center justify-between">
            <span>Clique no olho para exibir/ocultar</span>
            <button onClick={() => setShowConfig(false)} className="underline font-bold">Concluído</button>
          </div>
        )}

        {/* Navigation with Groups */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {menuGroups.map((group, groupIndex) => {
            const visibleItems = group.items.filter(item => showConfig || !hiddenItems[item.path]);
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.groupKey} className={groupIndex > 0 ? 'pt-3' : ''}>
                {/* Group Label */}
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-textSecondary/50 select-none">
                  {t(`menuGroups.${group.groupKey}`)}
                </p>

                {/* Group Items */}
                <div className="space-y-0.5">
                  {visibleItems.map((item, index) => {
                    const isHidden = hiddenItems[item.path];
                    return (
                      <div key={index} className="flex items-center gap-1">
                        <Link
                          to={item.path}
                          onClick={handleNavClick}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                            isHidden ? 'opacity-40 line-through' : ''
                          } ${
                            item.active
                              ? 'bg-primary/10 text-primary'
                              : 'text-textSecondary hover:bg-surfaceCard hover:text-textMain'
                          }`}
                        >
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <item.icon
                              size={20}
                              className={`flex-shrink-0 ${item.active ? 'text-primary' : 'text-textSecondary group-hover:text-textMain'}`}
                            />
                            <span className="font-medium text-sm truncate">{item.label}</span>
                          </div>
                          {item.badge && !isHidden && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.active ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                        {showConfig && item.toggleable && (
                          <button
                            onClick={() => toggleItemVisibility(item.path)}
                            className="p-2 text-textSecondary hover:text-primary transition-colors rounded-lg"
                            title={isHidden ? 'Exibir item' : 'Ocultar item'}
                          >
                            {isHidden ? <EyeOff size={16} className="text-red-400" /> : <Eye size={16} className="text-emerald-400" />}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Divider between groups */}
                {groupIndex < menuGroups.length - 1 && (
                  <div className="mt-3 border-b border-border/20" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 mt-auto border-t border-border/30 space-y-2">
          <LanguageSelector dropdownDirection="up" />
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">{t('menu.logout')}</span>
          </button>
        </div>
      </div>
    </>
  );
}
