import { LayoutDashboard, Wallet, PieChart, Crosshair, GraduationCap, Calculator, Shield, ShoppingCart, Heart, LogOut, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps): JSX.Element {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/dashboard';
    return location.pathname === path;
  };

  const handleNavClick = (): void => {
    if (onClose) onClose();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Painel', path: '/', active: isActive('/') },
    { icon: Wallet, label: 'Rendas e Gastos', path: '/finances', active: isActive('/finances') },
    { icon: PieChart, label: 'Orçamento', path: '/goals', active: isActive('/goals') },
    { icon: Crosshair, label: 'Objetivos', path: '/objectives', active: isActive('/objectives') },
    { icon: GraduationCap, label: 'Educação', path: '/education', active: isActive('/education') },
    { icon: Calculator, label: 'Calculadora', path: '/calculator', active: isActive('/calculator') },
    { icon: ShoppingCart, label: 'Lista de Compras', path: '/grocery', active: isActive('/grocery') },
    { icon: Shield, label: 'Reserva de Emergência', path: '/emergency', active: isActive('/emergency') },
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
        <div className="p-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary tracking-tight" translate="no">ElderMind</h1>
          <button
            onClick={onClose}
            className="md:hidden p-2 text-textSecondary hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={handleNavClick}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${item.active
                  ? 'bg-primary/10 text-primary'
                  : 'text-textSecondary hover:bg-surfaceCard hover:text-textMain'
                }`}
            >
              <item.icon size={22} className={item.active ? 'text-primary' : 'text-textSecondary group-hover:text-textMain'} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 mt-auto border-t border-border/30 space-y-2">
          <a
            href="https://ko-fi.com/alicedesa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-textSecondary hover:bg-surfaceCard hover:text-textMain transition-all"
          >
            <Heart size={20} />
            <span className="font-medium text-sm">Ko-fi</span>
          </a>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}
