import { LayoutDashboard, Wallet, PieChart, Crosshair, GraduationCap, Calculator, Shield, Heart, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();

  // Helper to check active state based on hash
  const isActive = (hash) => window.location.hash === hash;

  const handleNavClick = (hash) => {
    window.location.hash = hash;
    if (onClose) onClose();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Painel', hash: '', active: isActive('') || isActive('#dashboard') },
    { icon: Wallet, label: 'Rendas e Gastos', hash: '#finances', active: isActive('#finances') },
    { icon: PieChart, label: 'Orçamento', hash: '#goals', active: isActive('#goals') },
    { icon: Crosshair, label: 'Objetivos', hash: '#objectives', active: isActive('#objectives') },
    { icon: GraduationCap, label: 'Educação', hash: '#education', active: isActive('#education') },
    { icon: Calculator, label: 'Calculadora', hash: '#calculator', active: isActive('#calculator') },
    { icon: Shield, label: 'Reserva de Emergência', hash: '#emergency', active: isActive('#emergency') },
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
            <button
              key={index}
              onClick={() => handleNavClick(item.hash)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${item.active
                  ? 'bg-primary/10 text-primary'
                  : 'text-textSecondary hover:bg-surfaceCard hover:text-textMain'
                }`}
            >
              <item.icon size={22} className={item.active ? 'text-primary' : 'text-textSecondary group-hover:text-textMain'} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
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
