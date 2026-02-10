import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MonthSelectorProps {
    onDateChange: (date: Date) => void;
    initialDate?: Date;
}

export default function MonthSelector({ onDateChange, initialDate }: MonthSelectorProps) {
    const [date, setDate] = useState(initialDate || new Date());

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    useEffect(() => {
        onDateChange(date);
    }, [date, onDateChange]);

    const prevMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)));
    };

    const nextMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)));
    };

    return (
        <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700/50 rounded-lg p-1">
            <button onClick={prevMonth} className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={18} />
            </button>

            <div className="flex items-center space-x-2 px-2 text-sm font-medium text-white min-w-[140px] justify-center">
                <span>{months[date.getMonth()]}</span>
                <span className="text-gray-500">{date.getFullYear()}</span>
            </div>

            <button onClick={nextMonth} className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={18} />
            </button>
        </div>
    );
}
