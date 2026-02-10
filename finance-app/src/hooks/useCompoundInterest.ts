/**
 * Hook para cálculos de juros compostos
 * Extrai a lógica de cálculo do componente Calculator
 */

import { useMemo } from 'react';

export interface CompoundInterestParams {
    initialValue: number;
    monthlyContribution: number;
    annualRate: number;
    periodMonths: number;
}

export interface MonthData {
    month: number;
    label: string;
    balance: number;
    invested: number;
    interest: number;
}

export interface ScenarioData {
    rate: number;
    balance: number;
    interest: number;
}

export interface CompoundInterestResult {
    totalParams: {
        initialValue: number;
        monthlyContribution: number;
        periodMonths: number;
    };
    finalBalance: number;
    totalInvested: number;
    totalInterest: number;
    roi: number;
    multiplier: number;
    chartData: MonthData[];
    fullData: MonthData[];
    scenarios: ScenarioData[];
}

export function useCompoundInterest({
    initialValue,
    monthlyContribution,
    annualRate,
    periodMonths
}: CompoundInterestParams): CompoundInterestResult {
    return useMemo(() => {
        let bal = initialValue;
        let inv = initialValue;
        const mRate = annualRate / 12 / 100;
        const allMonths: MonthData[] = [];

        const safePeriod = Math.min(Math.max(1, periodMonths), 1200);

        // Calcular mês a mês
        for (let m = 1; m <= safePeriod; m++) {
            const interest = bal * mRate;
            bal += interest + monthlyContribution;
            inv += monthlyContribution;

            allMonths.push({
                month: m,
                label: `Mês ${m}`,
                balance: bal,
                invested: inv,
                interest: bal - inv
            });
        }

        const final = allMonths[allMonths.length - 1] || {
            balance: initialValue,
            invested: initialValue,
            interest: 0
        };

        const roi = final.invested > 0
            ? ((final.balance - final.invested) / final.invested) * 100
            : 0;

        const multiplier = final.invested > 0
            ? final.balance / final.invested
            : 0;

        // Chart Data (sparse para performance)
        const chartData = allMonths.filter((_, i) =>
            safePeriod <= 24 ? true :
                safePeriod <= 60 ? i % 3 === 0 :
                    safePeriod <= 120 ? i % 6 === 0 :
                        i % 12 === 0 || i === safePeriod - 1
        );

        // Cenários para visão avançada
        const scenarioRates = [5, 10, 15, 20];
        const scenarios: ScenarioData[] = scenarioRates.map(rate => {
            let sBal = initialValue;
            const smRate = rate / 12 / 100;

            for (let m = 1; m <= safePeriod; m++) {
                sBal += (sBal * smRate) + monthlyContribution;
            }

            return {
                rate,
                balance: sBal,
                interest: sBal - (initialValue + monthlyContribution * safePeriod)
            };
        });

        return {
            totalParams: { initialValue, monthlyContribution, periodMonths: safePeriod },
            finalBalance: final.balance,
            totalInvested: final.invested,
            totalInterest: final.interest,
            roi,
            multiplier,
            chartData,
            fullData: allMonths,
            scenarios
        };
    }, [initialValue, monthlyContribution, annualRate, periodMonths]);
}
