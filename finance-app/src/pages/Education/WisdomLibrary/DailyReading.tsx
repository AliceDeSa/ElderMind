import React, { useState, useEffect } from 'react';
import { getDailyExcerpt } from '../../../hooks/useWisdomLibrary';
import type { WisdomExcerpt } from '../../../types/education';
import { BookOpen, Sparkles } from 'lucide-react';

const DailyReading: React.FC = () => {
    const [excerpt, setExcerpt] = useState<WisdomExcerpt | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDailyExcerpt() {
            try {
                const daily = await getDailyExcerpt();
                setExcerpt(daily);
            } catch (error) {
                console.error('Error loading daily excerpt:', error);
            } finally {
                setLoading(false);
            }
        }

        loadDailyExcerpt();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 mb-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (!excerpt) {
        return null;
    }

    // Truncate content for preview
    const previewContent = excerpt.content_pt.length > 200
        ? excerpt.content_pt.substring(0, 200) + '...'
        : excerpt.content_pt;

    return (
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6 mb-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">
                        📖 Leitura do Dia
                    </h3>
                </div>

                {/* Excerpt Title */}
                <h4 className="text-md font-semibold text-purple-300 mb-3">
                    {excerpt.title_pt}
                </h4>

                {/* Content Preview */}
                <blockquote className="text-gray-300 italic mb-4 pl-4 border-l-4 border-purple-500/50">
                    "{previewContent}"
                </blockquote>

                {/* Key Takeaway */}
                {excerpt.key_takeaway_pt && (
                    <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <div>
                                <div className="text-xs font-semibold text-gray-400 mb-1">
                                    Ponto-Chave:
                                </div>
                                <p className="text-sm text-gray-300">
                                    {excerpt.key_takeaway_pt}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <BookOpen className="w-4 h-4" />
                    Ler Trecho Completo
                </button>
            </div>
        </div>
    );
};

export default DailyReading;
