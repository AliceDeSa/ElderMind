import { LayoutDashboard, Wallet, PieChart, Crosshair, GraduationCap, Calculator, Shield, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  // Helper to check active state based on hash
  const isActive = (hash) => window.location.hash === hash;

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
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="p-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight" translate="no">ElderMind</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => window.location.hash = item.hash}
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
  );
}
