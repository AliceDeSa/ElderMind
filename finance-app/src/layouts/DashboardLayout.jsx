import { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import LanguageSelector from '../components/LanguageSelector';
import { Menu, RefreshCw } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (isSidebarOpen) return; // already open
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX.current;
        const deltaY = touchEndY - touchStartY.current;

        // Swipe right from left edge (start within 60px of left edge, horizontal swipe > 50px)
        if (touchStartX.current < 60 && deltaX > 50 && Math.abs(deltaY) < 60) {
            setIsSidebarOpen(true);
        }
    };

    return (
        <div 
            className="min-h-screen bg-background"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-surfaceCard border-b border-border sticky top-0 z-40">
                <h1 className="text-xl font-bold text-primary tracking-tight" translate="no">ElderMind</h1>
                <div className="flex items-center gap-2">
                    <LanguageSelector />
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-textSecondary hover:text-primary transition-colors"
                        title="Abrir menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="transition-all duration-300 md:ml-64 p-4 lg:p-8">
                {children}
            </main>

        </div>
    );
}
