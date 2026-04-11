import { Calendar, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface MonthSelectorProps {
    onDateChange: (date: Date) => void;
    initialDate?: Date;
    align?: 'left' | 'right';
}

export default function MonthSelector({ onDateChange, initialDate, align = 'left' }: MonthSelectorProps) {
    const { t } = useTranslation('common');
    const [date, setDate] = useState(initialDate || new Date());
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const monthKeys = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    useEffect(() => {
        onDateChange(date);
    }, [date, onDateChange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatMonthShort = (idx: number) => t(`months.${monthKeys[idx]}`).substring(0, 3);
    const formatMonthFull = (d: Date) => t(`months.${monthKeys[d.getMonth()]}`);

    const selectMonth = (monthIndex: number) => {
        const newDate = new Date(date);
        newDate.setMonth(monthIndex);
        setDate(newDate);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50 w-full sm:w-auto" ref={dropdownRef}>
            {/* Main Badge */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-surfaceCard/80 backdrop-blur-md border border-border/50 hover:border-primary/50 text-white px-4 py-2 rounded-xl transition-all shadow-sm w-full sm:w-auto justify-between sm:justify-start"
            >
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span className="font-bold text-sm tracking-wide capitalize">
                        {formatMonthFull(date)} {date.getFullYear()}
                    </span>
                </div>
                <ChevronDown size={16} className={`text-textSecondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Grid */}
            {isOpen && (
                <div className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} top-[120%] mt-2 w-[300px] md:w-[320px] bg-surfaceCard border border-border/50 rounded-2xl p-4 shadow-2xl animate-fade-in`}>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-border/30">
                        <span className="text-sm font-bold text-textSecondary uppercase tracking-wider">Selecione o Mês</span>
                        <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{date.getFullYear()}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {monthKeys.map((_, idx) => {
                            const isCurrent = idx === date.getMonth();
                            return (
                                <button
                                    key={idx}
                                    onClick={() => selectMonth(idx)}
                                    className={`py-2 px-1 rounded-xl text-sm font-semibold transition-all ${
                                        isCurrent 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                                        : 'bg-background hover:bg-white/5 text-textSecondary hover:text-white'
                                    }`}
                                >
                                    <span className="uppercase">{formatMonthShort(idx)}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
