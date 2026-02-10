import React from 'react';
import type { WisdomBook } from '../../../types/education';
import { Star, BookOpen, CheckCircle } from 'lucide-react';

interface BookCardProps {
    book: WisdomBook;
    onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
    const progress = book.progress;
    const isCompleted = progress?.completed_at !== null;
    const isFavorite = progress?.is_favorite || false;
    const excerptsRead = progress?.excerpts_read || 0;

    // Category colors
    const getCategoryColor = () => {
        const category = book.category.toLowerCase();
        if (category.includes('value') || category.includes('investing')) return 'blue';
        if (category.includes('personal') || category.includes('finance')) return 'green';
        if (category.includes('strategy')) return 'red';
        if (category.includes('psychology')) return 'yellow';
        return 'purple';
    };

    const color = getCategoryColor();
    const colorClasses = {
        blue: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
        green: 'bg-green-500/20 border-green-500/40 text-green-400',
        red: 'bg-red-500/20 border-red-500/40 text-red-400',
        yellow: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
        purple: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
    };

    return (
        <button
            onClick={onClick}
            className="relative group bg-gray-800/50 border-2 border-gray-700 hover:border-purple-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 text-left"
        >
            {/* Favorite Star */}
            {isFavorite && (
                <div className="absolute top-3 right-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
            )}

            {/* Book Icon/Cover */}
            <div
                className={`w-full aspect-[3/4] rounded-lg mb-4 flex items-center justify-center text-6xl ${colorClasses[color]}`}
                style={{ backgroundColor: book.cover_color || undefined }}
            >
                {book.icon || '📘'}
            </div>

            {/* Title */}
            <h3 className="font-bold text-white mb-1 line-clamp-2 min-h-[3rem]">
                {book.title_pt}
            </h3>

            {/* Author */}
            <p className="text-sm text-gray-400 mb-3">
                {book.author}
            </p>

            {/* Category Badge */}
            <div className="mb-3">
                <span className={`text-xs px-2 py-1 rounded-full border ${colorClasses[color]}`}>
                    {book.category}
                </span>
            </div>

            {/* Progress */}
            {progress && excerptsRead > 0 ? (
                <div className="space-y-2">
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${(excerptsRead / 12) * 100}%` }}
                        />
                    </div>

                    {/* Progress Text */}
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">
                            {excerptsRead}/12 trechos
                        </span>
                        {isCompleted && (
                            <div className="flex items-center gap-1 text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                <span>Completo</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>Não iniciado</span>
                </div>
            )}

            {/* Year */}
            {book.year_published && (
                <div className="mt-3 text-xs text-gray-500">
                    {book.year_published}
                </div>
            )}
        </button>
    );
};

export default BookCard;
