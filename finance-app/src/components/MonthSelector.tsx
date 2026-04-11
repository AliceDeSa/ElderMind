import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MonthSelectorProps {
    onDateChange: (date: Date) => void;
    initialDate?: Date;
}

export default function MonthSelector({ onDateChange, initialDate }: MonthSelectorProps) {
    const { t } = useTranslation('common');
    const [date, setDate] = useState(initialDate || new Date());

    const monthKeys = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    useEffect(() => {
        onDateChange(date);
    }, [date, onDateChange]);

    const changeDate = (offset: number) => {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + offset);
        setDate(newDate);
    };

    const currentMonthIdx = date.getMonth();
    const prevDate = new Date(date);
    prevDate.setMonth(currentMonthIdx - 1);
    const nextDate = new Date(date);
    nextDate.setMonth(currentMonthIdx + 1);

    const formatMonthShort = (d: Date) => t(`months.${monthKeys[d.getMonth()]}`).substring(0, 3);
    const formatMonthFull = (d: Date) => t(`months.${monthKeys[d.getMonth()]}`);

    return (
        <div className="flex items-center justify-between bg-surfaceCard/80 backdrop-blur-md border border-border/50 rounded-2xl p-1 shadow-sm w-full md:w-[320px] select-none">
            {/* Prev */}
            <button 
                onClick={() => changeDate(-1)} 
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-textSecondary/70 hover:bg-white/5 hover:text-white hover:shadow-inner transition-all group flex-1 md:flex-none"
            >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block delay-75">{formatMonthShort(prevDate)}</span>
            </button>

            {/* Current */}
            <div className="flex flex-col items-center justify-center px-4 min-w-[140px] animate-fade-in relative py-1">
                <span className="text-primary text-sm font-black tracking-tight drop-shadow-sm uppercase">
                    {formatMonthFull(date)} 
                </span>
                <span className="text-[10px] font-bold text-textSecondary bg-white/5 py-0.5 px-2 rounded-full mt-0.5">
                    {date.getFullYear()}
                </span>
            </div>

            {/* Next */}
            <button 
                onClick={() => changeDate(1)} 
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-textSecondary/70 hover:bg-white/5 hover:text-white hover:shadow-inner transition-all group flex-1 md:flex-none"
            >
                <span className="text-xs font-bold uppercase tracking-wider hidden sm:block delay-75">{formatMonthShort(nextDate)}</span>
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
}
