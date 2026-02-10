export const getMockIncome = (monthIndex: number) => {
    // Base income variation
    return 4500 + Math.random() * 500;
};

export const getMockExpense = (monthIndex: number) => {
    // Base expense variation
    return 3200 + Math.random() * 800;
};

export const getCreditCards = () => {
    return [
        {
            id: 1,
            name: "Nubank",
            limit: 5000,
            used: 2350,
            color: "bg-purple-600"
        },
        {
            id: 2,
            name: "Inter",
            limit: 8000,
            used: 1200,
            color: "bg-orange-500"
        }
    ];
};

export interface YearlyStats {
    month: string;
    income: number;
    expense: number;
}

export const getYearlyStats = (): YearlyStats[] => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.map(month => ({
        month,
        income: 4500 + Math.floor(Math.random() * 1000),
        expense: 3000 + Math.floor(Math.random() * 1500)
    }));
};
