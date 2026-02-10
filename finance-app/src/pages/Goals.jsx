import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../context/FinanceProvider';

export default function Goals() {
    const { budgetAllocation, updateBudgetAllocation } = useFinance();

    const [localAllocation, setLocalAllocation] = useState(budgetAllocation);
    const [totalPercentage, setTotalPercentage] = useState(100);

    useEffect(() => {
        const total = localAllocation.reduce((acc, curr) => acc + curr.value, 0);
        setTotalPercentage(total);
    }, [localAllocation]);

    useEffect(() => {
        setLocalAllocation(budgetAllocation);
    }, [budgetAllocation]);

    const handleSliderChange = (id, newValue) => {
        setLocalAllocation(prev =>
            prev.map(item => item.id === id ? { ...item, value: parseInt(newValue) } : item)
        );
    };

    const handleSave = () => {
        updateBudgetAllocation(localAllocation);
    };

    const handleReset = () => {
        const defaults = [
            { id: 'freedom', name: 'Liberdade Financeira', value: 25, color: '#818cf8' },
            { id: 'fixed', name: 'Custos Fixos', value: 30, color: '#3b82f6' },
            { id: 'comfort', name: 'Conforto', value: 15, color: '#f472b6' },
            { id: 'goals', name: 'Metas', value: 15, color: '#7c3aed' },
            { id: 'pleasure', name: 'Prazeres', value: 10, color: '#f97316' },
            { id: 'knowledge', name: 'Conhecimento', value: 5, color: '#fbbf24' }
        ];
        setLocalAllocation(defaults);
    };

    return (
        <div className="animate-fade-in max-w-[1400px] mx-auto pb-4 px-2">
            {/* Page Header - Ultra Compact */}
            <div className="mb-6 pt-2">
                <h1 className="text-[26px] font-bold text-white">Gestão de Orçamento</h1>
                <p className="text-textSecondary text-sm mt-1">Defina como você quer distribuir sua renda mensal</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

                {/* Left Card: Visualização de uso */}
                <div className="lg:col-span-4 bg-[#111111] rounded-[24px] p-5 shadow-2xl border border-white/[0.03] flex flex-col h-full">
                    <div className="flex-1 flex flex-col items-center pt-2">
                        <div className="relative w-full aspect-square max-w-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={localAllocation}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="68%"
                                        outerRadius="100%"
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="#000"
                                        strokeWidth={1.5}
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {localAllocation.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-[#1a1a1a] border border-white/10 px-3 py-2 rounded-lg shadow-xl">
                                                        <p className="text-white text-xs font-bold">{data.name}</p>
                                                        <p className="text-white text-[10px] font-semibold">{data.value}%</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Labels */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[40px] font-black text-white leading-none">100%</span>
                                <span className="text-[12px] text-[#a1a1aa] font-semibold tracking-wide">Total</span>
                            </div>
                        </div>

                        {/* Legend Grid - Larger Font */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-4 w-full mt-8 px-1">
                            {localAllocation.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                    <span className="text-[13.5px] text-[#a1a1aa] font-bold truncate leading-tight">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="w-full mt-10 py-3 rounded-[12px] bg-[#1a1a1a] text-white text-[12px] font-bold hover:bg-[#222] transition-all border border-white/[0.02]"
                    >
                        Resetar Valores
                    </button>
                </div>

                {/* Right Card: Controle de Orçamento */}
                <div className="lg:col-span-8 bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-white/[0.03] flex flex-col h-full">
                    <h3 className="text-white font-bold text-base mb-6">Ajuste de Alocação</h3>

                    <div className="flex-1 space-y-6">
                        {localAllocation.map((item) => (
                            <div key={item.id} className="relative px-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-white tracking-tight">{item.name}</span>
                                    <span className="text-xs font-bold text-white">{item.value}%</span>
                                </div>

                                <div className="relative h-[20px] flex items-center">
                                    {/* The Line */}
                                    <div className="absolute left-0 right-0 h-[2.5px] bg-[#1a1a1a] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{ backgroundColor: item.color, width: `${item.value}%` }}
                                        />
                                    </div>

                                    {/* Input overlay */}
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={item.value}
                                        onChange={(e) => handleSliderChange(item.id, e.target.value)}
                                        className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer slider-final-v2"
                                        style={{ '--thumb-color': item.color }}
                                    />

                                    {/* Value label - Centered and White */}
                                    <div
                                        className="absolute top-[24px] transition-all duration-75 text-[10px] font-bold text-white -translate-x-1/2 pointer-events-none"
                                        style={{ left: `calc(${item.value}% + (8px - ${item.value} * 0.16px))` }}
                                    >
                                        {item.value}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final Save Button */}
                    <div className="mt-10">
                        <button
                            onClick={handleSave}
                            disabled={totalPercentage !== 100}
                            className={`w-full py-3.5 rounded-[12px] text-center text-[13px] font-bold transition-all ${totalPercentage === 100
                                ? 'bg-[#d97706] text-black hover:bg-[#b45309]'
                                : 'bg-[#1a1a1a] text-[#52525b] border border-white/[0.03] opacity-60'
                                }`}
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .slider-final-v2::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: var(--thumb-color);
                    cursor: pointer;
                    box-shadow: 0 0 0 3px rgba(0,0,0,0.3);
                    position: relative;
                    z-index: 10;
                }
                .slider-final-v2::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: var(--thumb-color);
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
}
