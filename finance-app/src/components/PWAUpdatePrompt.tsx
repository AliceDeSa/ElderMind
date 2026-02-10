/**
 * PWA Update Prompt
 * Notifica usuário quando há nova versão disponível
 */

import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

export default function PWAUpdatePrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-primary p-4 rounded-xl shadow-2xl z-[2100] max-w-sm animate-fade-in border border-primary/20">
            <div className="flex items-start gap-3">
                <RefreshCw className="text-white mt-0.5 flex-shrink-0" size={20} />
                <div className="flex-1">
                    <h3 className="text-white font-bold text-sm mb-1">Nova versão disponível!</h3>
                    <p className="text-white/80 text-xs mb-3">
                        Atualize para obter as últimas melhorias
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => updateServiceWorker(true)}
                            className="bg-white text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/90 transition-colors"
                        >
                            Atualizar Agora
                        </button>
                        <button
                            onClick={() => setNeedRefresh(false)}
                            className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors"
                        >
                            Depois
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => setNeedRefresh(false)}
                    className="text-white/60 hover:text-white transition-colors flex-shrink-0"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
