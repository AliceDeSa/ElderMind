/**
 * PWA Install Prompt
 * Oferece instalação do app quando disponível
 */

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to install prompt: ${outcome}`);

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        // Salvar no localStorage para não mostrar novamente nesta sessão
        localStorage.setItem('pwa-install-dismissed', 'true');
    };

    // Não mostrar se já foi dispensado
    useEffect(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) {
            setShowPrompt(false);
        }
    }, []);

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 bg-surfaceCard p-4 rounded-xl shadow-2xl z-[2100] max-w-sm border border-border/50 animate-fade-in">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Download className="text-primary" size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-bold text-sm mb-1">Instalar ElderMind</h3>
                    <p className="text-textSecondary text-xs mb-3">
                        Adicione à tela inicial para acesso rápido
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleInstall}
                            className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                        >
                            Instalar
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="bg-background text-textSecondary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-background/80 transition-colors"
                        >
                            Agora não
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="text-textSecondary hover:text-white transition-colors flex-shrink-0"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
