/**
 * Utilitário para cálculos e projeções de parcelamentos em finanças.
 */

import { Expense } from '../types/models';

export interface InstallmentInfo {
    applies: boolean;
    currentInstallment: number;
    totalInstallments: number;
}

/**
 * Verifica se uma despesa compõe o mês e ano fornecidos e retorna dados de sua parcela.
 * Suporta data da despesa como 'YYYY-MM-DD' (usado no banco de dados).
 */
export function getExpenseInstallmentInfo(expense: Expense, targetMonth: number, targetYear: number): InstallmentInfo {
    // Parse total installments (ex: "21" ou "21/1" -> 21)
    const totalInst = parseInt((expense.installments || '1').split('/')[0]) || 1;
    
    // Parse a data localmente evitando problemas de Fuso Horário UTC (dia anterior)
    let dYear, dMonth;
    if (expense.date.includes('-')) {
        const parts = expense.date.split('-');
        dYear = parseInt(parts[0], 10);
        dMonth = parseInt(parts[1], 10) - 1; // 0-indexed month
    } else {
        const d = new Date(expense.date);
        dYear = d.getFullYear();
        dMonth = d.getMonth();
    }

    // Calcular a diferença em meses entre a data de criação e a data alvo
    const monthDiff = (targetYear - dYear) * 12 + (targetMonth - dMonth);

    // Se o mês selecionado for maior ou igual ao mês de início e ainda estiver
    // dentro do número total de parcelas:
    if (monthDiff >= 0 && monthDiff < totalInst) {
        return {
            applies: true,
            currentInstallment: monthDiff + 1,
            totalInstallments: totalInst
        };
    }

    return { 
        applies: false, 
        currentInstallment: 0, 
        totalInstallments: totalInst 
    };
}
