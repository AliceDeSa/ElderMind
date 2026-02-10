import React, { useState } from 'react';
import { useBookExcerpts, markExcerptRead, toggleFavorite } from '../../../hooks/useWisdomLibrary';
import { useAchievements } from '../../../hooks/useAchievements';
import { X, ChevronLeft, ChevronRight, CheckCircle, Star } from 'lucide-react';

interface ExcerptReaderProps {
    bookKey: string;
    onClose: () => void;
}

const ExcerptReader: React.FC<ExcerptReaderProps> = ({ bookKey, onClose }) => {
    const { excerpts, progress, loading, error } = useBookExcerpts(bookKey);
    const { checkAchievements } = useAchievements();
    const [selectedExcerptIndex, setSelectedExcerptIndex] = useState(0);
    const [isMarking, setIsMarking] = useState(false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-gray-900 rounded-xl p-8 max-w-4xl w-full mx-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-700 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                        <div className="h-64 bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || excerpts.length === 0) {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4">
                    <h3 className="text-red-400 font-semibold mb-2">Erro</h3>
                    <p className="text-gray-300 mb-4">
                        {error?.message || 'Nenhum trecho encontrado para este livro'}
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        );
    }

    const currentExcerpt = excerpts[selectedExcerptIndex];
    const isRead = (progress?.excerpts_read || 0) >= currentExcerpt.excerpt_order;
    const isFavorite = progress?.is_favorite || false;
    const totalExcerpts = excerpts.length;
    const readCount = progress?.excerpts_read || 0;

    const handleMarkRead = async () => {
        try {
            setIsMarking(true);
            await markExcerptRead(bookKey, currentExcerpt.excerpt_order);
            // Reload will happen via hook
            checkAchievements();
        } catch (error) {
            console.error('Error marking excerpt as read:', error);
        } finally {
            setIsMarking(false);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            setIsTogglingFavorite(true);
            await toggleFavorite(bookKey);
            // Reload will happen via hook
            checkAchievements();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsTogglingFavorite(false);
        }
    };

    const goToPrevious = () => {
        if (selectedExcerptIndex > 0) {
            setSelectedExcerptIndex(selectedExcerptIndex - 1);
        }
    };

    const goToNext = () => {
        if (selectedExcerptIndex < totalExcerpts - 1) {
            setSelectedExcerptIndex(selectedExcerptIndex + 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-700 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {excerpts[0]?.book_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>{readCount}/{totalExcerpts} trechos lidos</span>
                                <div className="h-2 flex-1 max-w-xs bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                                        style={{ width: `${(readCount / totalExcerpts) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Sidebar - Excerpt List */}
                    <div className="w-64 border-r border-gray-700 overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {excerpts.map((excerpt, index) => {
                                const excerptRead = (progress?.excerpts_read || 0) >= excerpt.excerpt_order;
                                return (
                                    <button
                                        key={excerpt.id}
                                        onClick={() => setSelectedExcerptIndex(index)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${index === selectedExcerptIndex
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            {excerptRead ? (
                                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <div className="w-4 h-4 border-2 border-gray-600 rounded-full flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-semibold mb-1">
                                                    Trecho {excerpt.excerpt_order}
                                                </div>
                                                <div className="text-xs line-clamp-2">
                                                    {excerpt.title_pt}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {/* Excerpt Title */}
                        <h3 className="text-xl font-bold text-white mb-4">
                            {currentExcerpt.title_pt}
                        </h3>

                        {/* Page Reference */}
                        {currentExcerpt.page_reference && (
                            <div className="text-sm text-gray-400 mb-6">
                                📖 {currentExcerpt.page_reference}
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-invert max-w-none mb-8">
                            <blockquote className="border-l-4 border-purple-500 pl-6 py-2 text-gray-300 italic text-lg leading-relaxed">
                                {currentExcerpt.content_pt}
                            </blockquote>
                        </div>

                        {/* Key Takeaway */}
                        {currentExcerpt.key_takeaway_pt && (
                            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">💡</span>
                                    <div>
                                        <div className="text-sm font-semibold text-purple-300 mb-2">
                                            Ponto-Chave:
                                        </div>
                                        <p className="text-gray-300">
                                            {currentExcerpt.key_takeaway_pt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleMarkRead}
                                disabled={isMarking || isRead}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isRead
                                    ? 'bg-green-600/20 text-green-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                                    }`}
                            >
                                <CheckCircle className="w-4 h-4" />
                                {isRead ? 'Lido' : isMarking ? 'Marcando...' : 'Marcar como Lido'}
                            </button>

                            <button
                                onClick={handleToggleFavorite}
                                disabled={isTogglingFavorite}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isFavorite
                                    ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/50'
                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400' : ''}`} />
                                {isFavorite ? 'Favoritado' : 'Favoritar Livro'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer - Navigation */}
                <div className="border-t border-gray-700 p-4 flex items-center justify-between">
                    <button
                        onClick={goToPrevious}
                        disabled={selectedExcerptIndex === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                    </button>

                    <div className="text-sm text-gray-400">
                        Trecho {selectedExcerptIndex + 1} de {totalExcerpts}
                    </div>

                    <button
                        onClick={goToNext}
                        disabled={selectedExcerptIndex === totalExcerpts - 1}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                        Próximo
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExcerptReader;
