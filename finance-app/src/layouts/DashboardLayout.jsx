import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-surfaceCard border-b border-border sticky top-0 z-40">
                <h1 className="text-xl font-bold text-primary tracking-tight" translate="no">ElderMind</h1>
                <button 
                    onClick={toggleSidebar}
                    className="p-2 text-textSecondary hover:text-primary transition-colors"
                >
                    <Menu size={24} />
                </button>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="transition-all duration-300 md:ml-64 p-4 lg:p-8">
                {children}
            </main>
        </div>
    );
}
