/**
 * Sistema de Logging Centralizado
 * Baseado no PROJECT_STANDARDS.md
 * 
 * Categorias de log:
 * - sys: Sistema geral, inicialização
 * - finance: Operações financeiras, CRUD
 * - auth: Autenticação, login/logout
 * - ui: Atualizações visuais, animações
 * - edu: Educação, progresso de aulas
 */

type LogCategory = 'SYS' | 'FINANCE' | 'AUTH' | 'UI' | 'EDU';

const COLORS: Record<LogCategory, string> = {
    SYS: '#888',
    FINANCE: '#4CAF50',
    AUTH: '#E91E63',
    UI: '#9C27B0',
    EDU: '#FFEB3B'
};

class Logger {
    private enabled: boolean = import.meta.env.DEV; // Apenas em desenvolvimento

    sys(message: string, ...args: any[]): void {
        this.log('SYS', message, args);
    }

    finance(message: string, ...args: any[]): void {
        this.log('FINANCE', message, args);
    }

    auth(message: string, ...args: any[]): void {
        this.log('AUTH', message, args);
    }

    ui(message: string, ...args: any[]): void {
        this.log('UI', message, args);
    }

    edu(message: string, ...args: any[]): void {
        this.log('EDU', message, args);
    }

    private log(category: LogCategory, message: string, args: any[]): void {
        if (!this.enabled) return;

        const timestamp = new Date().toISOString().slice(11, 23);
        const color = COLORS[category];

        console.log(
            `%c[${timestamp}] [${category}]`,
            `color: ${color}; font-weight: bold`,
            message,
            ...args
        );
    }

    disable(): void {
        this.enabled = false;
    }

    enable(): void {
        this.enabled = true;
    }
}

export default new Logger();
