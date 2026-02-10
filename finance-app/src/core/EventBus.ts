/**
 * Sistema EventBus - Hub Central de Comunicação
 * Baseado no PROJECT_STANDARDS.md
 * 
 * Padrão: Publisher-Subscriber
 * Convenção de nomenclatura: DOMÍNIO:AÇÃO[:DETALHE]
 */

import Logger from './Logger';

type EventCallback = (data?: any) => void;

class EventBus {
    private listeners: Map<string, Set<EventCallback>> = new Map();

    /**
     * Registra um listener para um evento
     */
    on(event: string, callback: EventCallback): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);
        Logger.sys(`EventBus: Listener registrado para '${event}'`);
    }

    /**
     * Remove um listener específico de um evento
     */
    off(event: string, callback: EventCallback): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.delete(callback);
            Logger.sys(`EventBus: Listener removido de '${event}'`);
        }
    }

    /**
     * Emite um evento para todos os listeners registrados
     */
    emit(event: string, data?: any): void {
        const callbacks = this.listeners.get(event);
        if (!callbacks || callbacks.size === 0) {
            return;
        }

        Logger.sys(`EventBus: Emitindo '${event}'`, data);

        callbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                Logger.sys(`EventBus: Erro ao processar evento '${event}'`, error);
            }
        });
    }

    /**
     * Limpa todos os listeners (útil para cleanup)
     */
    clear(): void {
        this.listeners.clear();
        Logger.sys('EventBus: Todos os listeners removidos');
    }

    /**
     * Lista todos os eventos registrados (útil para debug)
     */
    getRegisteredEvents(): string[] {
        return Array.from(this.listeners.keys());
    }
}

export default new EventBus();
