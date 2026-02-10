import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import LanguageSelector from '../components/LanguageSelector';
import { Menu, RefreshCw } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-surfaceCard border-b border-border sticky top-0 z-40">
                <h1 className="text-xl font-bold text-primary tracking-tight" translate="no">ElderMind</h1>
                <div className="flex items-center gap-2">
                    <LanguageSelector />
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-textSecondary hover:text-primary transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="transition-all duration-300 md:ml-64 p-4 lg:p-8">
                {children}
            </main>

            {/* Float Refresh Button - Dev Helper */}
            <button
                onClick={() => window.location.reload()}
                className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary/80 transition-all z-50 hover:scale-110 active:scale-95 group"
                title="Forçar Atualização"
            >
                <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
        </div>
    );
}
