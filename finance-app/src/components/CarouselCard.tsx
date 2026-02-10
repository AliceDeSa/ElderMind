import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, ReactNode } from 'react';

interface CarouselCardProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T) => ReactNode;
}

export default function CarouselCard<T>({ title, items, renderItem }: CarouselCardProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    if (!items || items.length === 0) {
        return (
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700/50 h-full flex flex-col justify-between">
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                <p className="text-gray-500 text-xs">Vazio</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-800 rounded-2xl border border-gray-700/50 h-full flex flex-col relative group overflow-hidden">
            {/* Header */}
            <div className="p-5 pb-0">
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            </div>

            {/* Navigation Buttons - Absolute Centered on Sides */}
            <button
                onClick={prev}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="Anterior"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={next}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="Próximo"
            >
                <ChevronRight size={24} />
            </button>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center px-10 py-2">
                {renderItem(items[currentIndex])}
            </div>

            {/* Footer Indicators */}
            <div className="flex justify-center pb-4 space-x-1">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-purple-600' : 'w-1 bg-gray-700'}`}
                    />
                ))}
            </div>
        </div>
    );
}
