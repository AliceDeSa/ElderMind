import React from 'react';
import { Home, LayoutDashboard, Wallet, PieChart, Crosshair, GraduationCap, Calculator, Shield, ShoppingCart, LogOut, X } from 'lucide-react';
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
        { icon: ShoppingCart, label: t('menu.grocery'), path: '/grocery', active: isActive('/grocery') },
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
        },
        { icon: Calculator, label: t('menu.calculator'), path: '/calculator', active: isActive('/calculator') },
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
          <button
            onClick={onClose}
            className="md:hidden p-2 text-textSecondary hover:text-primary transition-colors rounded-lg hover:bg-surfaceCard"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation with Groups */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {menuGroups.map((group, groupIndex) => (
            <div key={group.groupKey} className={groupIndex > 0 ? 'pt-3' : ''}>
              {/* Group Label */}
              <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-textSecondary/50 select-none">
                {t(`menuGroups.${group.groupKey}`)}
              </p>

              {/* Group Items */}
              <div className="space-y-0.5">
                {group.items.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                      ${item.active
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
                    {item.badge && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.active ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Divider between groups */}
              {groupIndex < menuGroups.length - 1 && (
                <div className="mt-3 border-b border-border/20" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 mt-auto border-t border-border/30 space-y-3">
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
