import React from 'react';
import { Shield } from 'lucide-react';

const EmergencyReserve: React.FC = () => {
    return (
        <div className="p-6 pb-24 md:pb-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
                    <Shield className="text-primary" size={32} />
                    Reserva de Emergência
                </h1>
                <p className="text-textSecondary mt-2">
                    Construa seu escudo financeiro para imprevistos. Este é o seu porto seguro.
                </p>
            </div>

            {/* Empty State / Coming Soon */}
            <div className="bg-surfaceCard border border-border/50 rounded-2xl p-12 shadow-xl flex flex-col items-center justify-center text-center mt-8">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
                    <Shield className="text-primary w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-textMain mb-4">
                    Módulo em Desenvolvimento
                </h2>
                <p className="text-textSecondary max-w-lg mb-8">
                    Sua área de Reserva de Emergência está sendo construída. Em breve você poderá definir metas, 
                    acompanhar seus aportes e gerenciar seu fundo de segurança diretamente daqui.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primaryHover transition-colors shadow-lg shadow-primary/20"
                >
                    Voltar para o Painel
                </button>
            </div>
        </div>
    );
};

export default EmergencyReserve;
